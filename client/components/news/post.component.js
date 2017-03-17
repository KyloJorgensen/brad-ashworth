'use strict';

var React = require('react'),
	connect = require('react-redux').connect,
	newsActions = require('../../actions/news.actions'),
	Link = require('react-router').Link;

var newsPost = React.createClass({
	componentDidMount: function() {
		if (this.props.post['id']) {this.props.dispatch(newsActions.getNewsPost(this.props.post['id']));};
	},
	render: function() {
		var content = [];
		// console.log(this.props);
		if (this.props.post['id']) {content.push(<p key="id" style={{display: 'none'}}>{this.props.post['id']}</p>);};
		if (this.props.post['story']) {content.push(<p key="story">{this.props.post['story']}</p>);};
		if (this.props.post['created_time']) {
			var date = new Date((this.props.post['created_time'] || "").replace(/-/g,"/").replace(/[TZ]/g," "));
			content.push(<p key="created_time">{date.toDateString()}</p>);
		};
		if (this.props.post['message']) {content.push(<p key="message">{this.props.post['message']}</p>);};
		if (this.props.post['full_picture']) {content.push(<img key="full_picture" src={this.props.post['full_picture']} />);};
		if (this.props.post['type']) {content.push(<p key="type">{this.props.post['type']}</p>);};
		if (this.props.post['status_type']) {content.push(<p key="status_type">{this.props.post['status_type']}</p>);};
		return (
			<li className="news-post" >
				<div className="news-post-content" >
					{content}
				</div>
			</li>
		);	
	}
});

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

var Container = connect(mapStateToProps)(newsPost);

module.exports = Container;