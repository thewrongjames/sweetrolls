const express = require('express')
const config = require('./config.json')
const dice = require('./dice.js')
const removeCharactersNotInList = require('validator').whitelist
const characterWhitelist = require('./characterWhitelist.js')
const server = express()
const port = process.env.PORT || config.localPort

const roomLogs = {}
const removeCharactersNotInWhitelist = string => removeCharactersNotInList(
  string, characterWhitelist
)

server.set('view engine', 'pug')
server.use(express.json()) // Enables express json encoding on the server

server.get('/', (request, response) => {
  response.render('index', {page: 'Home'})
})
server.get('/:roomName', (request, response) => {
  const roomName = removeCharactersNotInWhitelist(request.params.roomName)
  response.render('room', {page: roomName})
})
server.get('/api/:roomName', (request, response) => {
  const roomName = removeCharactersNotInWhitelist(request.params.roomName)
  response.json(roomLogs[roomName] || [])
})
server.post('/api/:roomName', (request, response) => {
  const roomName = removeCharactersNotInWhitelist(request.params.roomName)
  const playerName = removeCharactersNotInWhitelist(request.body.playerName)
  const diceAmount = parseInt(request.body.diceAmount)
  const diceType = removeCharactersNotInWhitelist(request.body.diceType)
  if (
    !dice.validDiceTypes.includes(diceType) ||
    !diceAmount ||
    diceAmount < 0 ||
    diceAmount > config.maxSingleRollDiceAmount
  ) {
    response.sendStatus(400)
    return
  }

  const result = dice.roll(diceAmount, diceType)
  // removeCharactersNotInList should ensure that playerName and diceType are
  // not dangerous to feed back to other users.
  const data = {
    playerName: playerName,
    diceAmount: diceAmount,
    diceType: diceType,
    rolls: result,
    total: result.reduce((a, b) => a + b, 0)
  }
  if (roomLogs[roomName]) {
    roomLogs[roomName].push(data)
  } else {
    roomLogs[roomName] = [data]
  }
  response.sendStatus(200)
})
// Define which folder to use for unbound requestuests
server.use(express.static('static'))

server.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
