<?php
	require_once __DIR__ .'/../vendor/autoload.php';

	$app_id = $__SERVERCONFIG__->FACEBOOK_APP_ID;
	$app_secret = $__SERVERCONFIG__->FACEBOOK_APP_SECRET;
	$default_graph_version = $__SERVERCONFIG__->FACEBOOK_DEFAULT_GRAPH_VERSION;

	$fb = new Facebook\Facebook([
		'app_id' => $app_id,
		'app_secret' => $app_secret,
		'default_graph_version' => $default_graph_version,
	]);

	$curl = new Curl\Curl();
	$curl->get('https://graph.facebook.com/oauth/access_token', array(
		'client_id' => $app_id,
		'client_secret' => $app_secret,
		'grant_type' => 'client_credentials',
	));

	if ($curl->error) {
		echo 'Error Code: <p/>';
		echo $curl->error_code;
		echo '<p/> bad app_id or app_secret';
	}
	else {
		setcookie("facebook_app_sdk", $curl->response);
	}
	curl_close($curl->curl);
?>