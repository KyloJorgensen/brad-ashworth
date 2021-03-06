'use strict';

var React = require('react'),
    connect = require('react-redux').connect,
    facebookActions = require('../actions/facebook.actions');

var App = React.createClass({
    componentWillMount: function() {
        facebookActions.fbAsyncInit(this.props.facebookAppId, this.props.facebookPageId, this.props.facebookVersion, this.props.dispatch, this.props.facebookScope);
    },

    render: function() {
        return (
            <div className="app" ref="app">
                <div className="app-body">
                    {this.props.children}
                </div>
            </div>
        );
    }
});

var mapStateToProps = function(state, props) {
    return {
        facebookAppId: state.facebook.facebookAppId,
        facebookPageId: state.facebook.facebookPageId,
        facebookVersion: state.facebook.facebookAppVersion,
        facebookScope: state.facebook.scope,
    };
};

var Container = connect(mapStateToProps)(App);

module.exports = Container;