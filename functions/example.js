/*
 * This is an example of a function in sh3ll_.
 *
 * The function name MUST be equal to the name of the function in the functions.xml file. So, if in functions.xml there's a function called "example", the function name in the src file MUST be example, like here.
 *
 * The function MUST have two parameters, argc and argv, like in a C main function.
 *
 * To interact with sh3ll_ you can call some default function, like sh3ll_.write(text), that print text in sh3ll_, sh3ll_.getDirectory(), to retrieve the array of directories, sh3ll_.getFunctions(), to retrieve the array of functions, sh3ll_.loadXML(), to load a XML and sh3ll_.loadFile() to load a file.
 *
*/ 

function example(argc, argv)
{
	for(i = 0; i < argc; i++)
		sh3ll_.write("argc["+i+"] = "+argv[i]+"<br/>");
	return;
}
