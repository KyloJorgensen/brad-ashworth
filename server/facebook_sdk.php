<?php
	require_once __DIR__ .'/../vendor/autoload.php';

	$app_id = $__SERVERCONFIG__->FACEBOOK_APP_ID;
	$app_secret = $__SERVERCONFIG__->FACEBOOK_APP_SECRET;
	$app_version = $__SERVERCONFIG__->FACEBOOK_DEFAULT_GRAPH_VERSION;
	$page_id = $__SERVERCONFIG__->FACEBOOK_PAGE_ID;

	$fb = new Facebook\Facebook([
		'app_id' => $app_id,
		'app_secret' => $app_secret,
		'default_graph_version' => $app_version,
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
		echo $curl->error_type;
		echo $curl->error_message;
		echo '<p/> bad app_id or app_secret';
	}
	else {
		$response = json_decode($curl->response);
		setcookie("facebook_app_token", $response->access_token);
		setcookie("facebook_app_id", $app_id);
		setcookie("facebook_app_version", $app_version);
		setcookie("facebook_page_id", $page_id);
	}
	curl_close($curl->curl);
?>

