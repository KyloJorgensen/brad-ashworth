<?php
	DEFINE ('METHOD', $_SERVER['REQUEST_METHOD']);
	DEFINE ('URI', $_SERVER['REQUEST_URI']);

	class ErrorHandler {
		public function handleError($e) {
			if ($e->type == 404) {
				echo METHOD . URI;
				echo '<br/>Not Found: ', $e->getMessage(), "\n";
			} else {
				echo '<br/>Caught exception: ',  $e->getMessage(), "\n";
        	}
        }
    }

	return new ErrorHandler();
?>