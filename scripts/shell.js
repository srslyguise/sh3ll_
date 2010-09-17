/***************************************************************************
 * Copyleft EDX. http://AA55.altervista.org, edx1010@gmail.com
 *
 * You like this software? Do what you want under the terms of
 * GNU General Public License.
 ***************************************************************************/

sh3ll_ = {

MAINXML: "config/main.xml",
FUNCTIONSXML: "config/functions.xml",
path: "/",
usr: "",
prev_path: ["/"],
xml: null,
functionsxml: null,
commands: [],
commands_pos: 0,

init: function()
{
	if((xml = sh3ll_.loadXml(sh3ll_.MAINXML)) == null)
		throw "Unable to load main xml";

	if((sh3ll_.functionsxml = sh3ll_.loadXml(sh3ll_.FUNCTIONSXML)) == null)
		throw "Unable to load functions xml";

	title = sh3ll_.getTitle();
	
	if((sh3ll_.usr = sh3ll_.getUsr()) == null)
		throw "Unable to load user name";

	document.write("<pre id=\"sh\" class=\"text\">"+title+"<a class=\"prompt\">"+sh3ll_.usr+":/ "+sh3ll_.getPrivilege()+"_</a><a id=\"top\"> </a><input id=\"shell\" class=\"shell\" type=\"text\" onkeydown=\"sh3ll_.handler(event.keyCode)\"/></pre>");
	document.getElementById('shell').style.position = "absolute";
	document.getElementById('shell').style.width = "300px";

	if(navigator.userAgent.match(/Konqueror/))
		document.getElementById('shell').setAttribute("style", "position: absolute; width: 500px");

	document.getElementById('shell').style.top = document.getElementById('top').offsetTop+"px";
	document.getElementById('shell').style.left = document.getElementById('top').offsetLeft+"px";

	if(navigator.userAgent.match(/Konqueror/))
		document.getElementById('shell').style.height = "20px";

	document.getElementById('shell').focus();
	document.getElementById('shell').select();

	if(navigator.appName == "Microsoft Internet Explorer")
		alert("You may have some problems with IE");

	if(navigator.userAgent.match(/Konqueror/))
		alert("You may have some problems with Konqueror");
},

getTitle: function()
{
	var title;
	var str;

	if(!sh3ll_.isTitleEnabled())
		return "";

	if((title = xml.getElementsByTagName('Title')[0]) == null)
		throw "Unable to load title";

	str = "<p class=\"title\">"+title.childNodes[0].nodeValue+"</p>";

	return str;
},

getUsr: function()
{
	return xml.getElementsByTagName('Usr')[0].childNodes[0].nodeValue;
},

isTitleEnabled: function()
{
	if(xml.getElementsByTagName('Root')[0].getAttribute('title') == "true")
		return true;
	else
		return false;
},

getPrivilege: function()
{
	if(xml.getElementsByTagName('Usr')[0].getAttribute('root') == "true")
		return "#";
	else
		return "$";
},

handler: function(e)
{
	if((e == 13) && (document.getElementById('shell').value != ""))
	{
		var text = sh3ll_.getText();
		text = text.replace(/</g, "&lt;");
		text = text.replace(/>/g, "&gt;");

		sh3ll_.commands.push(document.getElementById('shell').value);
		sh3ll_.commands_pos = 0;

		if(sh3ll_.getText().toString().match(/^[\w\u00A1-\uFFFF]+[^\s]/) == "clear")
		{
			sh3ll_.clear();
			return;
		}

		if(navigator.userAgent.match(/Konqueror/)) //Konqueror
			sh3ll_.write("<br/>");
		else
			sh3ll_.write(text + "<br/>");

		sh3ll_.parse(text);

		document.getElementById('sh').removeChild(document.getElementById('shell'));

		sh3ll_.write("<a class=\"prompt\">"+sh3ll_.usr+":"+sh3ll_.path+" "+sh3ll_.getPrivilege()+"_</a><input id=\"shell\" class=\"shell\" type=\"text\" onkeydown=\"sh3ll_.handler(event.keyCode)\"/>");

		if(navigator.userAgent.match(/Konqueror/))
			document.getElementById('shell').style.height = "20px";

		document.getElementById('shell').value = "";
		document.getElementById('shell').focus();
		document.getElementById('shell').select();
	}

	if(e == 34)
		window.scrollBy(0, 50);

	if(e == 33)
		window.scrollBy(0, -50);

	var pos = sh3ll_.commands.length - sh3ll_.commands_pos;

	if(e == 38)
	{
		if(sh3ll_.commands[pos-1])
		{
			document.getElementById('shell').value = sh3ll_.commands[pos-1];
			sh3ll_.commands_pos++;
		}
	}

	if(e == 40)
	{
		if(sh3ll_.commands[pos])
		{
			document.getElementById('shell').value = sh3ll_.commands[pos];
			sh3ll_.commands_pos--;
		}
	}
		
},

loadFile: function(name)
{
	var request = new XMLHttpRequest();

	request.open("GET", name += (name.match(/\?/) == null ? "?" : "&") + (new Date()).getTime(), false);
	request.send(null);

	return request.responseText;
},

loadXml: function(name)
{
	var request = new XMLHttpRequest();

	request.open("GET", name += (name.match(/\?/) == null ? "?" : "&") + (new Date()).getTime(), false);
	request.send(null);

	return request.responseXML;
},

clear: function()
{
	var title = sh3ll_.getTitle();

	document.getElementById('sh').innerHTML = title+"<a class=\"prompt\">"+sh3ll_.usr+":"+sh3ll_.path+" "+sh3ll_.getPrivilege()+"_</a><input id=\"shell\" class=\"shell\" type=\"text\" onkeydown=\"sh3ll_.handler(event.keyCode)\"/>";

	document.getElementById('shell').style.width = "300px";

	if(navigator.userAgent.match(/Konqueror/))
		document.getElementById('shell').setAttribute("style", "position: absolute; width: 300px");

	if(navigator.userAgent.match(/Konqueror/))
		document.getElementById('shell').style.height = "20px";	

	document.getElementById('shell').focus();
	document.getElementById('shell').select();
},

parse: function(text)
{
	if(text.match(/^[\w\.\u00A1-\uFFFF]+[\t]*/))
	{
		var str = text.match(/^[\w\u00A1-\uFFFF]+/);
		var argv = text.split(" ");

		if(sh3ll_.check_function(str))
		{
			try
			{
				eval(str+'(argv.length, argv)');
			}
			catch(error)
			{
				sh3ll_.write("sh3ll_: error: "+error+"<br/>");
			}
		}
		else
			sh3ll_.write("sh3ll_: " + str + ": command not found<br/>");

		return;
	}

	sh3ll_.write("sh3ll_: "+ text + ": command not found<br/>");

	return;
},

getText: function()
{
	return document.getElementById('shell').value;
},

write: function(text)
{
	document.getElementById('sh').innerHTML += text;
},

getDirectory: function()
{
	return xml.getElementsByTagName('Directory');
},

getFunctions: function()
{
	return sh3ll_.functionsxml.getElementsByTagName('Function');
},

check_path: function(current_path, path_to_check)
{	
	var Directory = sh3ll_.getDirectory();
	var current;
	var next_dir_exist = false;
	var exist = false;
	var str;

	for(i = 0; i < Directory.length; i++)
		if(Directory[i].getAttribute('name') == current_path)
			current = Directory[i];

	if(path_to_check == "" || path_to_check == "/")
		return true;

	for(i = 0; (i < current.getElementsByTagName('SubDirectory').length) && (exist != true); i++)
	{
		str = current.getElementsByTagName('SubDirectory')[i].getElementsByTagName('Name')[0].childNodes[0].nodeValue;

		if(str == path_to_check.toString().match(/[\w\u00A1-\uFFFF]+[^\/]*/))
			exist = true;
	}

	if(exist == false)
		return false;

	if(path_to_check.match(/[\/]+/))
	{
		var path_ = path_to_check.match(/\/[\w\u00A1-\uFFFF\/]*/);
	
		next_dir_exist = sh3ll_.check_path(path_to_check.match(/[\w\u00A1-\uFFFF]+[^\/]*/),path_.toString().substr(1));

		if(next_dir_exist == false)
			return false;
	}

	return true;
},

check_function: function(name)
{
	var root = sh3ll_.getFunctions();

	for(i = 0; i < root.length; i++)
		if(root[i].getAttribute('name') == name)
			return true;

	return false;
}

}
