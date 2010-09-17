function cowsay(argc, argv)
{
	var cowspath = "res/cows";
	var cowfile = "default";
	var text = "";
	var ret = "";

	if(argc < 2)
		return;

	for(i = 1; i < argc; i++)
		switch(argv[i]) {
			case "-f":
				i++;
				cowfile = (argv[i].match(/cow/)) ? argv[i].match(/[\w]+[^\.cow]/) : (argv[i]);
			break;

			default:
				text = argv[i];
		}

	cowfile += ".cow";
	ret = sh3ll_.loadFile(cowspath+"/"+cowfile);

	if(ret.match(/404 Not Found/))
	{
		sh3ll_.write("cowsay: Could not find "+cowfile.replace(".cow", "")+" cowfile!<br>");
		return;
	}
	else
	{
		ret = ret.replace("$", text);
		sh3ll_.write("<pre class=\"cowsay\">"+ret+"</pre>");
		return;
	}

	return;
}
