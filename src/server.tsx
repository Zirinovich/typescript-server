import {configureStore} from "./client/modules/common/configureStore";
const appConfig = require('../config/main');

import * as e6p from 'es6-promise';
(e6p as any).polyfill();
import 'isomorphic-fetch';

import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';

import {Provider} from 'react-redux';
import {createMemoryHistory, match} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
const {ReduxAsyncConnect, loadOnServer} = require('redux-connect');

import {routes} from "./client/modules/defaultModule/routes";

import {Html} from "./client/modules/defaultModule/containers/html";
const manifest = require('../build/manifest.json');

import * as express from 'express';
import {serverRouter} from "./server/middlewares/serverRouter"

import {expressSetup, expressSessionSetup} from "./server/modules/expressSetup";
import {passportSetup} from "./server/modules/authenticationPassport"

const Chalk = require('chalk');

const app = express();

expressSetup(app);
expressSessionSetup(app);
passportSetup(app);

if (process.env.NODE_ENV !== 'production') {
    const webpack = require('webpack');
    const webpackConfig = require('../config/webpack/dev');
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
    const store = configureStore(memoryHistory);
    const history = syncHistoryWithStore(memoryHistory, store);

    match({history, routes, location},
        (error, redirectLocation, renderProps) => {
            if (error) {
                res.status(500).send(error.message);
            } else if (redirectLocation) {
                res.redirect(302, redirectLocation.pathname + redirectLocation.search);
            } else if (renderProps) {
                const asyncRenderData = Object.assign({}, renderProps, {store});

                loadOnServer(asyncRenderData).then(() => {
                    const markup = ReactDOMServer.renderToString(
                        <Provider store={store} key="provider">
                            <ReduxAsyncConnect {...renderProps} />
                        </Provider>,
                    );
                    res.status(200).send(renderHTML(markup, store));
                });
            } else {
                res.status(404).send('Not Found???');
            }
        });
});

app.listen(appConfig.port, appConfig.host, (err) => {
    if (err) {
        console.error(Chalk.bgRed(err));
    } else {
        console.info(Chalk.black.bgGreen(
            `\n\n💂  Listening at http://${appConfig.host}:${appConfig.port}\n`,
        ));
    }
});

function renderHTML(markup: string, store: any) {
    const html = ReactDOMServer.renderToString(
        <Html markup={markup} manifest={manifest} store={store}/>,
    );

    return `<!doctype html>${html}`;
}
