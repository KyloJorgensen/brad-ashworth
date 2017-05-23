'use strict';

var React = require('react'),
    ReactDOM = require('react-dom'),
    Provider = require('react-redux').Provider,
    store = require('./store'),
    App = require('./components/app.component'),
    HomePage = require('./components/home/page.component'),
    NewsPage = require('./components/news/page.component'),
    NewsListContainer = require('./components/news/list-container.component.js'),
    NewsPostsView = require('./components/news/post-view.component'),
    NewsPostsEdit = require('./components/news/post-edit.component'),
    NewsPostsNew = require('./components/news/post-new.component'),
    AdminPageContainer = require('./containers/admin-page.container'),
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
                    <IndexRoute component={NewsListContainer} />
                    <Route path="view/:idnews" component={NewsPostsView} />
                    <Route path="edit/:idnews" component={NewsPostsEdit} />
                    <Route path="new" component={NewsPostsNew} />
                </Route>
                <Route path="admin" component={AdminPageContainer} />
            </Route>
        </Router>
    </Provider>
);

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(routes, document.getElementById('app'));
});