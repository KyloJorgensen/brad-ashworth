'use strict';

var React = require('react'),
	connect = require('react-redux').connect,
	Link = require('react-router').Link,
	NewsPost = require('../../containers/news/post.container'),
	newsActions = require('../../actions/news.actions');

var homeNewsPostsContainer = React.createClass({
	componentDidMount: function() {
		this.props.dispatch(newsActions.getNewsPosts(this.props.mainNewsCount));
	},
	generatePosts: function() {
		return (this.props.newsPosts.map(function(post) {
			return (<NewsPost key={post.id} newsPostNumber={post.id} />);
		}));
	},
	render: function() {
		var newsPosts = this.generatePosts();
		return (
			<div className="home-news-entries-container">
				<div className="container">
					<Link to={'/news'} ><h2>NEWS</h2></Link>
		    	</div>
		    	<div className="container">
					<ul className="news-post-list">
						{newsPosts}
					</ul>
					<Link to={'/news'} >Read More</Link>
				</div>

			</div>
		);
	}
});

var mapStateToProps = function(state, props) {
	var _newsPosts = [];
	for (var i = 0; i < state.admin.mainNewsCount; i++) {
		if (state.news.newsPosts[i]) {
			_newsPosts.push(state.news.newsPosts[i]);	
		}
	}
	return {
		newsPosts: _newsPosts,
		mainNewsCount: state.admin.mainNewsCount,
	};
};

var Container = connect(mapStateToProps)(homeNewsPostsContainer);

module.exports = Container;