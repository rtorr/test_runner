var path = require('path');
var webpack = require('webpack');

var entry = {
  app: ['./public/js/index']
};

var loaders = [];

var out_path = path.join(__dirname, './dist/public/js/')

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        unsafe: true,
        warnings: false
      },
      output: {comments: false}
    })
  );
  loaders.push(
    { test: /\.js?$/, exclude: /node_modules/, loaders: ['babel?optional[]=runtime&stage=0'] }
  );
}else {
  loaders.push(
    { test: /\.js?$/, exclude: /node_modules/, loaders: ['babel?optional[]=runtime&stage=0'] }
  );
}

module.exports = {

  entry: entry,

  output: {
    path: out_path,
    filename: 'bundle.js',
    publicPath: '/public/'
  },

  module: {
    loaders: loaders
  },

  node: {
    Buffer: false
  }

};