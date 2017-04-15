'use strict';

var actions = require('../actions/admin.actions'),
    cookie = require('../utilities/cookie');

var userInitialState = {
    mainNewsCount: 3,
    newsListCount: 10,
    facebookAppId: cookie.get("facebook_app_id") || "",
    facebookAppVersion: cookie.get("facebook_app_version") || "",
    facebook_page_id: cookie.get("facebook_page_id") || "",
    scope: 'pages_show_list,public_profile',
};

var userReducer = function(state, action) {
    state = state || userInitialState;
    var _state = state;
    _state.facebookAppId = cookie.get("facebook_app_id") || "";
    _state.facebookAppVersion = cookie.get("facebook_app_version") || "";
    if (action.type === actions.LOGIN_ERROR) {
    	console.log(action.error);
    	_state.key = false;
    }
    if (action.type === actions.LOGOUT_SUCCESS) {
        _state.key = false;
    }
    if (action.type === actions.LOGOUT_ERROR) {
        _state.key = false;
    }
    if (action.type === actions.ADD_ADMIN_SUCCESS) {
        console.log(action)
    }
    if (action.type === actions.ADD_ADMIN_ERROR) {
        console.log(action)
    }
    return _state;
};

module.exports = userReducer;