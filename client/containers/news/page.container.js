'use strict';

var	connect = require('react-redux').connect,
	NewsPage = require('../../components/news/page.component');

var mapStateToProps = function(state, props) {
    return {};
};

var Container = connect(mapStateToProps)(NewsPage);

module.exports = Container;