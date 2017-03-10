'use strict';

var React = require('react'),
	connect = require('react-redux').connect,
	Header = require('../header.component'),
	HeaderImgs = require('../header-imgs.component'),
	Footer = require('../footer.component'),
	NewSection = require('./home-news-container.component'),
	newsActions = require('../../actions/news.actions');

var homePage = React.createClass({
	render: function() {  		
		return (
		    <div className="home-page-wrapper">
				<HeaderImgs />
				<Header />
				<div className="container">
					<NewSection/>
				</div>
				<Footer />
		    </div>
		);
	}
});

var mapStateToProps = function(state, props) {
    return {};
};

var Container = connect(mapStateToProps)(homePage);

module.exports = Container;