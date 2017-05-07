var express = require('./config/express')
var app = express()

/**
 * Get port from environment and store in Express.
 */

var port = process.env.PORT || '3000'

app.listen(port)
console.log('server running at http://localhost:3000')

module.exports = app
