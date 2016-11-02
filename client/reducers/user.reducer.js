'use strict';

var actions = require('../actions/user.actions');

var userInitialState = {

};

var userReducer = function(state, action) {
    state = state || userInitialState;
    if (action.type === actions.GET_USER_NAME_SUCCESS) {
    	state.name = action.name;
    }
    return state;
};

module.exports = userReducer;