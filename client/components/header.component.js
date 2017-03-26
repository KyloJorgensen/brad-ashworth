'use strict';

var React = require('react'),
	connect = require('react-redux').connect,
	Link = require('react-router').Link;

var header = React.createClass({
	getInitialState: function() {
		return {
			dropdown: 'none',
		};
	},
	onClick: function() {
		console.log('here')
		var _state = this.state;
		if (this.state.dropdown == 'none') {
			_state.dropdown = 'block';
		} else {
			_state.dropdown = 'none';
		}
		this.setState(_state);
	},
	render: function() {  		
		return (
		    <nav className="header-wrapper">
		    	<ul>
			    	<li className="logo">
				    	<p>Brad Ashworth</p>
					</li>
					<li className="dropdown float-right" >
						<a id="navmenu" onClick={this.onClick} ><i className="fa fa-bars" /></a>
					    <ul id="navmenu-items" style={{display: this.state.dropdown}} >
							<li><p>MENU</p></li>
					      	<li><Link role="menuitem" tabIndex="-1" to={'/'} >HOME</Link></li>
					      	<li><Link role="menuitem" tabIndex="-1" to={'/news'} >NEWS</Link></li>
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