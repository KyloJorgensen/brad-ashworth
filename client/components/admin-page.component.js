'use strict';

var React = require('react'),
	Header = require('./header.component'),
	Footer = require('./footer.component'),
	cookie = require('../utilities/cookie'),
	adminActions = require('../actions/admin.actions');

var AdminPage = React.createClass({
	login: function(event) {
		var scope = '';
		for (var i = 0; i < this.props.scope.length; i++) {
			scope = scope + this.props.scope[i]
			if (i != this.props.scope.length - 1) {
				scope = scope + ',';
			}			
		}
		console.log(scope);
		FB.login(this.checkForAdmin, {
			scope: scope, 
			return_scopes: true,
			enable_profile_selector: true,
			profile_selector_ids: cookie.get('facebook_page_id')
		});;
		// event.preventDefault();
		// if (this.refs.adminName.value && this.refs.password.value) {
		// 	this.props.dispatch(adminActions.login(this.refs.adminName.value, this.refs.password.value, this.props.history));
		// 	this.refs.adminName.value = '';
		// 	this.refs.password.value = '';
		// } else {
		// 	alert('Admin Name and Password Required');
		// }
	},
	handleLoginStatus: function(response) {
		console.log('handle', response);
		if (response.status === 'connected') {
			console.log('Logged in.');
			this.checkForAdmin(response);

		} else {
			console.log(typeof cookie.get('facebook_page_id'), cookie.get('facebook_page_id'))

	  	}
	},
	checkForAdmin: function(response) {
		var grantedScopes = response.authResponse.grantedScopes.split(',');
		var _scope = this.props.scope;
		for (var g = 0; g < grantedScopes.length; g++) {
			for (var i = 0; i < _scope.length; i++) {
				if (grantedScopes[g] == _scope[i]) {
					console.log('match!!');
					_scope.splice(i, 1);
					break;
				}
			}
		}
		if (this.props.scope.length == 0) {
			console.log('pass');
			FB.api('/me/accounts', 'get', {}, function(response) {
				console.log(response);
			});
		}
	},
	logout: function(event) {
		event.preventDefault();
		this.props.dispatch(adminActions.logout(this.props.history));
	
	},
	addAdmin: function(event) {
		event.preventDefault();
		if (this.refs.adminName.value && this.refs.password.value) {
			this.props.dispatch(adminActions.addAdmin(this.refs.adminName.value, this.refs.password.value));
			this.refs.adminName.value = '';
			this.refs.password.value = '';
		} else {
			alert('Admin Name and Password Required');
		}
	},
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
							<label>Admin Name</label>
							<br/>
							<input type="text" ref="adminName" name="adminName" />
							<br/>
							<label>Password</label>
							<br/>
							<input type="password" ref="password" name="password" />
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