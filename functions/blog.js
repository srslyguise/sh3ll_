/*
 * Same thing as written in the README, if this CMS isn't in the base directory
 * of the site, but in another path, you MUST edit the "config/blog.xml" to the
 * path of blog.xml
*/

function blog(argc, argv)
{
	var xml = sh3ll_.loadXml("config/blog.xml");
	var posts = xml.getElementsByTagName('Post');
	var title, author, date_, content;
	var toWrite = "<div class=\"blog_div\">";

	if(argc < 2)
	{
		showList(posts);
		return;
	}

	if(posts[argv[1]-1])
	{
		title = posts[argv[1]-1].getElementsByTagName('Title')[0].childNodes[0].nodeValue;
		author = posts[argv[1]-1].getElementsByTagName('Author')[0].childNodes[0].nodeValue;
		date_ = posts[argv[1]-1].getElementsByTagName('Date')[0].childNodes[0].nodeValue;
		content = posts[argv[1]-1].getElementsByTagName('Content')[0].childNodes[0].nodeValue;

		if(navigator.appName == "Microsoft Internet Explorer")
				content = content.replace(/\n/g, "<br/>");

		toWrite += "<div class=\"blog_title\"><i>"+title+"</i></div>";
		toWrite += "<div class=\"blog_content\">"+content+"</div>";
		toWrite += "<div class=\"blog_info\">Posted by "+author+" on "+date_+".</div>";
		toWrite += "</div>";

		sh3ll_.write(toWrite);
	}
	else
	{
		sh3ll_.write("Post number not found<br>");
	}

	return;
}

function showList(posts)
{
	var elem = "<table class=\"blog_table\">";
	var title, author, date_;

	elem += "<tr style=\"text-align: center\"><td>N.</td><td>Title</td><td>Date</td><td>Author</td></tr>";

	for(i = 0; i < posts.length; i++)
	{
		title = posts[i].getElementsByTagName('Title')[0].childNodes[0].nodeValue;
		author = posts[i].getElementsByTagName('Author')[0].childNodes[0].nodeValue;
		date_ = posts[i].getElementsByTagName('Date')[0].childNodes[0].nodeValue;
		elem += "<tr>";
		elem += "<td>"+(i+1)+"</td><td>"+title+"</td><td>"+date_+"</td><td>"+author+"</td>";
		elem += "</tr>";
	}

	elem += "</table>";

	sh3ll_.write(elem);

	return;
}
