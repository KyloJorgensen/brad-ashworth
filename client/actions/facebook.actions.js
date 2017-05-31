'use strict';

var fetch = require('isomorphic-fetch');

var fbAsyncInit = function(appId, version, callback, scope) {
  window.fbAsyncInit = function() {
    FB.init({
      appId: appId,
      xfbml: true,
      version: version
    });
    FB.AppEvents.logPageView();
    callback(fbinitloginstatus(appId, scope));
  };
}

exports.fbAsyncInit = fbAsyncInit;

var fbinitloginstatus = function(appId, scope) {
    return function(dispatch) {
        return FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                // the user is logged in and has authenticated your
                // app, and response.authResponse supplies
                // the user's ID, a valid access token, a signed
                // request, and the time the access token 
                // and signed request each expire
                var uid = response.authResponse.userID;
                var accessToken = response.authResponse.accessToken;
                console.log('connected', response);
                dispatch(fbinitloginstatusSuccess(response));
                return dispatch(getfbprofile(response));
            } else if (response.status === 'not_authorized') {
                // the user is logged in to Facebook, 
                // but has not authenticated your app
                console.log('not_aurthorized');
                // dispatch(fblogin(response, appId, scope));
                return dispatch(fbinitloginstatusSuccess(response));
            } else {
                // the user isn't logged in to Facebook.
                console.log('not logged in');
                return dispatch(fbinitloginstatusError(response));
            }
        });
    }
};

var FBINITLOGINSTATUS_SUCCESS = 'FBINITLOGINSTATUS_SUCCESS';
var fbinitloginstatusSuccess = function(response) {
    return {
        type: FBINITLOGINSTATUS_SUCCESS,
        response: response,
    };
};

var FBINITLOGINSTATUS_ERROR = 'FBINITLOGINSTATUS_ERROR';
var fbinitloginstatusError = function(error) {
    return {
        type: FBINITLOGINSTATUS_ERROR,
        error: error,
    };
};

exports.fbinitloginstatus = fbinitloginstatus;
exports.FBINITLOGINSTATUS_SUCCESS = FBINITLOGINSTATUS_SUCCESS;
exports.fbinitloginstatusSuccess = fbinitloginstatusSuccess;
exports.FBINITLOGINSTATUS_ERROR = FBINITLOGINSTATUS_ERROR;
exports.fbinitloginstatusError = fbinitloginstatusError;

var getfbprofile = function(response) {
    return function(dispatch) {
        return FB.api('/me', {fields: 'first_name,cover'}, function() {
            if (!response || response.error) {
                alert('Error occured');
            } else {
                alert('Post ID: ' + response.id);
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

var fbloginstatus = function(appId, scope) {
    return function(dispatch) {
        return FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                // the user is logged in and has authenticated your
                // app, and response.authResponse supplies
                // the user's ID, a valid access token, a signed
                // request, and the time the access token 
                // and signed request each expire
                var uid = response.authResponse.userID;
                var accessToken = response.authResponse.accessToken;
                console.log('connected', response);
                return dispatch(fbloginstatusSuccess(response));
            } else if (response.status === 'not_authorized') {
                // the user is logged in to Facebook, 
                // but has not authenticated your app
                console.log('not_aurthorized');
                dispatch(fblogin(response, appId, scope));
                return dispatch(fbloginstatusSuccess(response));
            } else {
                // the user isn't logged in to Facebook.
                console.log('not logged in');
                return dispatch(fbloginstatusError(response));
            }
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

var fblogin = function(response, appId, scope) {
    return function(dispatch) {
        console.log('logining in');
        var _scope = '';

        for (var i = 0; i < scope.length; i++) {
            _scope = _scope + scope[i]
            if (i != scope.length - 1) {
                _scope = _scope + ',';
            }           
        }

        return FB.login(function(response) {
            console.log(response);
        }, {
            scope: _scope, 
            return_scopes: true,
            enable_profile_selector: true,
            profile_selector_ids: appId,
        });
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



//facebook login
    // FBLogin: function(response) {
    //     console.log('logining in');
    //     var scope = '';
    //     for (var i = 0; i < this.props.scope.length; i++) {
    //         scope = scope + this.props.scope[i]
    //         if (i != this.props.scope.length - 1) {
    //             scope = scope + ',';
    //         }           
    //     }
    //     console.log(scope);
    //     FB.login(this.validateScopes, {
    //         scope: scope, 
    //         return_scopes: true,
    //         enable_profile_selector: true,
    //         profile_selector_ids: cookie.get('facebook_page_id')
    //     });;
    // },

//facebook logout
//facebook admin login
    // FBLogin: function(response) {
    //     console.log('logining in');
    //     var scope = '';
    //     for (var i = 0; i < this.props.scope.length; i++) {
    //         scope = scope + this.props.scope[i]
    //         if (i != this.props.scope.length - 1) {
    //             scope = scope + ',';
    //         }           
    //     }
    //     console.log(scope);
    //     FB.login(this.validateScopes, {
    //         scope: scope, 
    //         return_scopes: true,
    //         enable_profile_selector: true,
    //         profile_selector_ids: cookie.get('facebook_page_id')
    //     });;
    // },
//facebook vaidate admin






    // handleFBgetLoginStatus: function(response) {
    //     if (response.status === 'connected') {
    //         // the user is logged in and has authenticated your
    //         // app, and response.authResponse supplies
    //         // the user's ID, a valid access token, a signed
    //         // request, and the time the access token 
    //         // and signed request each expire
    //         var uid = response.authResponse.userID;
    //         var accessToken = response.authResponse.accessToken;
    //         console.log('connected', response);
    //         this.validateScopes(response);
    //     } else if (response.status === 'not_authorized') {
    //         // the user is logged in to Facebook, 
    //         // but has not authenticated your app
    //         console.log('not_aurthorized');
    //         FB.logout(this.FBRelogin);
    //     } else {
    //         // the user isn't logged in to Facebook.
    //         console.log('not logged in');
    //         this.FBLogin(response);
    //     }
    //     // FB.logout();
    // },
    // FBRelogin: function(response) {
    //     console.log('loggedout', response);
    //     this.FBLogin(response);
    // },
    // FBLogin: function(response) {
    //     console.log('logining in');
    //     var scope = '';
    //     for (var i = 0; i < this.props.scope.length; i++) {
    //         scope = scope + this.props.scope[i]
    //         if (i != this.props.scope.length - 1) {
    //             scope = scope + ',';
    //         }           
    //     }
    //     console.log(scope);
    //     FB.login(this.validateScopes, {
    //         scope: scope, 
    //         return_scopes: true,
    //         enable_profile_selector: true,
    //         profile_selector_ids: cookie.get('facebook_page_id')
    //     });;
    // },
    // validateScopes: function(response) {
    //     var grantedScopes = response.authResponse.grantedScopes.split(',');
    //     var _scope = this.props.scope;
    //     for (var g = 0; g < grantedScopes.length; g++) {
    //         for (var i = 0; i < _scope.length; i++) {
    //             if (grantedScopes[g] == _scope[i]) {
    //                 _scope.splice(i, 1);
    //                 break;
    //             }
    //         }
    //     }
    //     if (this.props.scope.length == 0) {
    //         FB.api('/me/accounts', 'get', {}, this.validateAdmin);
    //     } else {
    //         console.log('scopes not validated or missing permission');
    //     }
    // },
    // validateAdmin: function(response) {
    //     console.log(response.data["0"].id);
    //     for (var i = 0; i < response.data.length; i++) {
    //         if (response.data[i].id == cookie.get('facebook_page_id')) {
    //             console.log(response.data[i].id, " match!!! ", cookie.get('facebook_page_id'));
    //         }
    //     }
    // },
    // logout: function(event) {
    //     event.preventDefault();
    //     FB.logout();
    // },

