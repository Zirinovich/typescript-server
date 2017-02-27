const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');

import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';

const manifest = require('../build/manifest.json');
const appConfig = require('../config/main');
import { App, Html } from './app/containers';

const app = express();

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackConfig = require('../config/webpack/dev');
  const webpackCompiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(webpackCompiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true },
    noInfo: true,
    hot: true,
    inline: true,
    lazy: false,
    historyApiFallback: true,
    quiet: true,
  }));

  app.use(require('webpack-hot-middleware')(webpackCompiler));
}

app.use(favicon(path.join(__dirname, 'public/favicon.ico')));

app.get('*', (req, res) => {
  console.log(req.url);
  const markup = ReactDOMServer.renderToString(
    <App/>,
  );
  res.status(200).send(renderHTML(markup));
});

app.listen(appConfig.port, appConfig.host, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`\n\nListening at http://${appConfig.host}:${appConfig.port}\n`);
  }
});

function renderHTML(markup) {
  const html = ReactDOMServer.renderToString(
    <Html markup={markup} manifest={manifest}/>,
  );

  return `<!doctype html> ${html}`;
}
