'use strict';

var React = require('react'),
	connect = require('react-redux').connect,
	Link = require('react-router').Link,
	NewsEntriesList = require('../news/news-list-list.component'),
	newsActions = require('../../actions/news.actions'),
	appConfig = require('../../app.cfg');

var homeNewsEntriesContainer = React.createClass({
	componentDidMount: function() {
		this.props.dispatch(newsActions.getNewsEntries(appConfig.MAIN_NEWS_COUNT));
	},
	componentDidUpdate: function() {
		this.props.dispatch(newsActions.getNewsEntries(appConfig.MAIN_NEWS_COUNT));
	},
	render: function() {
		var _newsEntries = [];
		for (var i = 0; i < appConfig.MAIN_NEWS_COUNT; i++) {
			_newsEntries.push(this.props.newsEntries[i]);
		}

		return (
			<div className="home-news-entries-container">
				<div className="container">
					<Link to={'/news'} ><h2>NEWS</h2></Link>
		    	</div>
		    	<div className="container">
					<NewsEntriesList newsEntries={_newsEntries} />
					<Link to={'/news'} >Read More</Link>
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

var Container = connect(mapStateToProps)(homeNewsEntriesContainer);

module.exports = Container;