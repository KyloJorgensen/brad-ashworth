'use strict';

var React = require('react'),
	Link = require('react-router').Link,
	facebookActions = require('../actions/facebook.actions');

var Footer = React.createClass({
	getInitialState: function () {
  		return {
  			bottom: 0,
  		}
    },
	componentDidMount: function() {
		this.min();
	},
	toggle: function() {
		this.state.bottom == 0 ? this.max() : this.min();
	},
	min: function() {
		var _state = this.state;
		_state.bottom = 30 - this.refs.footer.clientHeight;
		this.setState(_state);
	},
	max: function() {
		var _state = this.state;
		_state.bottom = 0;
		this.setState(_state);
	},
	login: function(event) {
		this.props.dispatch(facebookActions.fbloginstatus({facebookPageId: this.props.facebookPageId, adminScope: this.props.adminScope}));
	},
	render: function() {
		return (
		    <div className="footer-wrapper" ref="footer" id="footer" onMouseEnter={this.max} onMouseLeave={this.min}  onClick={this.toggle} style={{position: 'fixed', bottom: this.state.bottom+"px", width: '100%'}} >
		    	<div className="container">
		    		<a className="button alt" onClick={this.login} >ADMIN</a>
		    	</div>
		    </div>
		);
	}
});

module.exports = Footer;