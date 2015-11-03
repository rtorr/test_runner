var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config');
var conf = require('./src/lib/conf');
var winston = require('winston');

new WebpackDevServer(webpack(webpackConfig), {
  headers: { 'Access-Control-Allow-Origin': '*' },
  publicPath: webpackConfig.output.publicPath,
  hot: true,
  historyApiFallback: true,
  info: true, //
  inline: true,
  colors: true,
  noInfo: true
})
  .listen(conf.get('webpack_port'), conf.get('domain'), function(err) {
    if (err) {
      winston.log(err);
    }
    winston.log('Listening at http://' + conf.get('domain') + ':' + conf.get('webpack_port'));
  });
