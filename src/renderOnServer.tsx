import 'babel-polyfill';
import * as e6p from 'es6-promise';
(e6p as any).polyfill();
import 'isomorphic-fetch';

import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';

import {Provider} from 'react-redux';
import {createMemoryHistory, match} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import HTTP_STATUS_CODES from 'http-status-enum';
const {ReduxAsyncConnect, loadOnServer} = require('redux-connect');

import {Html} from './client/_common/html';
const lazyRequire = require('lazy-require');
const manifest = lazyRequire('../build/manifest.json');

import * as express from 'express';

const {ClientApplication} = require(APP_ENTRY_PATH);
import {serverRouter} from './server/_engine/routers/serverRouter';


const app = express();
app.use(serverRouter);
app.get('*', (req, res) => {
    const location = req.url;
    const memoryHistory = createMemoryHistory(req.originalUrl);
    const clientApplication = new ClientApplication();
    const store = clientApplication.configureStore(memoryHistory, ( req.user ? {session: _.cloneDeep(req.user)} : {}));
    const routes = clientApplication.clientRoutes;
    const history = syncHistoryWithStore(memoryHistory, store);

    match({history, routes, location},
        (error, redirectLocation, renderProps) => {
            if (error) {
                res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send(error.message);
            } else if (redirectLocation) {
                res.redirect(HTTP_STATUS_CODES.FOUND, redirectLocation.pathname + redirectLocation.search);
            } else if (renderProps) {
                const asyncRenderData = Object.assign({}, renderProps, {store});

                loadOnServer(asyncRenderData).then(() => {
                    const markup = ReactDOMServer.renderToString(
                        <Provider store={store} key="provider">
                            <ReduxAsyncConnect {...renderProps} />
                        </Provider>
                    );
                    res.status(HTTP_STATUS_CODES.OK).send(renderHTML(markup, store));
                });
            } else {
                res.status(HTTP_STATUS_CODES.NOT_FOUND).send('Not Found???');
            }
        });
});
function renderHTML(markup: string, store: any) {
    const html = ReactDOMServer.renderToString(
        <Html markup={markup} manifest={manifest} store={store}/>,
    );

    return `<!doctype html>${html}`;
}
//----------------------------------- exports
export const appRenderOnServer = app;