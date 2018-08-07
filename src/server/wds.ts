import * as express from 'express';

/**
 * webpack dev server
 * @param {express.Application} app express
 */

export function wds (app: express.Application) {
  // Cheack whether servier is running in development or production mode
  const suffix = app.get('env') === 'development' ? 'dev' : 'prod';

  const webpackConfig = require('../../webpack/webpack.' + suffix + '.js');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpack = require('webpack');

  const compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler));
}

export default wds;