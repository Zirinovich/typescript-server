import './server/registration';

const appConfig = require('../config/main');

import "babel-polyfill";
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

import {Html} from "./client/common/html";
var lazyRequire = require('lazy-require');
const manifest = lazyRequire('../build/manifest.json');

import * as express from 'express';
import {serverRouter} from './server/serverRouterMiddleware'

import {expressSetup, expressSessionSetup} from './server/expressSetup';
import {passportSetup} from './server/authenticationPassport';
import {clientApplication} from './server/clientApplication';

const Chalk = require('chalk');

const app = express();
// Интерфейсы экшенов правь!!!
expressSetup(app);
expressSessionSetup(app);
passportSetup(app);

if (process.env.NODE_ENV !== 'production') {
    const webpack = require('webpack');
    const webpackConfig = require('../config/webpack/client.webpack.config');
    const webpackCompiler = webpack(webpackConfig);

    app.use(require('webpack-dev-middleware')(webpackCompiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: {colors: true},
        noInfo: true,
        hot: true,
        inline: true,
        lazy: false,
        historyApiFallback: true,
        quiet: true,
    }));

    app.use(require('webpack-hot-middleware')(webpackCompiler));
}

app.use(serverRouter);

app.get('*', (req, res) => {

    const location = req.url;
    const memoryHistory = createMemoryHistory(req.originalUrl);
    const store = clientApplication.configureStore(memoryHistory, ( req.user ? {user: Object.assign({}, req.user, {password: undefined})} : {}));
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
                        </Provider>,
                    );
                    res.status(HTTP_STATUS_CODES.OK).send(renderHTML(markup, store));
                });
            } else {
                res.status(HTTP_STATUS_CODES.NOT_FOUND).send('Not Found???');
            }
        });
});

app.listen(appConfig.port, appConfig.host, (err) => {
    if (err) {
        console.error(Chalk.bgRed(err));
    } else {
        console.info(Chalk.black.bgGreen(
            `\n\n凸ಠ益ಠ)凸  Listening at http://${appConfig.host}:${appConfig.port}\n`,
        ));
    }
});

function renderHTML(markup: string, store: any) {
    const html = ReactDOMServer.renderToString(
        <Html markup={markup} manifest={manifest} store={store}/>,
    );

    return `<!doctype html>${html}`;
}
