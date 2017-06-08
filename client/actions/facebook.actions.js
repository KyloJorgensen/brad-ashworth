'use strict';

var fetch = require('isomorphic-fetch');

var fbAsyncInit = function(appId, facebookPageId, version, callback, scope) {
    window.fbAsyncInit = function() {
        FB.init({
            appId: appId,
            xfbml: true,
            version: version,
            cookie: true,
        });
        FB.AppEvents.logPageView();
        callback(fbloginstatus({facebookPageId: facebookPageId, scope: scope, login: true}));
    };
}

exports.fbAsyncInit = fbAsyncInit;

var getfbprofile = function(response) {
    return function(dispatch) {
        return FB.api('/me', {fields: 'first_name,cover'}, function(response) {
            if (!response || response.error) {
                return dispatch(getfbprofileError(response));
            } else {
                return dispatch(getfbprofileSuccess(response));
            }
        });
    }
};

var GETFBPROFILE_SUCCESS = 'GETFBPROFILE_SUCCESS';
var getfbprofileSuccess = function(response) {
    return {
        type: GETFBPROFILE_SUCCESS,
        response: response,
    };
};

var GETFBPROFILE_ERROR = 'GETFBPROFILE_ERROR';
var getfbprofileError = function(response) {
    return {
        type: GETFBPROFILE_ERROR,
        error: response,
    };
};

exports.getfbprofile = getfbprofile;
exports.GETFBPROFILE_SUCCESS = GETFBPROFILE_SUCCESS;
exports.getfbprofileSuccess = getfbprofileSuccess;
exports.GETFBPROFILE_ERROR = GETFBPROFILE_ERROR;
exports.getfbprofileError = getfbprofileError;

var fbloginstatus = function(parameters) {
    return function(dispatch) {
        return FB.getLoginStatus(function(response) {
            parameters.response = response;
            return dispatch(handleStatusChange(parameters));
        });
    }
};

var FBLOGINSTATUS_SUCCESS = 'FBLOGINSTATUS_SUCCESS';
var fbloginstatusSuccess = function(response) {
    return {
        type: FBLOGINSTATUS_SUCCESS,
        response: response,
    };
};

var FBLOGINSTATUS_ERROR = 'FBLOGINSTATUS_ERROR';
var fbloginstatusError = function(error) {
    return {
        type: FBLOGINSTATUS_ERROR,
        error: error,
    };
};

exports.fbloginstatus = fbloginstatus;
exports.FBLOGINSTATUS_SUCCESS = FBLOGINSTATUS_SUCCESS;
exports.fbloginstatusSuccess = fbloginstatusSuccess;
exports.FBLOGINSTATUS_ERROR = FBLOGINSTATUS_ERROR;
exports.fbloginstatusError = fbloginstatusError;

//handle the status change
var handleStatusChange = function(parameters) {
    return function(dispatch) {
        if (parameters.response.status === 'connected') {
            // the user is logged in and has authenticated your
            // app, and parameters.response.authResponse supplies
            // the user's ID, a valid access token, a signed
            // request, and the time the access token 
            // and signed request each expire
            var uid = parameters.response.authResponse.userID;
            var accessToken = parameters.response.authResponse.accessToken;
            dispatch(getPermissions(parameters));
            dispatch(getfbprofile(parameters.response));
            return dispatch(fbloginstatusSuccess(parameters.response));
        } else if (parameters.response.status === 'not_authorized') {
            // the user is logged in to Facebook, 
            // but has not authenticated your app
            console.log('not_aurthorized');
            dispatch(fblogin(parameters));
            return dispatch(fbloginstatusSuccess(parameters.response));
        } else {
            // the user isn't logged in to Facebook.
            console.log('not logged in');
                dispatch(fblogin(parameters));
            return dispatch(fbloginstatusError(parameters.response));
        }
    }
};

exports.handleStatusChange = handleStatusChange;

//facebook login
var fblogin = function(parameters) {
    return function(dispatch) {
        if (!parameters.login) {
            var scope = parameters.scope || parameters.adminScope
            var _scope = '';

            for (var i = 0; i < scope.length; i++) {
                _scope = _scope + scope[i]
                if (i != scope.length - 1) {
                    _scope = _scope + ',';
                }           
            }

            return FB.login(function(response) {
                parameters.response = response;
                parameters.login = true;
                return dispatch(handleStatusChange(parameters));
            }, {
                scope: _scope,
                enable_profile_selector: true,
                profile_selector_ids: parameters.facebookPageId,
            });
        } else {
            return dispatch(fbloginError({reason: "User Failed to Login In"}));
        } 
    }
};

var FBLOGIN_SUCCESS = 'FBLOGIN_SUCCESS';
var fbloginSuccess = function(response) {
    return {
        type: FBLOGIN_SUCCESS,
        response: response,
    };
};

var FBLOGIN_ERROR = 'FBLOGIN_ERROR';
var fbloginError = function(error) {
    return {
        type: FBLOGIN_ERROR,
        error: error,
    };
};

exports.fblogin = fblogin;
exports.FBLOGIN_SUCCESS = FBLOGIN_SUCCESS;
exports.fbloginSuccess = fbloginSuccess;
exports.FBLOGIN_ERROR = FBLOGIN_ERROR;
exports.fbloginError = fbloginError;

//facebook logout
var fblogout = function() {
    return function(dispatch) {
        FB.logout(function(response) {
            return dispatch(fblogoutSuccess(response));
        });
    }
}

var FBLOGOUT_SUCCESS = 'FBLOGOUT_SUCCESS';
var fblogoutSuccess = function(response) {
    return {
        type: FBLOGOUT_SUCCESS,
        response: response,
    }
};

var FBLOGOUT_ERROR = 'FBLOGOUT_ERROR';
var fblogoutError = function(response) {
    return {
        type: FBLOGOUT_ERROR,
        response: response,
    }
};

exports.fblogout = fblogout;
exports.FBLOGOUT_SUCCESS = FBLOGOUT_SUCCESS;
exports.fblogoutSuccess = fblogoutSuccess;
exports.FBLOGOUT_ERROR = FBLOGOUT_ERROR;
exports.fblogoutError

//  get  facebookm page permissions
var getPermissions = function(parameters) {
    return function(dispatch) {
            FB.api('/me/permissions', 'GET', {}, function(response) {
                parameters.response = response;
                dispatch(valPermissions(parameters));
                return dispatch(getPermissionsSuccess(response));
            });
    };
};

var GETPERMISSIONS_SUCCESS = 'GETPERMISSIONS_SUCCESS';
var getPermissionsSuccess = function(response) {
    return {
        type: GETPERMISSIONS_SUCCESS,
        response: response,
    };
};

var GETPERMISSIONS_ERROR = 'GETPERMISSIONS_ERROR';
var getPermissionsError = function(error) {
    return {
        type: GETPERMISSIONS_ERROR,
        error: error,
    };
};

exports.getPermissions = getPermissions;
exports.GETPERMISSIONS_SUCCESS = GETPERMISSIONS_SUCCESS;
exports.getPermissionsSuccess = getPermissionsSuccess;
exports.GETPERMISSIONS_ERROR = GETPERMISSIONS_ERROR;
exports.getPermissionsError = getPermissionsError;

//  validate facebook permissions granted

var valPermissions = function(parameters) {
    return function(dispatch) {
        var _scope = parameters.adminScope || parameters.scope;
        var dataLength = parameters.response.data.length;        
        var _data = parameters.response.data;
        var granted = true;
        for (var i = 0; i < _scope.length; i++) {
            for (var g = 0; g < _data.length; g++) {
                if (_scope[i] == _data[g].permission) {
                    _data[g].status
                    if (_data[g].status != 'granted') {
                        granted = false;
                    }
                    _data.splice(g, 1);
                    break;
                }
            }
        }
        if (granted && _data.length < dataLength) {
            if (parameters.adminScope) {
                return dispatch(getAccounts(parameters));
            };
            return dispatch(valPermissionsSuccess());
        }
        return dispatch(valPermissionsError({message: 'login failed'}))
    };
};
    
var VALPERMISSIONS_SUCCESS = 'VALPERMISSIONS_SUCCESS';
var valPermissionsSuccess = function() {
    return {
        type: VALPERMISSIONS_SUCCESS,
    };
};

var VALPERMISSIONS_ERROR = 'VALPERMISSIONS_ERROR';
var valPermissionsError = function(error) {
    return {
        type: VALPERMISSIONS_ERROR,
        error: error,
    };
}

exports.valPermissions = valPermissions;
exports.VALPERMISSIONS_SUCCESS = VALPERMISSIONS_SUCCESS;
exports.valPermissionsSuccess = valPermissionsSuccess;
exports.VALPERMISSIONS_ERROR = VALPERMISSIONS_ERROR;
exports.valPermissionsError = valPermissionsError;

//  Validate Accounts
var getAccounts = function(parameters) {
    return function(dispatch) {
        FB.api('/me/accounts', 'get', {}, function(response) {
            parameters.response = response;
            dispatch(valAccounts(parameters));
            return dispatch(getAccountsSuccess());
        });
    };
};

var GETACCOUNTS_SUCCESS = 'GETACCOUNTS_SUCCESS';
var getAccountsSuccess = function() {
    return {
        type: GETACCOUNTS_SUCCESS,
    };
};

var GETACCOUNTS_ERROR = 'GETACCOUNTS_ERROR';
var getAccountsError = function() {
    return {
        type: GETACCOUNTS_ERROR,
    };
};

exports.getAccounts = getAccounts;
exports.GETACCOUNTS_SUCCESS = GETACCOUNTS_SUCCESS;
exports.getAccountsSuccess = getAccountsSuccess;
exports.GETACCOUNTS_ERROR = GETACCOUNTS_ERROR;
exports.getAccountsError = getAccountsError;


//  Validate Accounts
var valAccounts = function(parameters) {
    return function(dispatch) {
        for (var i = 0; i < parameters.response.data.length; i++) {
            if (parameters.response.data[i].id == parameters.facebookPageId) {
                return dispatch(valAccountsSuccess());
            }
        }
        return dispatch(valAccountsError({message: 'Admin login failed'}));
    };
};

var VALACCOUNTS_SUCCESS = 'VALACCOUNTS_SUCCESS';
var valAccountsSuccess = function() {
    return {
        type: VALACCOUNTS_SUCCESS,
    };
};

var VALACCOUNTS_ERROR = 'VALACCOUNTS_ERROR';
var valAccountsError = function(error) {
    return {
        type: VALACCOUNTS_ERROR,
        error: error,
    };
};

exports.valAccounts = valAccounts;
exports.VALACCOUNTS_SUCCESS = VALACCOUNTS_SUCCESS;
exports.valAccountsSuccess = valAccountsSuccess;
exports.VALACCOUNTS_ERROR = VALACCOUNTS_ERROR;
exports.valAccountsError = valAccountsError;