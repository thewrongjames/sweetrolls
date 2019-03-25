const express = require('express')
const config = require('./config.json')
const dice = require('./dice.js')
const { valueIsPositiveNumber } = require('./utilities')
const removeCharactersNotInList = require('validator').whitelist
const characterWhitelist = require('./characterWhitelist.js')
const server = express()
const port = process.env.PORT || config.localPort

const roomLogs = {}
const removeCharactersNotInWhitelist = string => removeCharactersNotInList(
  string, characterWhitelist
)

server.set('view engine', 'pug')
server.use(express.json()) // Enables express json encoding on the server.

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
  const diceNumber = parseInt(request.body.diceNumber)
  const diceSides = parseInt(request.body.diceSides)
  const totalModifier = parseInt(request.body.totalModifier) || 0
  if (
    !valueIsPositiveNumber(diceSides) ||
    !valueIsPositiveNumber(diceNumber) ||
    diceSides > config.maxDiceSides ||
    diceNumber > config.maxSingleRollDiceAmount
  ) {
    response.sendStatus(400)
    return
  }

  const results = dice.roll(diceNumber, diceSides)
  // removeCharactersNotInList and parseInt should ensure that it would be safe
  // to feed this stuff back to the user.
  const data = {
    playerName,
    diceNumber,
    diceSides,
    totalModifier,
    rolls: results,
    total: results.reduce((a, b) => a + b, 0) + totalModifier
  }
  if (roomLogs[roomName]) {
    roomLogs[roomName].push(data)
  } else {
    roomLogs[roomName] = [data]
  }
  response.sendStatus(200)
})

// Define which folder to use for unbound requests.
server.use(express.static('static'))

server.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
