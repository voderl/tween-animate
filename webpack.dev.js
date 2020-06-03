const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
  },
  // plugins: [
  //   // new webpack.HotModuleReplacementPlugin(),
  // ],
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'test', 'index.html'),
      chunks: ['vendors', 'index'],
    }),
  ],
  output: {
    publicPath: '',
    hashDigestLength: 8,
    filename: '[name].[hash].bundle.js',
    chunkFilename: '[name].[hash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    // rules: [{
    //   test: /\.css$/,
    //   use: [
    //     'style-loader',
    //     'css-loader',
    //   ],
    // },
    // ],
  },
});
