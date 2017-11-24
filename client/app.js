'use strict';

var React = require('react'),
    ReactDOM = require('react-dom'),
    Provider = require('react-redux').Provider,
    store = require('./store'),
    App = require('./components/app.component'),
    HomePage = require('./components/home/page.component'),
    NewsPage = require('./containers/news/page.container'),
    NewsList = require('./containers/news/list.container'),
    NewsPostsView = require('./components/news/post-view.component'),
    NewsPostsEdit = require('./components/news/post-edit.component'),
    NewsPostsNew = require('./components/news/post-new.component'),
    router = require('react-router'),
    Router = router.Router,
    Route = router.Route,
    hashHistory = router.hashHistory,
    IndexRoute = router.IndexRoute;

var routes = (
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={HomePage} />
                <Route path="news" component={NewsPage} >
                    <IndexRoute component={NewsList} />
                    <Route path="view/:idnews" component={NewsPostsView} />
                    <Route path="edit/:idnews" component={NewsPostsEdit} />
                    <Route path="new" component={NewsPostsNew} />
                </Route>
            </Route>
        </Router>
    </Provider>
);

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(routes, document.getElementById('app'));
});