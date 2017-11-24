'use strict';

var connect = require('react-redux').connect,
	NewsList = require('../../components/news/list.component');

var mapStateToProps = function(state, props) {
	return {
		newsPosts: state.news.newsPosts,
		nextPostsUrl: state.news.next,
		loading: state.news.loading,
		newsListCount: state.admin.newsListCount,
	};
};

var Container = connect(mapStateToProps)(NewsList);

module.exports = Container;