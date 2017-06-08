'use strict';

var React = require('react'),
	Header = require('../containers/header.container'),
	Footer = require('./footer.component'),
	cookie = require('../utilities/cookie'),
	adminActions = require('../actions/admin.actions'),
	facebookActions = require('../actions/facebook.actions');

var AdminPage = React.createClass({
	login: function(event) {
		this.props.dispatch(facebookActions.fbloginstatus({facebookPageId: this.props.facebookPageId, adminScope: this.props.adminScope}));
	},
	logout: function(event) {
		event.preventDefault();
		FB.logout();
	},
	render: function() {
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
});

module.exports = AdminPage;