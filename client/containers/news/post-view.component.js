'use strict';

var React = require('react'),
	connect = require('react-redux').connect,
	Link = require('react-router').Link,
	cookie = require('../../utilities/cookie'),
	newsActions = require('../../actions/news.actions');

var newsPostVeiw = React.createClass({
	componentDidMount: function() {
		this.props.dispatch(newsActions.getNewsPost(this.props.params.idnews));
	},	
	createMarkup: function() {
		return {__html: this.props.newsPost_content};
	},
	render: function() {
		var admin = [];
		
		if (cookie.get('adminkey')) {
			admin.push(<Link to={'/news/edit/' + this.props.params.idnews} key="admin" >EDIT</Link>)
		}

		return (
			<div className="news-post-view" >
				<div className="news-post-content" >
					<div className="news-post-header">
						<h4>{this.props.newsPost_title}</h4>
						<h5>{this.props.newsPost_date_enter}</h5>
					</div>
					{admin}
					<div dangerouslySetInnerHTML={this.createMarkup()} />
				</div>
			</div>
		);
	}
});

var mapStateToProps = function(state, props) {
	return {
		newsPost_idnews: state.news.currentPost.idnews,
		newsPost_title: state.news.currentPost.title,
		newsPost_date_enter: state.news.currentPost.date_enter,
		newsPost_content: state.news.currentPost.content
	};
};

var Container = connect(mapStateToProps)(newsPostVeiw);

module.exports = Container;