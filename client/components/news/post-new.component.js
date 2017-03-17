'use strict';

var React = require('react'),
	connect = require('react-redux').connect,
	newsActions = require('../../actions/news.actions');

var d = new Date();

var newsPostNew = React.createClass({
	addNewsPost: function(event) {
		event.preventDefault();
		if (this.refs.title.value && this.refs.content.value) {
			this.props.dispatch(newsActions.addNewsPost(this.refs.title.value, this.refs.content.value, this.props.postsAmount, this.props.currentPage));
			this.refs.title.value = '';
			this.refs.content.value = '';
		}
	},
	createMarkup: function() {
		return {__html: this.refs.content.value || 'none'};
	},
	render: function() {
		return (
			<div className="news-post-new">
				<form onSubmit={this.addNewsPost} className="add-news-post">
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
			</div>
		);
	}
});

var mapStateToProps = function(state, props) {
	return {
		currentPage: state.news.currentPage,
		postsAmount: state.news.postsAmount
	};
};

var Container = connect(mapStateToProps)(newsPostNew);

module.exports = Container;