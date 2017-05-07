var WechatAPI = require('wechat-api')

var config = require('../../config/config')
var api = new WechatAPI(config.appid, config.secret)

var menu = {
  "button": [
    {
      "type": "view",
      "name": "绑定账号",
      "url": "http://jothy.tunnel.2bdata.com/render"
    },
    {
      "type": "view",
      "name": "网站主页",
      "url": "http://yyshare.tunnel.2bdata.com"
    }
  ]
}
var filepath = 'public/images/img.png'

exports.createMenu = function () {
  return api.createMenu(menu, function (err, res) {
    if (err) {
      console.log(err)
      return
    }
    console.log('createMenu success~')
  })
}

exports.uploadLogo = function () {
  api.uploadLogo(filepath, function (err, res) {
    if (err) {
      console.log(err)
      return
    }
    console.log('uploadLogo success~', res)
  })
  this.body = 'uploadLogo success~'
}

exports.proxyWilling = function (req, res) {
  var body = req.body.data
  console.log(JSON.stringify(body))
  const msg = `亲爱的${body.nickname}, 有一位用户对您的闲置宝贝【${body.title}】发布了购买意向，请尽快上去查看哟~`
  return api.sendText(body.openid, msg, function (err, res) {
    if (err) {
      console.log('proxyToWechat error: ', err)
    } else {
      console.log('proxyToWechat result', res)
    }
  })
}
exports.proxyBuyer = function (req, res) {
  var body = req.body.data
  console.log(JSON.stringify(body))
  const msg = `亲爱的${body.nickname}, 卖家已决定将商品【${body.title}】卖给您，请尽快上去查看哟~`
  return api.sendText(body.openid, msg, function (err, res) {
    if (err) {
      console.log('proxyToWechat error: ', err)
    } else {
      console.log('proxyToWechat result', res)
    }
  })
}
exports.proxyQuestion = function (req, res) {
  var body = req.body.data
  console.log(JSON.stringify(body))
  const msg = `亲爱的${body.nickname}, 有一位用户对您发布的【${body.title}】发表了提问，请尽快上去回答哟~`
  return api.sendText(body.openid, msg, function (err, res) {
    if (err) {
      console.log('proxyToWechat error: ', err)
    } else {
      console.log('proxyToWechat result', res)
    }
  })
}
exports.proxyAnswer = function (req, res) {
  var body = req.body.data
  console.log(JSON.stringify(body))
  const msg = `亲爱的${body.nickname}, 发布者回答了您在【${body.title}】下的提问，快上去看看吧~`
  return api.sendText(body.openid, msg, function (err, res) {
    if (err) {
      console.log('proxyToWechat error: ', err)
    } else {
      console.log('proxyToWechat result', res)
    }
  })
}