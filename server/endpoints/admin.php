<?php

	DEFINE ('METHOD', $_SERVER['REQUEST_METHOD']);
	DEFINE ('URI', $_SERVER['REQUEST_URI']);
	DEFINE('__SERVER__', dirname(dirname(__FILE__)));
	$controller = require(__SERVER__ . '/controllers/admin.controller.php');

	try {
		// pull params off
		$endpoint = strchr(URI, "?", true);
		if (!$endpoint) {
			$endpoint = URI;
		}
		// pull first endpoint only
		$endpoint = strtok($endpoint, "/");
		if ($endpoint == 'admin.php') {
			if (METHOD == 'POST') {
				$controller->addAdmin();
				return;
			}
		}
		$error = new Exception('MISSING ENDPOINT');
		$error->type = 404;
		throw $error;
	} catch (Exception $e) {
		$errorHandler = include(__SERVER__ . '/error-handler.php');
		$errorHandler->handleError($e);
	}
?>