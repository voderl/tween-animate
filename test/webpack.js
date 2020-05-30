// 由于node 不支持es6 import export导入，因此使用webpack编译
const path = require('path');

module.exports = {
  mode: 'none',
  devtool: 'inline-source-map',
  entry: {
    index: path.resolve(__dirname, 'test.js'),
  },
  output: {
    publicPath: '',
    filename: 'test.bundle.js',
    // chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'bundle'),
  },
  target: 'node',
  plugins: [],
  resolve: {},
  externals: [
    function (context, request, callback) {
      if (/^chai$/.test(request)) {
        return callback(null, `commonjs2 ${request}`);
      }
      callback();
    },
  ],
};
