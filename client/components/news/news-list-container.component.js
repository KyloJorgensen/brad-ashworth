'use strict';

var React = require('react'),
	connect = require('react-redux').connect,
	Link = require('react-router').Link,
	NewsEntriesList = require('./news-list-list.component'),
	PageChanger = require('./news-list-pagechanger.component'),
	newsActions = require('../../actions/news.actions'),
	appConfig = require('../../app.cfg');

var newsEntriesContainer = React.createClass({
	componentDidMount: function() {
		var currentPage = Number(this.currentPage());
		this.props.dispatch(newsActions.getNewsEntries(appConfig.NEWS_LIST_COUNT, currentPage));
	},
	componentDidUpdate: function() {
		var currentPage = Number(this.currentPage());
		this.props.dispatch(newsActions.getNewsEntries(appConfig.NEWS_LIST_COUNT, currentPage));
	},
	currentPage: function() {
		if ('params' in this.props && 'pageNumber' in this.props.params && Number(this.props.params.pageNumber) > 0) {
			return Number(this.props.params.pageNumber);
		}
		return 1;
	},
	render: function() {
		var currentPage = Number(this.currentPage());
		var admin = [];
		
		if (this.props.adminKey != false) {
			admin.push(<Link to={'/news/new'} >NEW ENTRY</Link>);
		}
		console.log(this.props, currentPage)
		return (
			<div className="news-entries-container">
				<div className="container">
					<h2>NEWS</h2>
		    	</div>
		    	<PageChanger pageNumber={this.props.params.pageNumber} />
		    	<div className="container">
					{admin}
					<NewsEntriesList />
				</div>
				<PageChanger pageNumber={currentPage} />
			</div>
		);
	}
});

var mapStateToProps = function(state, props) {
	return {
		adminKey: state.user.key,
		entriesAmount: state.news.entriesAmount
	};
};

var Container = connect(mapStateToProps)(newsEntriesContainer);

module.exports = Container;