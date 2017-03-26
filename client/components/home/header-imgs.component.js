'use strict';

var React = require('react'),
	connect = require('react-redux').connect,
	Link = require('react-router').Link;

var headerImgs = React.createClass({
	getInitialState: function() {
		return {
			currentImg: 0,
			imgHeight: '350px',
			imgWidth: 'auto',
			imgPadding: '0 0',
		};
	},
	componentDidMount: function(){
		this.timer = setInterval(this.next, 10000);
		window.addEventListener("resize", this.imgLoaded);
	},
	componentWillUnmount: function(){
		clearInterval(this.timer);
        window.removeEventListener("resize", this.imgLoaded);
	},
	next: function() {
		var _state = this.state;
		_state.currentImg++;
		_state.currentImg = _state.currentImg > this.props.imgs.length-1 ? 0 : _state.currentImg;
		this.setState(_state);
	},
	nextImg: function() {
		clearInterval(this.timer);
		this.timer = setInterval(this.next, 10000);
		this.next();
	},
	prevImg: function() {
		clearInterval(this.timer);
		this.timer = setInterval(this.next, 10000);
		var _state = this.state;
		_state.currentImg--;
		_state.currentImg = _state.currentImg < 0 ? this.props.imgs.length-1 : _state.currentImg;
		this.setState(_state);
	},
	imgLoaded: function() {
		var maxWidth = this.refs["wrapper"].clientWidth;
		var maxHeight = 350;
		var naturalWidth = this.refs["header-img"].naturalWidth;
		var naturalHeight = this.refs["header-img"].naturalHeight;
		var newHeight = naturalHeight/naturalWidth*maxWidth;
		var padding = (maxHeight - newHeight)/2;
		var _state = this.state;
		if (naturalWidth > maxWidth) {
			_state.imgHeight = Math.round(newHeight) + "px";
			_state.imgWidth = Math.round(maxWidth) + "px";
			_state.imgPadding = Math.round(padding) + 'px 0';
		}
		if (newHeight > maxHeight) {
			_state.imgHeight = Math.round(maxHeight) + "px";
			_state.imgWidth = "auto";
			_state.imgPadding = '0 0';
		}
		this.setState(_state);
	},
	render: function() {
		var img;
		if (this.props.imgs.length != 0) {
			img = (
				<a href={this.props.imgs[this.state.currentImg].link} style={{padding: this.state.imgPadding}} >
					<img id="header-img" ref="header-img" key="header-img" onLoad={this.imgLoaded} style={{height: this.state.imgHeight, width: this.state.imgWidth}} src={this.props.imgs[this.state.currentImg].src} alt={this.props.imgs[this.state.currentImg].alt} title={this.props.imgs[this.state.currentImg].title} />
				</a>
			);
		} else {
			img = (<a><img id="header-img" /></a>);
		}
		return (
			<div className="header-imgs-wrapper" ref="wrapper" >
				<i onClick={this.prevImg} className="fa fa-chevron-left" aria-hidden="true" />
				<i onClick={this.nextImg} className="fa fa-chevron-right" aria-hidden="true" />
				{img}
			</div>
		);
	}
});

var mapStateToProps = function(state, props) {
	return {};
};

var Container = connect(mapStateToProps)(headerImgs);

module.exports = Container;