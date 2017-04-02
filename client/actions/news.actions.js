'use strict';

var fetch = require('isomorphic-fetch'),
    APP_CONFIG = require('../app.cfg'),
    cookie = require('../utilities/cookie');

var getNewsPost = function(newsPostId) {
    return function(dispatch) {
        var url = "https://graph.facebook.com/"
        + cookie.get("facebook_app_version")
        + "/" + newsPostId 
        + '?fields=created_time,story,message,actions,full_picture,type,status_type,picture'
        + "&format=json&access_token=" 
        + cookie.get('facebook_app_token');
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
        }).then(function(response) {
            return response.json();
        }).then(function(response) {
            return dispatch(getNewsPostSuccess(response));
        }).catch(function(error) {
            return dispatch(getNewsPostError(error));
        });
    };
};

var GET_NEWS_POST_SUCCESS = 'GET_NEWS_POST_SUCCESS';
var getNewsPostSuccess = function(response) {
    return {
        type: GET_NEWS_POST_SUCCESS,
        data: response
    };
}

var GET_NEWS_POST_ERROR ='GET_NEWS_POST_ERROR';
var getNewsPostError = function(error) {
    console.log(error);
    return {
        type: GET_NEWS_POST_ERROR,
        error: error
    };
};

var getNewsPosts = function(limit){
    return function(dispatch) {
        dispatch(gettingNewsEnteries());
        var _url = "https://graph.facebook.com/"
        + cookie.get("facebook_app_version")
        + "/ArtistBradAshworth" 
        + "/feed?fields=created_time&limit=" 
        + limit 
        + "&format=json&access_token=" 
        + cookie.get('facebook_app_token');
        return fetch(_url, {
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
            return response.json();
        })
        .then(function(response) {
            return dispatch(getNewsPostsSuccess(response));
        })
        .catch(function(error) {
            return dispatch(getNewsPostsError(error));
        });
    };
};

var getMoreNewsPosts = function(url) {
    return function(dispatch) {
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
            return response.json();
        })
        .then(function(response) {
            return dispatch(getNewsPostsSuccess(response));
        })
        .catch(function(error) {
            return dispatch(getNewsPostsError(error));
        });
    }
};

var GETTING_NEWS_POSTS = 'GETTING_NEWS_POSTS';
var gettingNewsEnteries = function(request) {
    return {
        type: GETTING_NEWS_POSTS,
    };
}

var GET_NEWS_POSTS_SUCCESS = 'GET_NEWS_POSTS_SUCCESS';
var getNewsPostsSuccess = function(response) {
    // console.log(response);
    return {
        type: GET_NEWS_POSTS_SUCCESS,
        data: response.data,
        paging: response.paging
    };
};

var GET_NEWS_POSTS_ERROR = 'GET_NEWS_POSTS_ERROR';
var getNewsPostsError = function(error) {
    console.log(error);
    return {
        type: GET_NEWS_POSTS_ERROR,
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

var updateNewsPost = function(payload) {
    return function(dispatch) {
        var url = '/news.php';
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
            return dispatch(updateNewsPostSuccess());
        })
        .catch(function(error) {
            return dispatch(updateNewsPostError(error));
        });
    };
}

var UPDATE_NEWS_POST_SUCCESS = 'UPDATE_NEWS_POST_SUCCESS';
var updateNewsPostSuccess = function() {
    return {
        type: UPDATE_NEWS_POST_SUCCESS
    }
};

var UPDATE_NEWS_POST_ERROR = 'UPDATE_NEWS_POST_ERROR';
var updateNewsPostError = function() {
    return {
        type: UPDATE_NEWS_POST_ERROR
    }
};

var removeNewsPost = function(payload) {
    return function(dispatch) {
        var url = '/news.php';
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
            return dispatch(removeNewsPostSuccess());
        })
        .catch(function(error) {
            return dispatch(removeNewsPostError(error));
        });
    };
}

var REMOVE_NEWS_POST_SUCCESS = 'REMOVE_NEWS_POST_SUCCESS';
var removeNewsPostSuccess = function() {
    return {
        type: REMOVE_NEWS_POST_SUCCESS
    }
};

var REMOVE_NEWS_POST_ERROR = 'REMOVE_NEWS_POST_ERROR';
var removeNewsPostError = function() {
    return {
        type: REMOVE_NEWS_POST_ERROR
    }
};

var addNewsPost = function(title, content, amount, currentPage) {
    var payload = {
        title: title,
        content: content
    };
    return function(dispatch) {
        var url = '/news.php';
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
            dispatch(getNewsPosts(amount, currentPage));
            return dispatch(addNewsPostSuccess());
        })
        .catch(function(error) {
            return dispatch(addNewsPostError(error));
        });
    };
}

var ADD_NEWS_POST_SUCCESS = 'ADD_NEWS_POST_SUCCESS';
var addNewsPostSuccess = function() {
    return {
        type: ADD_NEWS_POST_SUCCESS
    };
};

var ADD_NEWS_POST_ERROR = 'ADD_NEWS_POST_ERROR';
var addNewsPostError = function() {
    return {
        type: ADD_NEWS_POST_ERROR
    };
};

var SET_POSTS_AMOUNT = 'SET_POSTS_AMOUNT';
var setPostsAmount = function(amount) {
    return {
        type: SET_POSTS_AMOUNT,
        amount: amount
    };
};

exports.getNewsPost = getNewsPost;
exports.GET_NEWS_POST_SUCCESS = GET_NEWS_POST_SUCCESS;
exports.GET_NEWS_POST_ERROR = GET_NEWS_POST_ERROR;
exports.getNewsPosts = getNewsPosts;
exports.getMoreNewsPosts = getMoreNewsPosts;
exports.GET_NEWS_POSTS_SUCCESS = GET_NEWS_POSTS_SUCCESS;
exports.getNewsPostsSuccess = getNewsPostsSuccess;
exports.GET_NEWS_POSTS_ERROR = GET_NEWS_POSTS_ERROR;
exports.getNewsPostsError = getNewsPostsError;
exports.NEXT_PAGE = NEXT_PAGE;
exports.nextPage = nextPage;
exports.PREVIOUS_PAGE = PREVIOUS_PAGE;
exports.previousPage = previousPage;
exports.updateNewsPost = updateNewsPost;
exports.UPDATE_NEWS_POST_SUCCESS = UPDATE_NEWS_POST_SUCCESS;
exports.updateNewsPostSuccess = updateNewsPostSuccess;
exports.UPDATE_NEWS_POST_ERROR = UPDATE_NEWS_POST_ERROR;
exports.updateNewsPostError = updateNewsPostError;
exports.removeNewsPost = removeNewsPost;
exports.REMOVE_NEWS_POST_SUCCESS = REMOVE_NEWS_POST_SUCCESS;
exports.removeNewsPostSuccess = removeNewsPostSuccess;
exports.REMOVE_NEWS_POST_ERROR = REMOVE_NEWS_POST_ERROR;
exports.addNewsPost = addNewsPost;
exports.ADD_NEWS_POST_SUCCESS = ADD_NEWS_POST_SUCCESS;
exports.addNewsPostSuccess = addNewsPostSuccess;
exports.ADD_NEWS_POST_ERROR = ADD_NEWS_POST_ERROR;
exports.addNewsPostError = addNewsPostError;
exports.SET_POSTS_AMOUNT = SET_POSTS_AMOUNT;
exports.setPostsAmount = setPostsAmount;