'use strict';

var React = require('react'),
	connect = require('react-redux').connect,
	NewsEntryConatiner = require('./news-entry-container.component'),
	newsActions = require('../actions/news.actions');

var mainPage = React.createClass({
	componentDidMount: function() {
		this.props.dispatch(newsActions.setEntriesAmount(3));
	},
	render: function() {  		
		return (
		    <div className="main-news-section">
		    	<h2>NEWS</h2>
		    	<NewsEntryConatiner currentPage={1} />
		    </div>
		);
	}
});

var mapStateToProps = function(state, props) {
    return {};
};

var Container = connect(mapStateToProps)(mainPage);

module.exports = Container;