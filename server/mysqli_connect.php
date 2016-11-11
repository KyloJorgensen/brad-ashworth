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


	$url = getenv('JAWSDB_URL');
	$dbparts = parse_url($url);

	$hostname = $dbparts['host'];
	$username = $dbparts['user'];
	$password = $dbparts['pass'];
	$database = ltrim($dbparts['path'],'/');

	DEFINE ('DB_USER', 'rd3fygeuqv4r5zim');

	DEFINE ('DB_PASSWORD', 'iynwi3pgygisuk6y');

	DEFINE ('DB_HOST', 'vhw3t8e71xdz9k14.cbetxkdyhwsb.us-east-1.rds.amazonaws.com');

	DEFINE ('DB_NAME', database);

	// $dbc will contain a resource link to the database

	// @ keeps the error from showing in the browser

	$dbc = @mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)
	OR die('Could not connect to MySQL: ' . mysqli_connect_error());
?>