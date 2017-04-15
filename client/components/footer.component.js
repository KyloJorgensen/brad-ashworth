'use strict';

var React = require('react'),
	connect = require('react-redux').connect,
	Link = require('react-router').Link;

var footer = React.createClass({
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
	render: function() {
		return (
		    <div className="footer-wrapper" ref="footer" id="footer" onMouseEnter={this.max} onMouseLeave={this.min}  onClick={this.toggle} style={{position: 'fixed', bottom: this.state.bottom+"px", width: '100%'}} >
		    	<div className="container">
		    		<Link to={'/admin'} className="button alt" >ADMIN</Link>
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