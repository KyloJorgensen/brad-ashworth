'use strict';

var fetch = require('isomorphic-fetch');
var redirect = false;

var signup = function(name, username, password, that) {
    var payload = {
        username: username,
        password: password,
        name: name
    };
    return function(dispatch) {
        redirect = that.props.history;
        var url = '/user';
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
            return response.json();
        })
        .then(function(data) {
            return dispatch(signupSuccess(data));
        })
        .catch(function(error) {
            return dispatch(signupError(error));
        });
    }
};

var SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
var signupSuccess = function(data) {
    redirect.replace('/user');
    redirect = false;
    return {
        type: SIGNUP_SUCCESS,
        data: data
    };
};

var SIGNUP_ERROR = 'SIGNUP_ERROR';
var signupError = function(error) {
    redirect = false;
    return {
        type: SIGNUP_ERROR,
        error: error
    };
};

exports.signup = signup;
exports.SIGNUP_SUCCESS = SIGNUP_SUCCESS;
exports.signupSuccess = signupSuccess;
exports.SIGNUP_ERROR = SIGNUP_ERROR;
exports.signupError = signupError;