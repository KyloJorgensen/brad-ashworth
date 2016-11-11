'use strict';

var React = require('react'),
	connect = require('react-redux').connect,
	newsActions = require('../actions/news.actions');

var newspage = React.createClass({
	nextPage: function() {
		this.props.dispatch(newsActions.nextPage());
	},
	previousPage: function() {
		this.props.dispatch(newsActions.previousPage());
	},
	render: function() {
		var totalPages = (this.props.totalEntries + (10 - this.props.totalEntries % 10)) / 10;
		return (
			<div className="page-changer-wrapper container">
				<div className="page-changer">
					<input type="button" onClick={this.previousPage} value="PREVIOUS" />
					<p>{this.props.currentPage} / {totalPages}</p>
					<input type="button" onClick={this.nextPage} value="NEXT" />
				</div>
			</div>
		);
	}
});

var mapStateToProps = function(state, props) {
    return {
    	currentPage: state.news.currentPage,
    	totalEntries: state.news.totalEntries
    };
};

var Container = connect(mapStateToProps)(newspage);

module.exports = Container;