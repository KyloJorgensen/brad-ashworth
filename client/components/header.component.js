'use strict';

var React = require('react'),
	connect = require('react-redux').connect,
	Link = require('react-router').Link;

var header = React.createClass({
	render: function() {  		
		return (
		    <nav className="header-wrapper">
		    	<ul>
			    	<li className="Logo">
				    	<p>Brad Ashworth</p>
					</li>
					<li className="dropdown float-right" >
						<a className="dropdown-toggle" id="navmenu" data-toggle="dropdown" ><i className="fa fa-bars" /></a>
					    <ul className="dropdown-menu dropdown-menu-right" role="menu" aria-labelledby="menu1">
							<li role="presentation" className="dropdown-header">MENU</li>
					      	<li role="presentation"><Link role="menuitem" tabIndex="-1" to={'/'} >HOME</Link></li>
					      	<li role="presentation"><Link role="menuitem" tabIndex="-1" to={'/news'} >NEWS</Link></li>
					    </ul>
					</li>
				</ul>
		    </nav>
		);
	}
});

var mapStateToProps = function(state, props) {
    return {};
};

var Container = connect(mapStateToProps)(header);

module.exports = Container;