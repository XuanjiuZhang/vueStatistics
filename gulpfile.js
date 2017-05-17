/**
 * Created by xuanjiu on 17/1/19.
 */
var gulp = require('gulp');
var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var config = require("./webpack.config.js");
var buildConfig = require("./webpack.config.build");
var path = require('path');
del = require('del');


gulp.task('dev', ['copyStyle'], function() {
  config.entry.statisticApp.unshift('webpack-dev-server/client?http://localhost:8089/', 'webpack/hot/only-dev-server');

  var compiler = webpack(config);
  var server = new webpackDevServer(compiler, {
    hot: true,
    // enable HMR on the server

    contentBase: path.resolve(__dirname, './'),
    // match the output path

    publicPath: '/build/',
    // match the output `publicPath`

    stats: { colors: true },

    proxy: {
      '/h5/service/*': {
        // target: 'http://192.168.51.22/'
       target: 'http://10.41.3.219/'
      }
    }
  });
  server.listen(8089);
});

gulp.task('copyStyle', function(){
  return gulp.src([
    './src/style/*',
  ])
    .pipe(gulp.dest('./build/style/'));
});

/*gulp.task('build', ['cleanImage', 'copyImage'], function() {
  webpack(buildConfig, function(err, stats) { console.log(err) });
});*/


/*gulp.task('cleanImage', function(){
  del([
      './build/img/*', 
    ]);
  console.log('clean /build/img folder.');
});

// 缩小PNG，JPEG，GIF和SVG图像
gulp.task('copyImage', function(){
  return gulp.src([
    './src/img/*',
  ])
    .pipe(gulp.dest('./build/img/'));
});*/

