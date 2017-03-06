'use strict';

var fetch = require('isomorphic-fetch');
var redirect = false;

var login = function(username, password, that) {
    var payload = {
        username: username,
        password: password
    };
    return function(dispatch) {
        redirect = that;
        var url = '/login.php';
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
        .then(function(data) {
            return dispatch(loginSuccess());
        })
        .catch(function(error) {
            return dispatch(loginError(error));
        });
    }
};

var LOGIN_SUCCESS = 'LOGIN_SUCCESS';
var loginSuccess = function(data) {
    redirect.replace('/');
    console.log('here')
    redirect = false;
    return {
        type: LOGIN_SUCCESS
    };
};

var LOGIN_ERROR = 'LOGIN_ERROR';
var loginError = function(error) {
    redirect = false;
    return {
        type: LOGIN_ERROR,
        error: error
    };
};

var logout = function(that) {
    return function(dispatch) {
        redirect = that;
        var url = '/logout.php';
        return fetch(url, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },    
        }).then(function(response) {
            if (response.status < 200 || response.status >= 300) {
                var error = new Error(response.statusText)
                error.response = response
                throw error;
            }
            return response;
        })
        .then(function(data) {
            return dispatch(logoutSuccess());
        })
        .catch(function(error) {
            return dispatch(logoutError(error));
        });
    }
};

var LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
var logoutSuccess = function(data) {
    redirect.replace('/');
    console.log('here')
    redirect = false;
    return {
        type: LOGOUT_SUCCESS
    };
};

var LOGOUT_ERROR = 'LOGOUT_ERROR';
var logoutError = function(error) {
    redirect = false;
    return {
        type: LOGOUT_ERROR,
        error: error
    };
};

exports.login = login;
exports.LOGIN_SUCCESS = LOGIN_SUCCESS;
exports.loginSuccess = loginSuccess;
exports.LOGIN_ERROR = LOGIN_ERROR;
exports.loginError = loginError;
exports.logout = logout;
exports.LOGOUT_SUCCESS = LOGOUT_SUCCESS;
exports.logoutSuccess = logoutSuccess;
exports.LOGOUT_ERROR = LOGOUT_ERROR;
exports.logoutError = logoutError;