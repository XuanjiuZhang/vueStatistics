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
      './build/source-trace.html', 
      './build/statisticApp.min.js', 
      './build/style/*',
      './build/lib/elementLib/*',
      './build/lib/vue2-dropzone/*',
      './build/img/*',
      './build/icon/*',
      './build/fonts/*',
      './build/excel/*'
    ]);
});


gulp.task('copyAll', ['cleanBuild', 'copyStyle', 'copyImage', 'copyFonts', 'copyLib', 'copyOtherSource']);

// 压缩PNG，JPEG，GIF和SVG图像
gulp.task('copyImage', function(){
  return gulp.src([
    './src/images/*',
  ])
    .pipe(gulp.dest('./build/img/'));
});

gulp.task('dev', ['copyAll'], function() {
  config.entry.statisticApp.unshift('webpack-dev-server/client?http://10.41.3.245:8089/', 'webpack/hot/only-dev-server');

  var compiler = webpack(config);
  var server = new webpackDevServer(compiler, {
    hot: true,
    // enable HMR on the server

    contentBase: path.resolve(__dirname, 'build'),
    // match the output path

    publicPath: '/build',
    // match the output `publicPath`

    stats: { colors: true },

    proxy: {
      '/h5/service/*': {
        // target: 'http://192.168.51.22/'
        //  target: 'http://10.41.3.219/'
        target: 'http://10.41.3.221:3006',
        pathRewrite: {'^/h5/service/' : '/'}
      },
      '/cdn/**/*': {
      //  target: 'http://192.168.51.22/'
        target: 'http://10.41.3.219/'
        // target: 'http://192.168.150.20/'
      },
      '**/*': { 
        target: 'http://10.41.3.245:3007'
      }
    }
  });
  server.listen(8089, '10.41.3.245');
});

gulp.task('copyStyle', function(){
  return gulp.src([
    './src/style/*',
    './src/lib/elementLib/theme-default/index.css',
  ])
    .pipe(gulp.dest('./build/style/'));
});

/*gulp.task('copyIcon', function(){
  return gulp.src([
    './src/icon/*',
  ])
    .pipe(gulp.dest('./build/icon/'));
});*/

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

gulp.task('copyOtherSource', function(){
  gulp.src([
    './src/source-trace.html',
  ])
    .pipe(gulp.dest('./build/'))
  return gulp.src([
    './src/excel/*',
  ])
    .pipe(gulp.dest('./build/excel/'));
});

gulp.task('build', ['copyAll'], function() {
  webpack(buildConfig, function(err, stats) { console.log(err) });
});
