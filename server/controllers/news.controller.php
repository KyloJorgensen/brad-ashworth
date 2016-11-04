<?php

	DEFINE('__SERVER__', dirname(__FILE__)); 

	class NewController {
		public function getNews($amount , $offset) {
			$_amount = (int)$amount;
			$_offset = (int)$offset;
			try {
				if ($_amount < 0 || $_amount > 50) {
					$error = new Exception('Amount needs to be between 0 and 50.');
					$error->type = 400;
					throw $error;
				}
				if ($_offset < 0) {
					$error = new Exception('Offset needs to be greater then 0.');
					$error->type = 400;
					throw $error;
				}
			// Get a connection for the database
				require_once(__SERVER__ . '/mysqli_connect.php');
			// Create a query for the database
				$query = "SELECT idnews, title, date_enter, content FROM news";

			// Get a response from the database by sending the connection
			// and the query
				$response = @mysqli_query($dbc, $query);

				if($response){

					echo '<table align="left"
					cellspacing="5" cellpadding="8">

					<tr><td align="left"><b>Title</b></td>';


					// mysqli_fetch_array will return a row of data from the query
					// until no further data is available
					while($row = mysqli_fetch_array($response)){

						echo '<tr><td align="left">' . 
						$row['title'] . '</td><td align="left">';

						echo '</tr>';
					}

					echo '</table>';
					$data = mysqli_fetch_array($response);
					echo json_encode($data);
					mysqli_close($dbc);

				} else {
					$error = new Exception("Couldn't issue database query" . mysqli_error($dbc));
					$error->type = 500;
					mysqli_close($dbc);
					throw $error;
				}
			} catch (Exception $e) {
				$errorHandler = include(__SERVER__ . '/error-handler.php');
				$errorHandler->handleError($e);
			}
		}

		public function addNews() {
			try {
				
			    $data_missing = array();
			    
			    if(empty($_POST['title'])){
			        // Adds name to array
			        $data_missing[] = 'title';
			    } else {
			        $title = $_POST['title'];
			    }

			    if(empty($_POST['content'])){
			        // Adds name to array
			        $data_missing[] = 'content';
			    } else {
			        $content = $_POST['content'];
			    }

				if(empty($data_missing)) {

				// Get a connection for the database
					require_once(__SERVER__ . '/mysqli_connect.php');

					$query = "INSERT INTO news (idnews, title, date_enter, content) VALUES (NULL, ?, NOW(), ?)";

					$stmt = mysqli_prepare($dbc, $query);
					
					mysqli_stmt_bind_param($stmt, "ss", $title, $content);

					mysqli_stmt_execute($stmt);
					
					$affected_rows = mysqli_stmt_affected_rows($stmt);
					
					if($affected_rows == 1) {
						echo 'NEWS Entered';
						mysqli_stmt_close($stmt);
						mysqli_close($dbc);
					
					} else {
						$error = new Exception("Error Occured" . mysqli_error($dbc));
						$error->type = 500;
						mysqli_stmt_close($stmt);
						mysqli_close($dbc);
						throw $error;
					}
					
				} else {
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

	return new NewController();
?>