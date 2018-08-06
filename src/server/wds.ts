import * as express from 'express';

/**
 * webpack dev server
 * @param {express.Application} app express
 */

export function wds (app: express.Application) {
  const webpackConfig = require('../../webpack.config.dev.js');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpack = require('webpack');

  const compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler));
}

export default wds;