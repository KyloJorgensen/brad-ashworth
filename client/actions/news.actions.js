'use strict';

var fetch = require('isomorphic-fetch');

var getNewsEntries = function(currentPage){
    console.log(currentPage);
    return function(dispatch) {
        var url = '/news/10/' + (currentPage-1)*10;
        return fetch(url, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }   
        }).then(function(response) {
            if (response.status < 200 || response.status >= 300) {
                var error = new Error(response.statusText)
                error.response = response
                throw error;
            }
            return response;
        })
        .then(function(response) {
            console.log(response)
            return response.json();
        })
        .then(function(data) {
            return dispatch(getNewsEntriesSuccess(data));
        })
        .catch(function(error) {
            return dispatch(getNewsEntriesError(error));
        });
    }
};

var GET_NEWS_ENTRIES_SUCCESS = 'GET_NEWS_ENTRIES_SUCCESS';
var getNewsEntriesSuccess = function(data) {
    return {
        type: GET_NEWS_ENTRIES_SUCCESS,
        data: data
    };
};

var GET_NEWS_ENTRIES_ERROR = 'GET_NEWS_ENTRIES_ERROR';
var getNewsEntriesError = function(error) {
    return {
        type: GET_NEWS_ENTRIES_ERROR,
        error: error
    };
};

var NEXT_PAGE = 'NEXT_PAGE';
var nextPage = function() {
    return {
        type: NEXT_PAGE
    }
};

var PREVIOUS_PAGE = 'PREVIOUS_PAGE';
var previousPage = function() {
    return {
        type: PREVIOUS_PAGE
    }
};

var updateNewsEntry = function(payload, currentPage) {
    return function(dispatch) {
        var url = '/news';
        return fetch(url, {
            method: 'PUT',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(payload), 
        }).then(function(response) {
            if (response.status < 200 || response.status >= 300) {
                var error = new Error(response.statusText)
                error.response = response
                throw error;
            }
            return response;
        })
        .then(function(response) {
            dispatch(getNewsEntries(currentPage));
            return dispatch(updateNewsEntrySuccess());
        })
        .catch(function(error) {
            return dispatch(updateNewsEntryError(error));
        });
    };
}

var UPDATE_NEWS_ENTRY_SUCCESS = 'UPDATE_NEWS_ENTRY_SUCCESS';
var updateNewsEntrySuccess = function() {
    return {
        type: UPDATE_NEWS_ENTRY_SUCCESS
    }
};

var UPDATE_NEWS_ENTRY_ERROR = 'UPDATE_NEWS_ENTRY_ERROR';
var updateNewsEntryError = function() {
    return {
        type: UPDATE_NEWS_ENTRY_ERROR
    }
};

var removeNewsEntry = function(payload, currentPage) {
    return function(dispatch) {
        var url = '/news';
        return fetch(url, {
            method: 'DELETE',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(payload), 
        }).then(function(response) {
            if (response.status < 200 || response.status >= 300) {
                var error = new Error(response.statusText)
                error.response = response
                throw error;
            }
            return response;
        })
        .then(function(response) {
            dispatch(getNewsEntries(currentPage));
            return dispatch(removeNewsEntrySuccess());
        })
        .catch(function(error) {
            return dispatch(removeNewsEntryError(error));
        });
    };
}

var REMOVE_NEWS_ENTRY_SUCCESS = 'REMOVE_NEWS_ENTRY_SUCCESS';
var removeNewsEntrySuccess = function() {
    return {
        type: REMOVE_NEWS_ENTRY_SUCCESS
    }
};

var REMOVE_NEWS_ENTRY_ERROR = 'REMOVE_NEWS_ENTRY_ERROR';
var removeNewsEntryError = function() {
    return {
        type: REMOVE_NEWS_ENTRY_ERROR
    }
};

var addNewsEntry = function(title, content, currentPage) {
    var payload = {
        title: title,
        content: content
    };
    return function(dispatch) {
        var url = '/news';
        return fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(payload), 
        }).then(function(response) {
            if (response.status < 200 || response.status >= 300) {
                var error = new Error(response.statusText)
                error.response = response
                throw error;
            }
            return response;
        })
        .then(function(response) {
            dispatch(getNewsEntries(currentPage));
            return dispatch(addNewsEntrySuccess());
        })
        .catch(function(error) {
            return dispatch(addNewsEntryError(error));
        });
    };
}

var ADD_NEWS_ENTRY_SUCCESS = 'ADD_NEWS_ENTRY_SUCCESS';
var addNewsEntrySuccess = function() {
    return {
        type: ADD_NEWS_ENTRY_SUCCESS
    }
};

var ADD_NEWS_ENTRY_ERROR = 'ADD_NEWS_ENTRY_ERROR';
var addNewsEntryError = function() {
    return {
        type: ADD_NEWS_ENTRY_ERROR
    }
};

exports.getNewsEntries = getNewsEntries;
exports.GET_NEWS_ENTRIES_SUCCESS = GET_NEWS_ENTRIES_SUCCESS;
exports.getNewsEntriesSuccess = getNewsEntriesSuccess;
exports.GET_NEWS_ENTRIES_ERROR = GET_NEWS_ENTRIES_ERROR;
exports.getNewsEntriesError = getNewsEntriesError;
exports.NEXT_PAGE = NEXT_PAGE;
exports.nextPage = nextPage;
exports.PREVIOUS_PAGE = PREVIOUS_PAGE;
exports.previousPage = previousPage;
exports.updateNewsEntry = updateNewsEntry;
exports.UPDATE_NEWS_ENTRY_SUCCESS = UPDATE_NEWS_ENTRY_SUCCESS;
exports.updateNewsEntrySuccess = updateNewsEntrySuccess;
exports.UPDATE_NEWS_ENTRY_ERROR = UPDATE_NEWS_ENTRY_ERROR;
exports.updateNewsEntryError = updateNewsEntryError;
exports.removeNewsEntry = removeNewsEntry;
exports.REMOVE_NEWS_ENTRY_SUCCESS = REMOVE_NEWS_ENTRY_SUCCESS;
exports.removeNewsEntrySuccess = removeNewsEntrySuccess;
exports.REMOVE_NEWS_ENTRY_ERROR = REMOVE_NEWS_ENTRY_ERROR;
exports.addNewsEntry = addNewsEntry;
exports.ADD_NEWS_ENTRY_SUCCESS = ADD_NEWS_ENTRY_SUCCESS;
exports.addNewsEntrySuccess = addNewsEntrySuccess;
exports.ADD_NEWS_ENTRY_ERROR = ADD_NEWS_ENTRY_ERROR;
exports.addNewsEntryError = addNewsEntryError;
exports.removeNewsEntryError = removeNewsEntryError;