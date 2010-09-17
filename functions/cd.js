function cd(argc, argv)
{
	var Directory = sh3ll_.getDirectory();
	var current;
	var str;

	if(argc < 2)
	{
		sh3ll_.write("Usage: "+argv[0]+" &lt;directory|link&gt;<br/>");
		return;
	}

	if(argv[1] == "/")
		return;

	if(argv[1].match(/^\.\./))
	{
		if(sh3ll_.prev_path != "")
			sh3ll_.path = sh3ll_.prev_path.pop();

		if(argv[1].match(/[\/]+/))
		{
			var path_ = argv[1].match(/\/[\w\/\.]*/);
			var argv = new Array("cd", path_.toString().substr(1));
			cd(2, argv);
		}

		return;
	}

	if(argv[1] == "")
		return;

	for(i = 0; i < Directory.length; i++)
		if(Directory[i].getAttribute('name') == sh3ll_.path)
			current = Directory[i];

	for(i = 0; i < current.getElementsByTagName('Link').length; i++)
	{
		str = current.getElementsByTagName('Link')[i].getElementsByTagName('Name')[0].childNodes[0].nodeValue;
		if(str == argv[1])
		{
			window.location=current.getElementsByTagName('Link')[i].getElementsByTagName('Url')[0].childNodes[0].nodeValue;
			return;
		}
	}

	if(sh3ll_.check_path(sh3ll_.path, argv[1]) == false)
	{
		sh3ll_.write(argv[0]+": "+argv[1]+": No such directory or link<br/>");
		return;
	}

	sh3ll_.prev_path.push(sh3ll_.path);
	sh3ll_.path = argv[1].match(/[\w]+[^\/]*/);

	if(argv[1].match(/[\/]+/))
	{
		var path_ = argv[1].match(/\/[\w\.\/]*/);
		var argv = new Array("cd", path_.toString().substr(1));
		cd(2, argv);
	}
}
