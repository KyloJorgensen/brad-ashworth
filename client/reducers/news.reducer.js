'use strict';

var actions = require('../actions/news.actions');

var newsInitialState = {
	newsEntries: [],
    currentPage: 1,
    totalEntries: 1,
};

var newsReducer = function(state, action) {
    state = state || newsInitialState;
    if (action.type === actions.GET_NEWS_ENTRIES_SUCCESS) {
    	state.newsEntries = action.data.news;
        state.totalEntries = action.data.totalEntries;
    }
    if (action.type === actions.GET_NEWS_ENTRIES_ERROR) {
    	state.newsEntries = [];
    	console.log(action.error);
    }
    if (action.type === actions.NEXT_PAGE) {
        if ((state.currentPage)*10 < state.totalEntries) {
           state.currentPage++; 
        }
    }
    if (action.type === actions.PREVIOUS_PAGE) {
        if (state.currentPage != 1) {
            state.currentPage--;
        }
    }
    return state;
};

module.exports = newsReducer;