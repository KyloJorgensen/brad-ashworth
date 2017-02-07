'use strict';

var React = require('react'),
	connect = require('react-redux').connect,
	newsActions = require('../../actions/news.actions'),
	Link = require('react-router').Link;

var newsEntry = React.createClass({
	componentWillMount: function() {
		this.setState(this.props.newsEntry);
	},
	createMarkup: function() {
		return {__html: this.state.content};
	},
	render: function() {
		return (
			<li className="news-entry" >
				<Link to={'/news/view/' + this.state.idnews} >
					<div className="news-entry-content" onClick={this.entryPopUp} >
						<div className="news-enrty-header">
							<h4>{this.state.title}</h4>
							<h5>{this.state.date_enter}</h5>
						</div>
						<div dangerouslySetInnerHTML={this.createMarkup()} />
					</div>
				</Link>
			</li>
		);	
	}
});

var mapStateToProps = function(state, props) {
	return {
		newsEntry: state.news.newsEntries[props.newsEntryNumber]
	};
};

var Container = connect(mapStateToProps)(newsEntry);

module.exports = Container;