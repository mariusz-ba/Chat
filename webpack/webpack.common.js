const path = require('path');

module.exports = {
  entry: path.join(__dirname, '../src/client/index.tsx'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /..\/node_modules/,
        loader: 'ts-loader'
      }
    ]
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, '../src/client/components'),
      services: path.resolve(__dirname, '../src/client/services'),
      utils: path.resolve(__dirname, '../src/client/utils'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  }
}