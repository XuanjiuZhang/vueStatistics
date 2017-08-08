#!/usr/bin/env node

var config = {
  debug: false,
  port: 3007,
  env: 'development'
}

var express = require('express');
var path = require('path');
var ejs = require('ejs-mate');
//var compress = require('compression');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routers = require('./appRouter');
var app = express();
app.disable('etag');
// 设置模板
app.set('views', path.join(__dirname, '/build'));
app.set('view engine', 'html');
app.engine('html', ejs);
app.use(cookieParser());
app.use(bodyParser.json());
// 母板
//app.locals._layoutFile = 'layout.html';
// 视图缓存
if (!config.debug) {
  app.set('view cache', true);
}

// 静态文件目录
var staticDir = path.join(__dirname, 'build');
app.use('/build', express.static(staticDir, { maxAge: 1*1000 }));

// 服务端压缩编码中间件
//app.use(compress());
//app.locals.config = config;
// 路由
app.use('/', routers);

// 404 页面
app.use(function(req, res) {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

// 错误处理
app.use(function(err, req, res) {
  if (config.debug) {
    console.error(err);
    return res.status(500).send(err.toString());
  } else {
    return res.status(500).send('500 status');
  }
});

// 将未处理的错误写入到错误日志中
process.on('uncaughtException', function (err) {
  console.log(err);
});

app.listen(config.port, function() {
  console.log('Express started on http://localhost:' + config.port + '; press Ctrl-C to terminate.');
});