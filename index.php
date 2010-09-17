<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
	<head>
		<title>0xAA55</title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<?php
	$styles;

	if($styles = simplexml_load_file('config/styles.xml'))
		foreach($styles->Style as $style)
			echo '<link rel="stylesheet" type="text/css" href="'.$style->Src[0].'"/>';

?>
		<link rel="shortcut icon" type="image/x-icon" href="res/icon.ico"/>
		<script type="text/javascript" src="scripts/shell.js"></script>
<?php

	$functions;

	if($functions = simplexml_load_file('config/functions.xml'))
		foreach($functions->Function as $funct)
			echo '<script type="text/javascript" src="'.$funct->Src[0].'"></script>';
	
?>
	</head>

	<body class="body">
	<div style="position: relative; top: 100px; width: 500px; height: 300px; border: 1px solid #700000; margin-left: auto; margin-right: auto; margin-top: auto; margin-bottom: auto; overflow: auto">
		<script type="text/javascript">
			try
			{
				sh3ll_.init();
			}
			catch(error)
			{
				alert("sh3ll_: "+ error);
			}
		</script>
	</div>

		<noscript>
			<p style="color: #FFFFFF">This is a javascript based web site, please enable javascript.</p>
		</noscript>
	</body>

<!-- Copyleft EDX 
Powered by EDX's sh3ll_ -->
</html>
