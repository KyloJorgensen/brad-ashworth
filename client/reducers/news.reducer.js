'use strict';

var actions = require('../actions/news.actions'),
    appConfig = require('../app.cfg');

var d = new Date();

var newsInitialState = {
    newsEntries: [],
    currentPage: 1,
    totalEntries: 0,
    currentEntry: {
        idnews: 'false',
        title: 'News Loading',
        created_time: d.toString(),
        content: 'News Loading please wait...'
    }
};

var newsReducer = function(state, action) {
    state = state || newsInitialState;
    if (action.type === actions.GET_NEWS_ENTRY_SUCCESS) {
        for (var i = 0; i < state.newsEntries.length; i++) {
            if(state.newsEntries[i].id == action.data.id) {
                state.newsEntries[i] = action.data;
                break;
            }
        }
    }
    if (action.type === actions.GET_NEWS_ENTRY_ERROR) {
        state.currentEntry.idnews = false;
        state.currentEntry.title = 'No News';
        state.currentEntry.date_enter = d.toLocaleDateString();
        state.currentEntry.content = 'No news, please try back later.';
    }
    if (action.type === actions.GET_NEWS_ENTRIES_SUCCESS) {
        console.log(action);
        var newsEntries = state.newsEntries||[];
console.log(newsEntries);
        for (var g = 0; g < action.data.length; g++) {
            var exists = false;
            for (var i = 0; i < newsEntries.length; i++) {
                if(newsEntries[i].id == action.data[g].id) {
                    exists = true;
                    break;
                }
            }
            if (!exists) {
                console.log('adding')
                if (newsEntries.length == 0) {
                    newsEntries[0] = action.data[g];
                } else {
                    if (newsEntries[0].created_time > action.data[g].created_time) {
                        newsEntries.push(action.data[g]);
                    } else {
                        for (var i = 0; i < newsEntries.length; i++) {
                            if (newsEntries[i].created_time < action.data[g].created_time) {
                                newsEntries.unshift(action.data[g]);
                                break;
                            }
                        }
                    } 
                }
            }
        }
        console.log(newsEntries);
        state.newsEntries = newsEntries; 
        console.log(state)
    }
    if (action.type === actions.GET_NEWS_ENTRIES_ERROR) {
        // state.newsEntries = [];
        console.log(action.error);
    }
    return state;
};

module.exports = newsReducer;