'use strict';

var React = require('react'),
	connect = require('react-redux').connect,
	Link = require('react-router').Link;

var headerImgs = React.createClass({
	getInitialState: function() {
		return {
			currentImg: 0,
		};
	},
	componentDidMount: function(){
		this.timer = setInterval(this.next, 10000);
	},
	componentWillUnmount: function(){
		clearInterval(this.timer);
	},
	next: function() {
		clearInterval(this.timer);
		this.timer = setInterval(this.next, 10000);
		var _state = this.state;
		_state.currentImg++;
		_state.currentImg = _state.currentImg > this.props.imgs.length-1 ? 0 : _state.currentImg;
		this.setState(_state);
	},
	nextImg: function() {
		var _state = this.state;
		_state.currentImg++;
		_state.currentImg = _state.currentImg > this.props.imgs.length-1 ? 0 : _state.currentImg;
		this.setState(_state);
	},
	prevImg: function() {
		clearInterval(this.timer);
		this.timer = setInterval(this.next, 10000);
		var _state = this.state;
		_state.currentImg--;
		_state.currentImg = _state.currentImg < 0 ? this.props.imgs.length-1 : _state.currentImg;
		this.setState(_state);
	},
	render: function() {
		return (
			<div className="header-imgs-wrapper">
				<button onClick={this.prevImg} >PREVIOUS</button>
				<button onClick={this.nextImg} >NEXT</button>
				<a href={this.props.imgs[this.state.currentImg].link}><img id="header-img" src={this.props.imgs[this.state.currentImg].src} alt="this.props.imgs[this.state.currentImg].alt" /></a>
			</div>
		);
	}
});

var mapStateToProps = function(state, props) {
	return {
			imgs: [
				{
					src: 'https://www.w3schools.com/css/lights600x400.jpg',
					link: 'https://www.w3schools.com/css/css3_images.asp',
					alt: 'northern Lights',
					title: 'The Northern Lights',
				},
				{
					src: 'http://www.rockfordbuzz.com/wp-content/uploads/abstract-art-mother-earth-1030x458.jpg',
					link: 'https://www.w3schools.com',
					alt: 'cliff hiking',
					title: 'amazing Veiw',
				}
			],
		};
};

var Container = connect(mapStateToProps)(headerImgs);

module.exports = Container;