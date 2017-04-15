'use strict';

var React = require('react'),
	connect = require('react-redux').connect,
	Header = require('./header.component'),
	Footer = require('./footer.component'),
	cookie = require('../utilities/cookie'),
	AdminActions = require('../actions/admin.actions');

var Login = React.createClass({
	login: function(event) {
		event.preventDefault();
		if (this.refs.username.value && this.refs.password.value) {
			this.props.dispatch(AdminActions.login(this.refs.username.value, this.refs.password.value, this.props.history));
			this.refs.username.value = '';
			this.refs.password.value = '';
		} else {
			alert('Admin Name and Password Required');
		}
	},
	render: function() {
		return (
			<form className="admin-login-form" onSubmit={this.login} >
				<label>Admin Name</label>
				<br/>
				<input type="text" ref="username" name="username" />
				<br/>
				<label>Password</label>
				<br/>
				<input type="password" ref="password" name="password" />
				<br/>
				<input type="submit" value="LOGIN"/>
			</form>
		);			
	}
});

var mapStateToProps = function(state, props) {
	return {};
};

var Container = connect(mapStateToProps)(Login);

module.exports = Container;