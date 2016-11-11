'use strict';

var React = require('react'),
	connect = require('react-redux').connect,
	newsActions = require('../actions/news.actions');

var newsEntry = React.createClass({
	addNewsEntry: function(event) {
		event.preventDefault();
		console.log(this)
		if (this.refs.title.value && this.refs.content.value) {
			this.props.dispatch(newsActions.addNewsEntry(this.refs.title.value, this.refs.content.value, this.props.currentPage));
			this.refs.title.value = '';
			this.refs.content.value = '';
		}
	},
	render: function() {

		if (this.props.adminKey != false) {
			return (
				<form onSubmit={this.addNewsEntry} className="add-news-entry">
					<div className="admin">
						<input type="text" ref="title" />
						<p>{Date.now()} </p>
						<textarea ref="content" />
						<input type="submit" value="ADD" />
					</div>
				</form>
			);
		} else {
			return null;			
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