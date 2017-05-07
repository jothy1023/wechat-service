var sha1 = require('sha1')
var request = require('request')
var wechat = require('wechat')
var WechatAPI = require('wechat-api')
var proxy = require('express-http-proxy')

var config = require('../../config/config')

var api = new WechatAPI(config.appid, config.secret)

var openid = ''
/**
 * for wechat api validation
 *
 * @param {any} req
 * @param {any} res
 * @param {any} next
 */
exports.wechatValidate = function (req, res, next) {
  var token = config.token
  var query = req.query
  var signature = query.signature
  var nonce = query.nonce
  var timestamp = query.timestamp
  var echostr = query.echostr

  var str = [token, timestamp, nonce].sort().join('')
  var sha = sha1(str)

  if (sha === signature) {
    res.end(echostr)
    console.log(req.body + '微信接口验证成功')
  } else {
    console.log('微信接口验证 Failed!')
    res.end('Hello World')
  }
}

exports.reply = wechat(config, function (req, res, next) {
  console.log('收到信息 weixin：' + JSON.stringify(req.weixin))
  var weixin = req.weixin || {}
  if (Object.keys(weixin).length > 0) {
    openid = weixin.FromUserName
  }
  res.reply('hi, sweety')
})

exports.render = function (req, res, next) {
  console.log(openid, '########', __filename)
  res.render('index', {
    title: '绑定账号',
    openid: openid
  })
}
exports.renderTemplate = function (req, res, next) {
  res.render('template', {
    title: '',
    content: 'test render, miao~',
    openid: openid
  })
}

exports.proxyWithOpenid = function (req, res, next) {
  req.query.openid = 'hahaha'

  next()
}