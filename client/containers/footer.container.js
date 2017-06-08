'use strict';

var Footer = require('../components/footer.component'),
	connect = require('react-redux').connect;

var mapStateToProps = function(state, props) {
    return {
		facebookPageId: state.facebook.facebookPageId,
		adminScope: state.facebook.adminScope,
	};
};

var Container = connect(mapStateToProps)(Footer);

module.exports = Container;