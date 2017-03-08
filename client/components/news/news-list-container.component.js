'use strict';

var React = require('react'),
	connect = require('react-redux').connect,
	Link = require('react-router').Link,
	NewsEntriesList = require('./news-list-list.component'),
	cookie = require('../../utilities/cookie'),
	newsActions = require('../../actions/news.actions'),
	appConfig = require('../../app.cfg');

var newsEntriesContainer = React.createClass({
	componentDidMount: function() {
		this.props.dispatch(newsActions.getNewsEntries(appConfig.NEWS_LIST_COUNT));
	},
	componentDidUpdate: function() {
		this.props.dispatch(newsActions.getNewsEntries(appConfig.NEWS_LIST_COUNT));
	},
	render: function() {
		var admin = [];
		
		if (cookie.get('adminkey')) {
			// admin.push(<Link to={'/news/new'} key="admin" >NEW ENTRY</Link>);
		}

		return (
			<div className="news-entries-container">
				<div className="container">
					<h2>NEWS</h2>
		    	</div>
		    	{admin}
		    	<div className="container">
					<NewsEntriesList newsEntries={this.props.newsEntries} perPage={appConfig.NEWS_LIST_COUNT} />
				</div>
			</div>
		);
	}
});

var mapStateToProps = function(state, props) {
	return {
		newsEntries: state.news.newsEntries
	};
};

var Container = connect(mapStateToProps)(newsEntriesContainer);

module.exports = Container;