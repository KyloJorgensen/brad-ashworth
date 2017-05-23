'use strict';

var React = require('react'),
	Header = require('./header.component'),
	Footer = require('./footer.component'),
	cookie = require('../utilities/cookie'),
	adminActions = require('../actions/admin.actions'),
	facebookActions = require('../actions/facebook.actions');

var AdminPage = React.createClass({
	login: function(event) {
		this.props.dispatch(facebookActions.fbloginstatus());
	},
	handleFBgetLoginStatus: function(response) {
		if (response.status === 'connected') {
			// the user is logged in and has authenticated your
			// app, and response.authResponse supplies
			// the user's ID, a valid access token, a signed
			// request, and the time the access token 
			// and signed request each expire
			var uid = response.authResponse.userID;
			var accessToken = response.authResponse.accessToken;
			console.log('connected', response);
			this.validateScopes(response);
		} else if (response.status === 'not_authorized') {
			// the user is logged in to Facebook, 
			// but has not authenticated your app
			console.log('not_aurthorized');
			FB.logout(this.FBRelogin);
		} else {
			// the user isn't logged in to Facebook.
			console.log('not logged in');
			this.FBLogin(response);
		}
		// FB.logout();
	},
	FBRelogin: function(response) {
		console.log('loggedout', response);
		this.FBLogin(response);
	},
	FBLogin: function(response) {
		console.log('logining in');
		var scope = '';
		for (var i = 0; i < this.props.scope.length; i++) {
			scope = scope + this.props.scope[i]
			if (i != this.props.scope.length - 1) {
				scope = scope + ',';
			}			
		}
		console.log(scope);
		FB.login(this.validateScopes, {
			scope: scope, 
			return_scopes: true,
			enable_profile_selector: true,
			profile_selector_ids: cookie.get('facebook_page_id')
		});;
	},
	validateScopes: function(response) {
		var grantedScopes = response.authResponse.grantedScopes.split(',');
		var _scope = this.props.scope;
		for (var g = 0; g < grantedScopes.length; g++) {
			for (var i = 0; i < _scope.length; i++) {
				if (grantedScopes[g] == _scope[i]) {
					_scope.splice(i, 1);
					break;
				}
			}
		}
		if (this.props.scope.length == 0) {
			FB.api('/me/accounts', 'get', {}, this.validateAdmin);
		} else {
			console.log('scopes not validated or missing permission');
		}
	},
	validateAdmin: function(response) {
		console.log(response.data["0"].id);
		for (var i = 0; i < response.data.length; i++) {
			if (response.data[i].id == cookie.get('facebook_page_id')) {
				console.log(response.data[i].id, " match!!! ", cookie.get('facebook_page_id'));
			}
		}
	},
	logout: function(event) {
		event.preventDefault();
		FB.logout();
	},
	// fbadmincheck: function() {
	// 	if ('fbAsyncInit' in window) {
	// 		console.log('facebook should be loaded', typeof window.fbAsyncInit);
			
	// 	}
	// 	if (typeof FB === "function") {
	// 		FB.getLoginStatus(function(response) {
	// 			console.log(response);
	// 		});
	// 		clearInterval(this.FBADMINCHECK);
	// 	} else {
	// 		console.log('no FB function yet');
	// 	}
	// },
	// componentDidMount: function() {
	// 	this.FBADMINCHECK = setInterval(this.fbadmincheck, 1000);
	// 	// window.onload(this.fbadmincheck);

	// 	if (window.addEventListener) {
	// 		window.addEventListener('load', this.fbadmincheck);
	// 	} else if (window.attachEvent) {
	// 		window.attachEvent('onload', this.fbadmincheck);
	// 	} else { 
	// 		window.onload = this.fbadmincheck;
	// 	}
	// },
	// componentWillUnmount: function() {
	// 	clearInterval(this.FBADMINCHECK);
	// },
	render: function() {
		if (cookie.get('adminkey')) {
			return (
				<div className="admin-page-wrapper">
					<Header/>
					<div className="container">
						<form onSubmit={this.logout} >
							<input type="submit" value="LOGOUT OF ADMIN"/>
						</form>
						<form className="admin-login-form" onSubmit={this.addAdmin} >
							<label>Admin Name</label>
							<br/>
							<input type="text" ref="adminName" name="adminName" />
							<br/>
							<label>Password</label>
							<br/>
							<input type="password" ref="password" name="password" />
							<br/>
							<input type="submit" value="ADD"/>
						</form>
					</div>
					<Footer />
				</div>
			);
		} else {
			return (
				<div className="admin-page-wrapper">
					<Header/>
					<div className="container">
						<form className="admin-login-form" onSubmit={this.login} >
							<label>Admin Login</label>
							<br/>
							<input type="submit" value="LOGIN"/>
						</form>
					</div>
					<Footer />
				</div>
			);			
		}
	}
});

module.exports = AdminPage;