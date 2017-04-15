'use strict';

var React = require('react'),
	connect = require('react-redux').connect,
	Header = require('./header.component'),
	Footer = require('./footer.component'),
	cookie = require('../utilities/cookie'),
	adminActions = require('../actions/admin.actions');

var adminPage = React.createClass({
	login: function(event) {
		FB.login(this.checkForAdmin, {
			scope: this.props.scope, 
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
		console.log('check', response);
		if (response.authResponse.grantedScopes == this.props.scope)
		FB.api('/me/accounts', 'get', {}, function(response) {
			console.log(response);
		});
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

var mapStateToProps = function(state, props) {
	return {
		facebookAppId: state.admin.facebookAppId,
		scope: state.admin.scope
	};
};

var Container = connect(mapStateToProps)(adminPage);

module.exports = Container;