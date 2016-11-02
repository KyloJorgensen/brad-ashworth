<?php
	// Get a connection for the database
	define('__ROOT__', dirname(dirname(__FILE__))); 
	require_once(__ROOT__ . '/mysqli_connect.php');

	// Create a query for the database
	$query = "SELECT first_name FROM student";

	// Get a response from the database by sending the connection
	// and the query
	$response = @mysqli_query($dbc, $query);

	// If the query executed properly proceed
	if($response){

		echo '<table align="left"
		cellspacing="5" cellpadding="8">

		<tr><td align="left"><b>First Name</b></td>';

		// mysqli_fetch_array will return a row of data from the query
		// until no further data is available
		while($row = mysqli_fetch_array($response)){

			echo '<tr><td align="left">' . 
			$row['first_name'] . '</td><td align="left">';

			echo '</tr>';
		}

		echo '</table>';

	} else {

		echo "Couldn't issue database query<br />";

		echo mysqli_error($dbc);

	}

	// Close connection to the database
	mysqli_close($dbc);

?>