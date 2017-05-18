'use strict';

var connect = require('react-redux').connect,
	AdminPage = require('../components/admin-page.component');

var mapStateToProps = function(state, props) {
	return {
		facebookAppId: state.admin.facebookAppId,
		scope: state.admin.scope
	};
};

var Container = connect(mapStateToProps)(AdminPage);

module.exports = Container;