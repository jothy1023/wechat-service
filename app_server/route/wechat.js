var express = require('express')
var router = express.Router()
// var wechat = require('wechat')

var wechatController = require('../controller/wechat')
// var config = require('../../config/config')

// /* GET home page. wechat validate*/
// router.get('/', wechat(config, function (req, res, next) {
//   var message = req.weixin
//   console.log(message)
//   res.reply('lala')
// }))

router.get('/createMenu', wechatController.createMenu)
router.post('/uploadLogo', wechatController.uploadLogo)
router.post('/proxy/willing', wechatController.proxyWilling)
router.post('/proxy/buyer', wechatController.proxyBuyer)
router.post('/proxy/question', wechatController.proxyQuestion)
router.post('/proxy/answer', wechatController.proxyAnswer)

module.exports = router
