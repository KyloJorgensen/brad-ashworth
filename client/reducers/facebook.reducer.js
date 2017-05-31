'use strict';

var actions = require('../actions/facebook.actions'),
    cookie = require('../utilities/cookie');

var facebookInitialState = {
    mainNewsCount: 3,
    newsListCount: 10,
    facebookAppId: cookie.get("facebook_app_id") || "",
    facebookAppVersion: cookie.get("facebook_app_version") || "",
    facebook_page_id: cookie.get("facebook_page_id") || "",
    scope: ['public_profile'],
    adminScope: ['pages_show_list','public_profile'],
};

var facebookReducer = function(state, action) {
    state = state || facebookInitialState;
    var _state = state;
    _state.facebookAppId = cookie.get("facebook_app_id") || "";
    _state.facebookAppVersion = cookie.get("facebook_app_version") || "";
    console.log(action);    
    // if (action.type === actions.LOGIN_ERROR) {
    // 	console.log(action.error);
    // 	_state.key = false;
    // }
    // if (action.type === actions.LOGOUT_SUCCESS) {
    //     _state.key = false;
    // }
    return _state;
};

module.exports = facebookReducer;