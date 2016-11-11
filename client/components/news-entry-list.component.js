'use strict';

var React = require('react'),
	connect = require('react-redux').connect,
	NewsEntry = require('./news-entry.component'),
	newsActions = require('../actions/news.actions');

var newsEntryList = React.createClass({
	render: function() {
		var newsEntries = [];
		for (var i = 0; i < this.props.newsEntries.length; i++) {
			newsEntries.push(<NewsEntry key={i} newsEntry={this.props.newsEntries[i]}/>);
		}
		return (
			<ul className="news-entry-list">
				{newsEntries}
			</ul>
		);
	}
});

var mapStateToProps = function(state, props) {
	return {
		newsEntries: state.news.newsEntries
	};
};

var Container = connect(mapStateToProps)(newsEntryList);

module.exports = Container;