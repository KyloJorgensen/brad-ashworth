<?php

	DEFINE ('METHOD', $_SERVER['REQUEST_METHOD']);
	DEFINE ('URI', $_SERVER['REQUEST_URI']);
	DEFINE('__SERVER__', dirname(dirname(__FILE__)));
	$controller = require(__SERVER__ . '/controllers/news.controller.php');

	try {
		// pull params off
		$endpoint = strchr(URI, "?", true);
		if (!$endpoint) {
			$endpoint = URI;
		}
		// pull first endpoint only
		$endpoint = strtok($endpoint, "/");
		if ($endpoint == 'news') {
			$augs1 = strtok('/');
			if ($augs1 == 'id') {
				$augs2 = strtok('/');
				if (METHOD == 'GET') {
					echo METHOD;
					echo 'news/id';
					return;
				}
			} else {
				if (METHOD == 'GET') {
					$augs2 = strtok('/');
					$controller->getNews($augs1, $augs2);
					return;
				}
				if (METHOD == 'POST') {
					$controller->addNews();
					return;
				}
				if (METHOD == 'DELETE') {
					echo METHOD;
					echo 'news';
					return;
				}
				if (METHOD == 'PUT') {
					echo METHOD;
					echo 'news';
					return;
				}
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