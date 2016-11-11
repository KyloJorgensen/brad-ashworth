'use strict';

var React = require('react'),
	connect = require('react-redux').connect,
	Header = require('./header.component'),
	Footer = require('./footer.component'),
	NewsEntryContainer = require('./news-entry-container.component'),
	PageChanger = require('./page-changer.component');

var newsPage = React.createClass({
	render: function() {
		return (
		    <div className="news-page-wrapper">
		    	<Header/>
		    	<PageChanger />
				<NewsEntryContainer currentPage={this.props.currentPage} />
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