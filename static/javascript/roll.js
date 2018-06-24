const roll = diceType => { // eslint-disable-line no-unused-vars
  const amount = parseInt(document.getElementById(diceType + 'Amount').value)
  const playerName = document.getElementById('playerName').value
  const noPlayerNameWarning = document.getElementById('noPlayerNameWarning')
  if (!playerName) {
    noPlayerNameWarning.classList.remove('hidden')
    return
  } else {
    noPlayerNameWarning.classList.add('hidden')
  }
  console.log({playerName: playerName, diceAmount: amount, diceType: diceType})
  window.fetch(
    '/api/' + document.body.dataset.roomName,
    {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(
        {playerName: playerName, diceAmount: amount, diceType: diceType}
      )
    }
  )
}

// fetch(
// 'http://localhost:5000/api/room',
// {method: 'POST', headers: {'content-type': 'application/json'}, body: JSON.stringify({playerName: '<script>sadf', diceAmount: '10', diceType: 'd12'})}
// ).then(console.log)
