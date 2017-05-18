'use strict';

var React = require('react'),
    connect = require('react-redux').connect;

var App = React.createClass({
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
    return {};
};

var Container = connect(mapStateToProps)(App);

module.exports = Container;