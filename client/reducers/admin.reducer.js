'use strict';

var actions = require('../actions/admin.actions');

var userInitialState = {};

var userReducer = function(state, action) {
    state = state || userInitialState;
    if (action.type === actions.LOGIN_ERROR) {
    	console.log(action.error);
    	state.key = false;
    }
    if (action.type === actions.LOGOUT_SUCCESS) {
        state.key = false;
    }
    if (action.type === actions.LOGOUT_ERROR) {
        state.key = false;
    }
    return state;
};

module.exports = userReducer;