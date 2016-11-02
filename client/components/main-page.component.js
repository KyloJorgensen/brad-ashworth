'use strict';

var React = require('react'),
	connect = require('react-redux').connect;

var mainPage = React.createClass({
	render: function() {  		
		return (
		    <div className="main-page-wrapper">
		    	<p>Hello Wolrd</p>
		    </div>
		);
	}
});

var mapStateToProps = function(state, props) {
    return {};
};

var Container = connect(mapStateToProps)(mainPage);

module.exports = Container;