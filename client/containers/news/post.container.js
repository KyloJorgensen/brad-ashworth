'use strict';

var connect = require('react-redux').connect,
	NewsPost = require('../../components/news/post.component');

var mapStateToProps = function(state, props) {
	var _props = {};
	_props.post = {};
	for (var i = 0; i < state.news.newsPosts.length; i++) {
		if (state.news.newsPosts[i].id == props.newsPostNumber) {
			_props.post = state.news.newsPosts[i];
			break;
		}
	}
	return _props;
};

var Container = connect(mapStateToProps)(NewsPost);

module.exports = Container;