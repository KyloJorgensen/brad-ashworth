'use strict';

var React = require('react'),
	connect = require('react-redux').connect,
	newsActions = require('../actions/news.actions');

var newsEntry = React.createClass({
	editField: function(that) {
		var state = this.state;
		state[that.target.name] = that.target.value;
		this.setState(state);
	},
	saveNewsEntry: function() {
		console.log('save');
		this.props.dispatch(newsActions.updateNewsEntry(this.state, this.props.currentPage));
	},
	deleteNewsEntry: function() {
		console.log('delete');
		this.props.dispatch(newsActions.removeNewsEntry(this.props.newsEntry, this.props.currentPage));
	},
	componentWillMount: function() {
		this.setState(this.props.newsEntry);
	},
	render: function() {
		if (this.props.adminKey != false) {
			return (
				<li className="news-entry">
					<div className="admin">
						<input type="text" onChange={this.editField} name="title" value={this.state.title} />
						<p>{this.state.date_enter} </p>
						<textarea onChange={this.editField} name="content" value={this.state.content} />
						<button onClick={this.saveNewsEntry} >SAVE</button>
						<button onClick={this.deleteNewsEntry} >DELETE</button>
					</div>
				</li>
			);
		} else {
			return (
				<li className="news-entry">
					<div className="public">
						<h1>{this.state.title}</h1>
						<h2>{this.state.date_enter}</h2>
						<p>{this.state.content}</p>
					</div>
				</li>
			);			
		}
	}
});

var mapStateToProps = function(state, props) {
	return {
		adminKey: state.user.key,
		currentPage: state.news.currentPage
	};
};

var Container = connect(mapStateToProps)(newsEntry);

module.exports = Container;