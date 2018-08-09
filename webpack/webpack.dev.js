const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  devtool: 'source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /..\/node_modules/,
        loaders: [
          'style-loader?sourceMap', 
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 
          'sass-loader'
        ]
      }
    ]
  }
})