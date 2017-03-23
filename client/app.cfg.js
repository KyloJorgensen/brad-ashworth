'use strict';
var cookie = require('./utilities/cookie');
var appConfig = {};
appConfig.MAIN_NEWS_COUNT = 3;
appConfig.NEWS_LIST_COUNT = 10;
appConfig.FACEBOOK_APP_ID = cookie.get("facebook_app_id") || "1551677151527898";
appConfig.FACEBOOK_APP_VERSION = cookie.get("facebook_app_version") || "v2.8";

module.exports = appConfig;