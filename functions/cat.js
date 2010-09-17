function cat(argc, argv)
{
	var Directory = sh3ll_.getDirectory();
	var current;

	if(argc < 2)
	{
		sh3ll_.write("Usage: "+argv[0]+" &lt;filename&gt;<br/>");
		return;
	}

	for(i = 0; i < Directory.length; i++)
		if(Directory[i].getAttribute('name') == sh3ll_.path)
			current = Directory[i];

	for(i = 0; i < current.getElementsByTagName('File').length; i++)
	{
		if(current.getElementsByTagName('File')[i].getElementsByTagName('Name')[0].childNodes[0].nodeValue == argv[1])
		{
			var text = sh3ll_.loadFile(current.getElementsByTagName('File')[i].getElementsByTagName('Src')[0].childNodes[0].nodeValue);

			text = text.replace(/</g, "&lt;");
			text = text.replace(/>/g, "&gt;");

			if(navigator.appName == "Microsoft Internet Explorer")
				text = text.replace(/\n/g, "<br/>");

			sh3ll_.write(text + "<br/>");

			return;
		}
	}

	sh3ll_.write(argv[0]+": "+argv[1]+": No such file<br/>");
}
