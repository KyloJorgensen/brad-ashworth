'use strict';

var React = require('react'),
	connect = require('react-redux').connect,
	NewsEntryList = require('./news-entry-list.component'),
	NewNewsEnrty = require('./new-news-entry.component'),
	newsActions = require('../actions/news.actions');

var newsEntryContainer = React.createClass({
	componentDidMount: function() {
		this.props.dispatch(newsActions.getNewsEntries(this.props.currentPage));
	},
	componentDidUpdate: function() {
		this.props.dispatch(newsActions.getNewsEntries(this.props.currentPage));
	},
	render: function() {
		return (
			<div className="news-entry-container container">
				<NewNewsEnrty />
				<NewsEntryList newsEntries={this.props.newsEntries} />
			</div>
		);
	}
});

var mapStateToProps = function(state, props) {
	return {};
};

var Container = connect(mapStateToProps)(newsEntryContainer);

module.exports = Container;