function ls(argc, argv)
{
	var Directory = sh3ll_.getDirectory();
	var current;
	var str;
	var check_path;
	var Description = "";

	for(i = 0; i < Directory.length; i++)
		if(Directory[i].getAttribute('name') == sh3ll_.path)
			current = Directory[i];

	check_path = sh3ll_.path;

	if(argc == 2)
	{
		for(i = 0; i < current.getElementsByTagName('SubDirectory').length; i++)
		{
			str = current.getElementsByTagName('SubDirectory')[i].getElementsByTagName('Name')[0].childNodes[0].nodeValue;

			if(str == argv[1])
				check_path = argv[1];
		}

		if(check_path != argv[1])
		{
			sh3ll_.write(argv[0]+": "+argv[1]+": No such directory<br/>");
			return;
		}
	}

	for(i = 0; i < Directory.length; i++)
		if(Directory[i].getAttribute('name') == check_path)
			current = Directory[i];

	//SubDirectory
	for(i = 0; i < current.getElementsByTagName('SubDirectory').length; i++)
		sh3ll_.write("<a class=\"subdirs\">"+current.getElementsByTagName('SubDirectory')[i].getElementsByTagName('Name')[0].childNodes[0].nodeValue+"</a><br/>");

	//Files
	for(i = 0; i < current.getElementsByTagName('File').length; i++)
	{

		if(current.getElementsByTagName('File')[i].getElementsByTagName('Description').length)
			Description = " ~ "+current.getElementsByTagName('File')[i].getElementsByTagName('Description')[0].childNodes[0].nodeValue;
		else
			Description = "";

		sh3ll_.write("<a class=\"files\">"+current.getElementsByTagName('File')[i].getElementsByTagName('Name')[0].childNodes[0].nodeValue+"</a>"+Description+"<br/>");
	}

	//Links
	for(i = 0; i < current.getElementsByTagName('Link').length; i++)
	{

		if(current.getElementsByTagName('Link')[i].getElementsByTagName('Description').length)
			Description = " ~ "+current.getElementsByTagName('Link')[i].getElementsByTagName('Description')[0].childNodes[0].nodeValue;
		else
			Description = ""; 


		sh3ll_.write("<a class=\"links\">"+current.getElementsByTagName('Link')[i].getElementsByTagName('Name')[0].childNodes[0].nodeValue+"</a>"+Description+"<br/>");
	}
}
