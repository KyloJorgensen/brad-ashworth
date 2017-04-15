'use strict';

var fetch = require('isomorphic-fetch');
var redirect = false;

var login = function(adminName, password, that) {
    var payload = {
        adminName: adminName,
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
            return dispatch(loginSuccess(data));
        })
        .catch(function(error) {
            return dispatch(loginError(error));
        });
    }
};

var LOGIN_SUCCESS = 'LOGIN_SUCCESS';
var loginSuccess = function() {
    redirect.replace('/admin');
    redirect = false;
    return {
        type: LOGIN_SUCCESS,
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

var ADD_ADMIN = 'ADD_ADMIN';
var addAdmin = function(adminName, password) {
    var payload = {
        adminName: adminName,
        password: password,
    };
    return function(dispatch) {
        var url = '/admin.php';
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
            return dispatch(addAdminSuccess(response));
        })
        .catch(function(error) {
            return dispatch(addAdminError(error));
        });
    };
};

var ADD_ADMIN_SUCCESS = "ADD_ADMIN_SUCCESS";
var addAdminSuccess = function(data) {
    return {
        type: ADD_ADMIN_SUCCESS,
        data: data,
    };
};

var ADD_ADMIN_ERROR = 'ADD_ADMIN_ERROR';
var addAdminError = function(error) {
    return {
        type: ADD_ADMIN_ERROR,
        error: error,
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
exports.addAdmin = addAdmin;
exports.ADD_ADMIN_SUCCESS = ADD_ADMIN_SUCCESS;
exports.addAdminSuccess = addAdminSuccess;
exports.ADD_ADMIN_ERROR = ADD_ADMIN_ERROR;
exports.addAdminError = addAdminError;