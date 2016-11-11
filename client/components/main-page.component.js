'use strict';

var React = require('react'),
	connect = require('react-redux').connect,
	Header = require('./header.component'),
	HeaderImgs = require('./header-imgs.component'),
	Footer = require('./footer.component');

var mainPage = React.createClass({
	render: function() {  		
		return (
		    <div className="main-page-wrapper">
				<HeaderImgs />
				<Header />
				<Footer />
		    </div>
		);
	}
});

var mapStateToProps = function(state, props) {
    return {};
};

var Container = connect(mapStateToProps)(mainPage);

module.exports = Container;