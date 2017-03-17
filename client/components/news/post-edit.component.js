'use strict';

var React = require('react'),
	connect = require('react-redux').connect,
	newsActions = require('../../actions/news.actions');

var newsPostEdit = React.createClass({
	
	editField: function(that) {
		var state = this.state;
		state[that.target.name] = that.target.value;
		this.setState(state);
	},
	saveNewsPost: function() {
		console.log('save');
		this.props.dispatch(newsActions.updateNewsPost(this.state));
	},
	deleteNewsPost: function() {
		console.log('delete');
		this.props.dispatch(newsActions.removeNewsPost(this.state));
	},
	componentWillMount: function() {
		var _state = {
			idnews: this.props.newsPost_idnews,
			title: this.props.newsPost_title,
			date_enter: this.props.newsPost_date_enter,
			content: this.props.newsPost_content
		};

		this.setState(_state);
	},
	componentDidMount: function() {
		this.props.dispatch(newsActions.getNewsPost(this.props.params.idnews));
	},
	componentWillReceiveProps: function(nextProps) {
		var _state = this.state;
		_state.idnews = nextProps.newsPost_idnews;
		_state.title = nextProps.newsPost_title;
		_state.date_enter = nextProps.newsPost_date_enter;
		_state.content = nextProps.newsPost_content;
		this.setState(_state);
	},
	createMarkup: function() {
		return {__html: this.state.content};
	},
	render: function() {
		return (
			<div className="news-post-edit">
					<div>
						Title: 
						<input type="text" onChange={this.editField} name="title" value={this.state.title} />
						<p>{this.state.date_enter} </p>
					</div>
					Content:
					<textarea onChange={this.editField} name="content" value={this.state.content} />
					<div>
						<button onClick={this.saveNewsPost} >SAVE</button>
						<button className="right" onClick={this.deleteNewsPost} >DELETE</button>
					</div>

					<div className="news-post-view" >
						<div className="news-post-content" >
							<div className="news-post-header">
								<h4>{this.state.title}</h4>
								<h5>{this.state.date_enter}</h5>
							</div>
							<div dangerouslySetInnerHTML={this.createMarkup()} />
						</div>
					</div>
			</div>
		);
	}
});

var mapStateToProps = function(state, props) {
	return {
		newsPost_idnews: state.news.currentPost.idnews,
		newsPost_title: state.news.currentPost.title,
		newsPost_date_enter: state.news.currentPost.date_enter,
		newsPost_content: state.news.currentPost.content
	};
};

var Container = connect(mapStateToProps)(newsPostEdit);

module.exports = Container;