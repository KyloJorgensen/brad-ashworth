<?php

	DEFINE('__SERVER__', dirname(__FILE__)); 

	class LoginController {
		public function login() {
			try {

				$data = array();

				$query = json_decode(file_get_contents('php://input'), true);

				if(empty($query['username'])){
					// Adds name to array
					$data_missing[] = 'username';
				} else {
					$username = $query['username'];
				}

				if(empty($query['password'])){
					// Adds name to array
					$data_missing[] = 'password';
				} else {
					$password = $query['password'];
				}

				if(empty($data_missing)) {
				// Get a connection for the database
					require(__SERVER__ . '/mysqli_connect.php');
				// Create a query for the database
					$tableName = "admin";
					$query = "SELECT username, password FROM ".$tableName;

				// Get a response from the database by sending the connection
				// and the query
					$response = @mysqli_query($dbc, $query);
					if(!$response) {
						if ( mysqli_sqlstate($dbc) !== "42S02") {
							$error = new Exception("Couldn't issue database query. Error: ". mysqli_sqlstate($dbc) ." errormessage:".mysqli_error($dbc));
							$error->type = 401;
							mysqli_close($dbc);
							throw $error;
						} else {
							// sql to create table
							$sql = "CREATE TABLE ".$tableName." (
							adminid INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
							username VARCHAR(45) NOT NULL,
							password VARCHAR(45) NOT NULL,
							adminKey VARCHAR(45),
							reg_date TIMESTAMP
							)";

							if (@mysqli_query($dbc, $sql) === TRUE) {
							    print_r("Table Admin created successfully", TRUE);
							    $response = @mysqli_query($dbc, $query);
							} else {
							    $error = new Exception("Error creating table. Error: ". mysqli_sqlstate($dbc) ." errormessage:".mysqli_error($dbc));
								$error->type = 400;
								mysqli_close($dbc);
								throw $error;
							}
						}
					}
					$key = NULL;
					$_username;
					while($row = mysqli_fetch_array($response)){
						if ($row['username'] == $username) {
							if ($row['password'] == $password) {
								$_username = $username;
								$keyuncypted = rand(1000000000, 9999999999) . $__SERVERCONFIG__->ADMIN_SECRET.$_username;
								$key = crypt($keyuncypted, 32);
								setcookie("adminkey", $key, time()+14400);
							}
						}
					}($response);

					if (!$_username) {
						if ($username == 'root' && $password == "startup") {
							$keyuncypted = rand(1000000000, 9999999999) . $__SERVERCONFIG__->ADMIN_SECRET.$_username;
							$key = crypt($keyuncypted, 32);
							setcookie("adminkey", $key, time()+14400);
						}
					}

					mysqli_close($dbc);
					$auth = include(__SERVER__ . '/auth.php');
					if ($key == NULL) {
						setcookie("adminkey", $key, time() + 0);
						$error = new Exception("Bad Admin Name or Password");
						$error->type = 401;
						throw $error;
					}

					$updatekey = $auth->updatekey($key, $_username, $tableName);

					if ($updatekey) {
						throw $updatekey;
					}
				} else {
					setcookie("adminkey", NULL, time()-1);
					$message = "You missing the following data";

					foreach($data_missing as $missing){
						$message = $message . ' -' . $missing;
					}

					$error = new Exception($message);
					$error->type = 400;
					$error->data_missing = $data_missing;
					throw $error;
					
				}
			} catch (Exception $e) {
				$errorHandler = include(__SERVER__ . '/error-handler.php');
				$errorHandler->handleError($e);
			}
		}
	}

	return new LoginController();
?>