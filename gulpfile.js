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

gulp.task('cleanBuild', function(){
  console.log('clean /build folder.');
  return del([
      './build/**/*', 
    ]);
});

gulp.task('copyAll', ['copyStyle', 'copyImage', 'copyFonts', 'copyLib']);

// 压缩PNG，JPEG，GIF和SVG图像
gulp.task('copyImage', function(){
  return gulp.src([
    './src/images/*',
  ])
    .pipe(gulp.dest('./build/img/'));
});

gulp.task('dev', function() {
  config.entry.statisticApp.unshift('webpack-dev-server/client?http://10.41.3.223:8089/', 'webpack/hot/only-dev-server');

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
        //  target: 'http://10.41.3.219/'
        target: 'http://10.41.3.221:3006',
        pathRewrite: {'^/h5/service/' : '/'}
      }
    }
  });
  server.listen(8089, '10.41.3.223');
});

gulp.task('copyStyle', function(){
  return gulp.src([
    './src/style/*',
    './src/lib/elementLib/theme-default/index.css',
  ])
    .pipe(gulp.dest('./build/style/'));
});

gulp.task('copyFonts', function(){
  return gulp.src([
    './src/fonts/*',
  ])
    .pipe(gulp.dest('./build/fonts/'));
});

gulp.task('copyLib', function(){
  return gulp.src([
    './src/lib/**/*',
  ])
    .pipe(gulp.dest('./build/lib/'));
});

gulp.task('build', ['copyAll'], function() {
  webpack(buildConfig, function(err, stats) { console.log(err) });
});
