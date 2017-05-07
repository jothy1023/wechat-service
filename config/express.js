var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var http = require('http')
var proxy = require('express-http-proxy')

var config = require('./config')
var index = require('../app_server/route/index')
var users = require('../app_server/route/users')
var wechat = require('../app_server/route/wechat')

module.exports = function () {
  var app = express()

  // view engine setup
  app.set('views', path.join(__dirname, '../app_server', 'view'))
  app.set('view engine', 'ejs')

  // uncomment after placing your favicon in /public
  //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
  app.use(logger('dev'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(cookieParser())
  app.use(express.static(path.join('./public')))
  app.use(express.query())

  app.use('/', index)
  app.use('/users', users)
  app.use('/wechat', wechat)
  app.use('/proxy', proxy(config.proxyUrl, {
    forwardPath: function(req, res) {
      return require('url').parse(req.url).path
    },
    decorateRequest: function(proxyReq) {
      // you can update headers
      proxyReq.headers['Content-Type'] = 'application/json'
      // you can change the method
      proxyReq.method = 'POST'
      return proxyReq
    }
  }), index)
  app.use('/ishare', wechat)

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
  })

  return app
}