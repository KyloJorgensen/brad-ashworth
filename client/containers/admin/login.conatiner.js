'use strict';

var connect = require('react-redux').connect,
	Login = require('../../components/admin/login.component');

var mapStateToProps = function(state, props) {
	return {};
};

var Container = connect(mapStateToProps)(Login);

module.exports = Container;