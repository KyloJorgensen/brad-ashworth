'use strict';

var connect = require('react-redux').connect,
	AdminPage = require('../components/admin-page.component');

var mapStateToProps = function(state, props) {
	return {
		facebookPageId: state.facebook.facebookPageId,
		adminScope: state.facebook.adminScope,
	};
};

var Container = connect(mapStateToProps)(AdminPage);

module.exports = Container;