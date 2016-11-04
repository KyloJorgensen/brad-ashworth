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

	DEFINE ('DB_USER', 'baquest');

	DEFINE ('DB_PASSWORD', 'turtledove');

	DEFINE ('DB_HOST', '127.0.0.1');

	DEFINE ('DB_NAME', 'badb');

	// $dbc will contain a resource link to the database

	// @ keeps the error from showing in the browser

	$dbc = @mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)
	OR die('Could not connect to MySQL: ' . mysqli_connect_error());
?>