const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const helpers = require('./helpers');

module.exports = {
  entry:{
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': __dirname + "/src/main.ts"
  },
  output: {
    path: __dirname + '/dist',
    filename: 'app.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
      rules: [
        { test: /\.ts$/,
          loader: 'babel-loader',
          options: {
            compact: false,
            plugins: [linkerPlugin.default],
          },
          resolve: {
            fullySpecified: false
          }
        },
      ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
      new HtmlWebpackPlugin({
          template: __dirname + "/dist/index.html",
          inject: 'body'
      })
  ],
  devServer: {
      contentBase: './src/public',
      port: 7700,
  }
};
