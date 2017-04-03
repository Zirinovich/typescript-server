import './client/registration';
import * as e6p from 'es6-promise';
(e6p as any).polyfill();
import 'isomorphic-fetch';
import 'core-js';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
const {Router, browserHistory} = require('react-router');
import {syncHistoryWithStore} from 'react-router-redux';
const {ReduxAsyncConnect} = require('redux-connect');
import "babel-polyfill";
import {clientApplication} from './client/clientApplication';

const store = clientApplication.configureStore(
    browserHistory,
    window.__INITIAL_STATE__,
);
const routes = clientApplication.clientRoutes;
const history = syncHistoryWithStore(browserHistory, store);
const connectedCmp = (props) => <ReduxAsyncConnect {...props} />;

ReactDOM.render(
    <Provider store={store} key="provider">
        <Router
            history={history}
            render={connectedCmp}
        >
            {routes}
        </Router>
    </Provider>,
    document.getElementById('app'),
);
