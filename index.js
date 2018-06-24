const express = require('express')
const config = require('./config.json')
const server = express()
const port = process.env.PORT || config.localPort

server.set('view engine', 'pug')
server.get('/', (req, res) => {
  res.render('index')
})
// Define which folder to use for unbound requests
server.use(express.static('static'))

server.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
  .on(`request`, (req, res) => {
    // Log requests
    let requestAddress = req.header('x-forwarded-for') ||
      req.connection.remoteAddress
    if (config.logHttp) {
      console.log(`[${requestAddress}] ${req.method} ${req.url}`)
    }
  })
