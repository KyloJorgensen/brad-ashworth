'use strict';

var React = require('react'),
	connect = require('react-redux').connect,
	Header = require('./header.component'),
	Footer = require('./footer.component'),
	NewsEntryContainer = require('./news-entry-container.component'),
	PageChanger = require('./page-changer.component'),
	newsActions = require('../actions/news.actions');

var newsPage = React.createClass({
	componentDidMount: function() {
		this.props.dispatch(newsActions.setEntriesAmount(10));
	},
	render: function() {
		return (
		    <div className="news-page-wrapper">
		    	<Header/>
		    	<div className="container">
					<h2>NEWS</h2>
		    	</div>
		    	<PageChanger />
		    	<div className="container">
					<NewsEntryContainer currentPage={this.props.currentPage} />
				</div>
				<PageChanger />
		    	<Footer />
		    </div>
		);
	}
});

var mapStateToProps = function(state, props) {
    return {
    	currentPage: state.news.currentPage
    };
};

var Container = connect(mapStateToProps)(newsPage);

module.exports = Container;