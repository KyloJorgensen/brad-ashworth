'use strict';

var actions = require('../actions/admin.actions');

var userInitialState = {};

var userReducer = function(state, action) {
    state = state || userInitialState;
    var _state = state;
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
    return _state;
};

module.exports = userReducer;