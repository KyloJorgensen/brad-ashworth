'use strict';

var React = require('react'),
	Link = require('react-router').Link,
	facebookActions = require('../actions/facebook.actions');

var Header = React.createClass({
	getInitialState: function() {
		return {
			dropdown: 'none',
		};
	},
	onClick: function() {
		var _state = this.state;
		if (this.state.dropdown == 'none') {
			_state.dropdown = 'block';
		} else {
			_state.dropdown = 'none';
		}
		this.setState(_state);
	},
	login: function() {
		this.props.dispatch(facebookActions.fbloginstatus({facebookPageId: this.props.facebookPageId, scope: this.props.scope}));
	},
	logout: function() {
		this.props.dispatch(facebookActions.fblogout());
	},
	render: function() {
		var fbprofile = {};
		fbprofile.content = 'Facebook Login';
		fbprofile.fbfunction = this.login;

		if (this.props.first_name) {
			fbprofile.content = 'Facebook Logout';
			fbprofile.fbfunction = this.logout;
		}
		var fblogIO = (
			<li>
				<a onClick={fbprofile.fbfunction} >{fbprofile.content}</a>
			</li>
		);
		var profileImage = '';
		if (this.props.coverSource) {
			profileImage = (
				<img className="profile-image" src={this.props.coverSource} />
			);
		}
		return (
		    <nav className="header-wrapper">
		    	<ul>
			    	<li className="logo">
				    	<p>Brad Ashworth</p>
					</li>
					<li className="dropdown float-right" onClick={this.onClick} >
						{this.props.title + ' ' + this.props.first_name}
						{profileImage}
						<a id="navmenu" ><i className="fa fa-bars" /></a>
					    <ul id="navmenu-items" style={{display: this.state.dropdown}} >
							<li><p>MENU</p></li>
					      	<li><Link role="menuitem" tabIndex="-1" to={'/'} >HOME</Link></li>
					      	<li><Link role="menuitem" tabIndex="-1" to={'/news'} >NEWS</Link></li>
					      	{fblogIO}
					    </ul>
					</li>
				</ul>
		    </nav>
		);
	}
});

module.exports = Header;