'use strict';

var React = require('react'),
	connect = require('react-redux').connect,
	NewsEntry = require('./news-list-entry.component'),
	newsActions = require('../../actions/news.actions');

var newsEntryList = React.createClass({

	render: function() {
		var newsEntries = [];
		if (this.props.newsEntries.length > 0) {
			for (var i = 0; i < this.props.newsEntries.length; i++) {
				newsEntries.push(<NewsEntry key={i} newsEntryNumber={i} />);
			}
		} else {
			var content = {
				id: 'noidnews',
				created_time: 'nodate',
				story: 'No News',
				message: 'Please check back Later'
			};
			newsEntries.push(<NewsEntry key={this.props.newsEntries.length} newsEntry={content} />);
		}
		return (
			<ul className="news-entry-list">
				{newsEntries}
			</ul>
		);
	}
});

var mapStateToProps = function(state, props) {
	return {};
};

var Container = connect(mapStateToProps)(newsEntryList);

module.exports = Container;