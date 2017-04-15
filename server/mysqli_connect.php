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


	// $url = parse_url(getenv("CLEARDB_DATABASE_URL"));

	$SERVER = "us-cdbr-iron-east-04.cleardb.net";
	$USERNAME = "bad52886dd30ac";
	$PASSWORD = "5f89f699";
	$DB = "heroku_c0dd17b0109d28f";

	// $dbc will contain a resource link to the database

	// @ keeps the error from showing in the browser

	$dbc = @mysqli_connect($SERVER, $USERNAME, $PASSWORD, $DB)
	OR die('Could not connect to MySQL: ' . mysqli_connect_error());


	$query = "SELECT ID FROM ADMINS";
	$result = mysqli_query($dbConnection, $query);

	if(empty($result)) {
	$query = "CREATE TABLE ADMINS (
		ID int(11) AUTO_INCREMENT,
		EMAIL varchar(255) NOT NULL,
		PASSWORD varchar(255) NOT NULL,
		PERMISSION_LEVEL int,
		APPLICATION_COMPLETED int,
		APPLICATION_IN_PROGRESS int,
		PRIMARY KEY  (ID)
	)";
	$result = mysqli_query($dbConnection, $query);
	}
?>