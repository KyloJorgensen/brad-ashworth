'use strict';

var React = require('react'),
    ReactDOM = require('react-dom'),
    Provider = require('react-redux').Provider,
    store = require('./store'),
    App = require('./components/app.component'),
    MainPage = require('./components/main-page.component'),
    router = require('react-router'),
    Router = router.Router,
    Route = router.Route,
    hashHistory = router.hashHistory,
    IndexRoute = router.IndexRoute;

var routes = (
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={MainPage} />
            </Route>
        </Router>
    </Provider>
);

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(routes, document.getElementById('app'));
});