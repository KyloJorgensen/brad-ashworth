'use strict';

var React = require('react'),
	connect = require('react-redux').connect,
	NewsEntryList = require('./news-entry-list.component'),
	NewNewsEnrty = require('./new-news-entry.component'),
	newsActions = require('../actions/news.actions');

var newsEntryContainer = React.createClass({
	componentDidMount: function() {
		this.props.dispatch(newsActions.getNewsEntries(this.props.entriesAmount, this.props.currentPage));
	},
	componentDidUpdate: function() {
		this.props.dispatch(newsActions.getNewsEntries(this.props.entriesAmount, this.props.currentPage));
	},
	render: function() {
		return (
			<div className="news-entry-container">
				<NewNewsEnrty />
				<NewsEntryList newsEntries={this.props.newsEntries} />
			</div>
		);
	}
});

var mapStateToProps = function(state, props) {
	return {
		entriesAmount: state.news.entriesAmount
	};
};

var Container = connect(mapStateToProps)(newsEntryContainer);

module.exports = Container;