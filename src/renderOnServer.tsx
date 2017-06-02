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
import {Fetcher} from "./shared/classes/Fetcher";
import {SessionDto} from "./shared/ajaxDto/authentication/SessionDto";
import {AccountDto} from "./shared/ajaxDto/authentication/AccountDto";


const app = express();
app.use(serverRouter);
app.get('*', async(req, res) => {
    const location = req.url;
    const memoryHistory = createMemoryHistory(req.originalUrl);

    (global as any).xSessionCookies = req.cookies["x-session"];
    let sessionResponse = await Fetcher.postAsync<AccountDto[]>({
        url: '/api/main/secure/obtainsession',
    });

    const clientApplication = new ClientApplication();
    const store = clientApplication.configureStore(memoryHistory, ( sessionResponse.data ? {session: sessionResponse.data} : {}));
    const routes = clientApplication.clientRoutes(store);
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