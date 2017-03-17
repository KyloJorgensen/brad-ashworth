'use strict';

var actions = require('../actions/news.actions'),
    appConfig = require('../app.cfg');

var d = new Date();

var newsInitialState = {
    newsPosts: [],
    currentPost: {
        idnews: 'false',
        title: 'News Loading',
        created_time: d.toString(),
        content: 'News Loading please wait...'
    },
    loading: false,
    next: false,
    previous: false,
};

var newsReducer = function(state, action) {
    state = state || newsInitialState;
    var _state = state;
    if (action.type === actions.GET_NEWS_POST_SUCCESS) {
        for (var i = 0; i < _state.newsPosts.length; i++) {
            if(_state.newsPosts[i].id == action.data.id) {
                _state.newsPosts[i] = action.data;
                break;
            }
        }
    }
    if (action.type === actions.GET_NEWS_POST_ERROR) {
        _state.currentPost.idnews = false;
        _state.currentPost.title = 'No News';
        _state.currentPost.date_enter = d.toLocaleDateString();
        _state.currentPost.content = 'No news, please try back later.';
    }
    if (action.type === actions.GETTING_NEWS_POSTS) {
        _state.loading = true;
    }
    if (action.type === actions.GET_NEWS_POSTS_SUCCESS) {
        _state.loading = false;
        var newsPosts = _state.newsPosts||[];
        for (var g = 0; g < action.data.length; g++) {
            var exists = false;
            for (var i = 0; i < newsPosts.length; i++) {
                if(newsPosts[i].id == action.data[g].id) {
                    exists = true;
                    break;
                }
            }
            if (!exists) {
                if (newsPosts.length == 0) {
                    newsPosts[0] = action.data[g];
                } else {
                    if (newsPosts[0].created_time > action.data[g].created_time) {
                        newsPosts.push(action.data[g]);
                    } else {
                        for (var i = 0; i < newsPosts.length; i++) {
                            if (newsPosts[i].created_time < action.data[g].created_time) {
                                newsPosts.unshift(action.data[g]);
                                break;
                            }
                        }
                    } 
                }
            }
        }
        _state.newsPosts = newsPosts;
        if (action.paging) {
            _state.next = action.paging.next || false;
            _state.previous = action.paging.previous || false;
        }
    }
    if (action.type === actions.GET_NEWS_POSTS_ERROR) {
        _state.loading = false;
        _state.newsPosts = [];
        console.log(action.error);
    }
    return _state;
};

module.exports = newsReducer;