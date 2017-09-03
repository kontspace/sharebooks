import ReactDOM from "react-dom";
import React from "react";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import { useStrict } from "mobx";
import { Provider } from "mobx-react";


import App from "./components/App";
import ListBooks from "./components/Books";
import BookDetail from './components/BookDetail'

import bookStore from "./stores/bookStore";
import bookDetailStore from "./stores/bookDetailStore";

const stores = {
    bookStore,
    bookDetailStore
}

// For easier debugging
window._____APP_STATE_____ = stores;

useStrict(true);



const Root = () =>
    <Provider {...stores}>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={ListBooks} />
                <Route path="/books/:id" component={BookDetail} />
                {/* <Route path="login" component={Login} />
                <Route path="register" component={Register} />
                <Route path="editor" component={Editor} />
                <Route path="editor/:slug" component={Editor} />
                <Route path="article/:id" component={Article} />
                <Route path="settings" component={Settings} />
                <Route path="@:username" component={Profile} />
                <Route path="@:username/favorites" component={Profile} /> */}
            </Route>
        </Router>
    </Provider>;

ReactDOM.render(<Root />, document.getElementById("root"));
