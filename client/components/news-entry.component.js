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
		this.props.dispatch(newsActions.updateNewsEntry(this.state, this.props.entriesAmount, this.props.currentPage));
	},
	deleteNewsEntry: function() {
		console.log('delete');
		this.props.dispatch(newsActions.removeNewsEntry(this.props.newsEntry, this.props.entriesAmount, this.props.currentPage));
	},
	componentWillMount: function() {
		this.setState(this.props.newsEntry);
	},
	render: function() {
		if (this.props.adminKey != false) {
			return (
				<li className="news-entry">
					<div className="admin">
						<div>
							Title: <input type="text" onChange={this.editField} name="title" value={this.state.title} />
							<p>{this.state.date_enter} </p>
						</div>
						Content:
						<textarea onChange={this.editField} name="content" value={this.state.content} />
						<div>
							<button onClick={this.saveNewsEntry} >SAVE</button>
							<button className="right" onClick={this.deleteNewsEntry} >DELETE</button>
						</div>
					</div>
				</li>
			);
		} else {
			return (
				<li className="news-entry">
					<div className="public">
						<div>
							<h4>{this.state.title}</h4>
							<h5>{this.state.date_enter}</h5>
						</div>
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
		currentPage: state.news.currentPage,
		entriesAmount: state.news.entriesAmount
	};
};

var Container = connect(mapStateToProps)(newsEntry);

module.exports = Container;