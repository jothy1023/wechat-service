var express = require('express')
var router = express.Router()
var indexController = require('../controller/index')

/* GET home page. wechat validate*/
router.get('/', indexController.wechatValidate)
router.post('/', indexController.reply)

router.get('/render', indexController.proxyWithOpenid, indexController.render)
router.post('/proxy', indexController.renderTemplate)

module.exports = router
