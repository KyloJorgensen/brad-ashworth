'use strict';

var React = require('react'),
	connect = require('react-redux').connect,
	Link = require('react-router').Link;

var footer = React.createClass({
	render: function() {  		
		return (
		    <div className="footer-wrapper">
		    	<div className="conatiner">
		    		<Link to={'/admin'}>ADMIN</Link>
		    	</div>
		    </div>
		);
	}
});

var mapStateToProps = function(state, props) {
    return {};
};

var Container = connect(mapStateToProps)(footer);

module.exports = Container;