'use strict';

var React = require('react'),
	connect = require('react-redux').connect,
	Header = require('../header.component'),
	HeaderImgs = require('./header-imgs.component'),
	Footer = require('../footer.component'),
	NewSection = require('./news-container.component'),
	newsActions = require('../../actions/news.actions');

var homePage = React.createClass({
	getInitialState: function () {
  		return {
  			headerPosition: 'initial',
  			headerMargin: 0,
  		}
    },
	componentDidMount: function() {
	    window.addEventListener('scroll', this.handleScroll);
	},
	componentWillUnmount: function() {
	    window.removeEventListener('scroll', this.handleScroll);
	},
	handleScroll: function(e) {
		var _state = this.state;
		var scroll = e.srcElement.scrollingElement.scrollTop;
		var imgHeight = this.refs["header-imgs"].clientHeight;
		var navBarHeight = this.refs["header"].clientHeight;
		_state.headerPosition = scroll >= imgHeight ? 'fixed' : 'initial';
		_state.headerMargin = scroll >= imgHeight ? navBarHeight : 0;
		this.setState(_state);
	}, 
	render: function() {  		
		return (
		    <div className="home-page-wrapper" onScroll={this.handleScroll} >
		    	<div ref="header-imgs" style={{marginBottom: this.state.headerMargin+'px'}}>
					<HeaderImgs />
				</div>
				<div className="header-wrapper-pre" ref="header" style={{position: this.state.headerPosition,}} >
					<Header />
				</div>
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