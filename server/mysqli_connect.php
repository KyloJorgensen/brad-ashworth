<?php
	// Opens a connection to the database
	// Since it is a php file it won't open in a browser
	// It should be saved outside of the main web documents folder
	// and imported when needed

	/*
	Command that gives the database user the least amount of power
	as is needed.
	GRANT SELECT ON badb.*
	TO 'baquest'@'localhost'
	IDENTIFIED BY 'turtledove';
	SELECT : Select rows in tables
	*/

	// Defined as constants so that they can't be changed


	$url = parse_url(getenv("CLEARDB_DATABASE_URL"));

	$server = $url["host"];
	$username = $url["user"];
	$password = $url["pass"];
	$db = substr($url["path"], 1);

	echo 'server '.$server.'<br>';
	echo 'username '.$username.'<br>';
	echo 'password '.$password.'<br>';
	echo 'db '.$db.'<br>';

	// $dbc will contain a resource link to the database

	// @ keeps the error from showing in the browser

	$dbc = @mysqli($server, $username, $password, $db)
	OR die('Could not connect to MySQL: ' . mysqli_connect_error());
?>