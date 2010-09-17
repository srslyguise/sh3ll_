function help(argc, argv)
{
	var root = sh3ll_.getFunctions();
	var name;
	var params;
	var desc;
	var elem = "";

	if(argc < 2)
	{
		elem = "<table border=\"0\">";

		for(i = 0; i < root.length; i++)
		{
			name = root[i].getAttribute('name');

			try
			{
				params = root[i].getElementsByTagName('Params')[0].childNodes[0].nodeValue;
			}
			catch(error)
			{
				params = "";
			}

			elem += "<tr>";
			elem += "<td><i>"+name+"</i></td><td>"+params+"</td>";
			elem += "</tr>";
		}

		elem += "<tr><td><i>clear</i></td><td></td></tr>";
		elem += "</table>";

		sh3ll_.write(elem);

		return;
	}
	
	if(argv[1] == "clear")
	{
		elem += "<dt><b>NAME</b></dt>";
		elem += "<dd>clear - Clear the screen</dd>";

		elem += "<dt><b>SYNOPSIS</b></dt>";
		elem += "<dd>clear</dd>";

		sh3ll_.write(elem);
		return;
	}

	for(i = 0; i < root.length; i++)
	{
		name = root[i].getAttribute('name');
		desc = root[i].getElementsByTagName('Description')[0].childNodes[0].nodeValue;

		try
		{
			params = root[i].getElementsByTagName('Params')[0].childNodes[0].nodeValue;
		}
		catch(error)
		{
			params = "";
		}


		if(name == argv[1])
		{
			elem += "<dt><b>NAME</b></dt>";
			elem += "<dd>"+name+" - "+desc+"</dd>";

			elem += "<dt><b>SYNOPSIS</b></dt>";
			elem += "<dd>"+name+" "+params+"</dd>";

			sh3ll_.write(elem);
			return;
		}
	}

	sh3ll_.write("help: "+argv[1]+": Command not found<br>");
	return;
}
