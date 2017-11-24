'use strict';

var React = require('react'),
	Link = require('react-router').Link,
	cookie = require('../../utilities/cookie'),
	newsActions = require('../../actions/news.actions'),
	NewsPost = require('../../containers/news/post.container');

var NewsList = React.createClass({
	getInitialState: function () {
  		return {
  			infiniteHeight: 'auto',
  		}
    },
	componentDidMount: function() {
		this.props.dispatch(newsActions.getNewsPosts(this.props.newsListCount));
		var _height = this.refs.infinite.offsetParent.parentElement.clientHeight-this.refs['infinite'].offsetTop-25 + 'px';
		if (_height != this.state.infiniteHeight) {
			var _state = this.state;
			_state.infiniteHeight = _height;
			this.setState(_state);
		}
	},
	onScrollHandler: function(e) {
 		var ele = this.refs["infinite"];
  		if (ele.scrollTop + ele.clientHeight + 200 >= ele.scrollHeight && !this.props.loading && this.props.nextPostsUrl) {
      		this.props.dispatch(newsActions.getMoreNewsPosts(this.props.nextPostsUrl));
    	}
  	},
	generatePosts: function() {
		return (this.props.newsPosts.map(function(post) {
			return (<NewsPost key={post.id} newsPostNumber={post.id} />);
		}));
	},
	render: function() {
		var admin = [];
		
		if (cookie.get('adminkey')) {
			// admin.push(<Link to={'/news/new'} key="admin" >NEW POST</Link>);
		}
		var newsPosts = this.generatePosts();
		return (
			<div className="news-posts-container">
				<div className="news-posts-header container">
					<h2>NEWS</h2>
		    	</div>
		    	{admin}
		    	<div className="infinite" ref="infinite" style={{height: this.state.infiniteHeight}} onScroll={this.onScrollHandler} onCompositionStart={this.composition} >
					<ul className="container news-post-list">
						{newsPosts}
					</ul>
				</div>
			</div>
		);
	},
});

module.exports = NewsList;