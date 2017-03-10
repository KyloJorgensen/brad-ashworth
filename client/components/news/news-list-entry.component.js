'use strict';

var React = require('react'),
	connect = require('react-redux').connect,
	newsActions = require('../../actions/news.actions'),
	Link = require('react-router').Link;

var newsEntry = React.createClass({
	componentDidMount: function() {
		if (this.props.entry['id']) {this.props.dispatch(newsActions.getNewsEntry(this.props.entry['id']));};
	},
	// componentDidUpdate: function() {
	// 	if (this.props.entry['id']) {this.props.dispatch(newsActions.getNewsEntry(this.props.entry['id']));};
	// },
	render: function() {
		var content = [];
		console.log(this.props);
		if (this.props.entry['id']) {content.push(<p key="id" style={{display: 'none'}}>{this.props.entry['id']}</p>);};
		if (this.props.entry['story']) {content.push(<p key="story">{this.props.entry['story']}</p>);};
		if (this.props.entry['created_time']) {
			var date = new Date((this.props.entry['created_time'] || "").replace(/-/g,"/").replace(/[TZ]/g," "));
			content.push(<p key="created_time">{date.toDateString()}</p>);
		};
		if (this.props.entry['message']) {content.push(<p key="message">{this.props.entry['message']}</p>);};
		if (this.props.entry['full_picture']) {content.push(<img key="full_picture" src={this.props.entry['full_picture']} />);};
		if (this.props.entry['type']) {content.push(<p key="type">{this.props.entry['type']}</p>);};
		if (this.props.entry['status_type']) {content.push(<p key="status_type">{this.props.entry['status_type']}</p>);};
		return (
			<li className="news-entry" >
				<div className="news-entry-content" >
					{content}
				</div>
			</li>
		);	
	}
});

var mapStateToProps = function(state, props) {
	var _props = {};

	var d = new Date();

	if (state.news.newsEntries[props.newsEntryNumber] == undefined) {
		_props.entry = {
			id: false,
			story: 'News Loading',
			created_time: d.toLocaleDateString(),
			message: 'News Loading please wait',
		};
	} else {
		_props.entry = state.news.newsEntries[props.newsEntryNumber] || false;
	}

	return _props;
};

var Container = connect(mapStateToProps)(newsEntry);

module.exports = Container;