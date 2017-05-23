'use strict';

var fetch = require('isomorphic-fetch');

var fbAsyncInit = function(appId, version, callback) {
  window.fbAsyncInit = function() {
    FB.init({
      appId: appId,
      xfbml: true,
      version: version
    });
    FB.AppEvents.logPageView();
    callback(fbloginstatus());
  };
}

exports.fbAsyncInit = fbAsyncInit;

var fbloginstatus = function() {
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
        error: error
    };
};

exports.fbloginstatus = fbloginstatus;
exports.FBLOGINSTATUS_SUCCESS = FBLOGINSTATUS_SUCCESS;
exports.fbloginstatusSuccess = fbloginstatusSuccess;
exports.FBLOGINSTATUS_ERROR = FBLOGINSTATUS_ERROR;
exports.fbloginstatusError = fbloginstatusError;

