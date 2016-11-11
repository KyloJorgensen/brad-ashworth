'use strict';

var redux = require('redux'),
	createStore = redux.createStore,
	applyMiddleware = redux.applyMiddleware,
	thunk = require('redux-thunk').default,
	userReducer = require('./reducers/user.reducer'),
	newsReducer = require('./reducers/news.reducer');

var initialState = {};

var reducers = function(state, action) {
    state = state || initialState;
    var _state = {};
	_state.user = userReducer(state.user, action);
	_state.news = newsReducer(state.news, action);
    return _state;
};

var store = createStore(reducers, applyMiddleware(thunk));
module.exports  = store;