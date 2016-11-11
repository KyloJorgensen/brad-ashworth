'use strict';

var React = require('react'),
	connect = require('react-redux').connect,
	newsActions = require('../actions/news.actions');

var newsEntry = React.createClass({
	addNewsEntry: function(event) {
		event.preventDefault();
		if (this.refs.title.value && this.refs.content.value) {
			this.props.dispatch(newsActions.addNewsEntry(this.refs.title.value, this.refs.content.value, this.props.entriesAmount, this.props.currentPage));
			this.refs.title.value = '';
			this.refs.content.value = '';
		}
	},
	render: function() {

		if (this.props.adminKey != false) {
			return (
				<form onSubmit={this.addNewsEntry} className="add-news-entry">
					<div className="admin">
						<div>
							Title:<input type="text" ref="title" />
							<p>Date</p>
						</div>
						Content:<textarea ref="content" />
						<div>
							<input type="submit" value="ADD" />
						</div>
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
		currentPage: state.news.currentPage,
		entriesAmount: state.news.entriesAmount
	};
};

var Container = connect(mapStateToProps)(newsEntry);

module.exports = Container;