'use strict';
var APP_CONFIG = require('../app.cfg');

window.fbAsyncInit = function() {
	FB.init({
		appId: APP_CONFIG.FACEBOOK_APP_ID,
		xfbml: true,
		version: 'v2.8'
	});
	FB.AppEvents.logPageView();
};

(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version="+APP_CONFIG.FACEBOOK_APP_VERSION+"&appId="+APP_CONFIG.FACEBOOK_APP_ID;
		fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));