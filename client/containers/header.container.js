'use strict';

var connect = require('react-redux').connect,
	Header = require('../components/header.component');

var mapStateToProps = function(state, props) {
    return {
    	first_name: state.facebook.profile.first_name,
    	coverSource: state.facebook.profile.cover.source,
    	title: state.facebook.title,
    	facebookPageId: state.facebook.facebookPageId,
    	scope: state.facebook.scope,

    };
};

var Container = connect(mapStateToProps)(Header);

module.exports = Container;