'use strict';

var actions = require('../actions/facebook.actions'),
    cookie = require('../utilities/cookie');

var facebookReducer = function(state, action) {
    var facebookInitialState = {
        mainNewsCount: 3,
        newsListCount: 10,
        facebookAppId: cookie.get("facebook_app_id") || "",
        facebookAppVersion: cookie.get("facebook_app_version") || "",
        facebookPageId: cookie.get("facebook_page_id") || "",
        scope: ['public_profile'],
        adminScope: ['pages_show_list','public_profile'],
        profile: {
            id: '',
            first_name: '',
            cover: {
                id: '',
                source: '',
            }
        },
        title: 'Welcome',
    };
    state = state || facebookInitialState;
    var _state = state;
    if (action.type === actions.GETFBPROFILE_SUCCESS) {
        _state.profile = action.response || facebookInitialState.profile;
    }
    if (action.type === actions.GETFBPROFILE_ERROR) {
        console.log(action.error);
        _state.profile = facebookInitialState.profile;
    }
    if (action.type === actions.FBLOGOUT_SUCCESS) {
        _state.profile = facebookInitialState.profile;
        _state.title = facebookInitialState.title;
    }
    if (action.type === actions.FBLOGOUT_ERROR) {
        console.log(action.error);
        alert('logout failed');
    }
    if (action.type === actions.VALPERMISSIONS_SUCCESS) {
        _state.title = 'Hello';
    }
    if (action.type === actions.VALPERMISSIONS_ERROR) {
        _state.title = facebookInitialState.title;
        alert(action.error.message);
    }
    if (action.type === actions.VALACCOUNTS_SUCCESS) {
        _state.title = 'Admin'
    }
    if (action.type === actions.VALACCOUNTS_ERROR) {
        _state.title = 'Hello';
        alert(action.error.message);
    }
    return _state;
};

module.exports = facebookReducer;