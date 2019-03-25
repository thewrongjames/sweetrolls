const getPlayerName = () => {
  const playerName = document.getElementById('playerName').value
  const noPlayerNameWarning = document.getElementById('noPlayerNameWarning')
  if (!playerName) {
    noPlayerNameWarning.classList.remove('hidden')
    return
  } else {
    noPlayerNameWarning.classList.add('hidden')
  }
  return playerName
}

const sendRoll = rollData => window.fetch(
  '/api/' + document.body.dataset.roomName,
  {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(rollData)
  }
)

// eslint-disable-next-line no-unused-vars
const quickRoll = () => roll(
  parseInt(document.getElementById('quickRollDiceNumber').value),
  parseInt(document.getElementById('quickRollDiceSides').value),
  0
)

// eslint-disable-next-line no-unused-vars
const roll = (diceNumber, diceSides, totalModifier) => {
  const playerName = getPlayerName()
  if (!playerName) return
  sendRoll({ playerName, diceNumber, diceSides, totalModifier })
}

const addButton = () => { // eslint-disable-line no-unused-vars
  const diceNumber = document.getElementById('newButtonDiceNumber').value
  const diceSides = document.getElementById('newButtonDiceSides').value
  const totalModifier = document.getElementById('newButtonTotalModifier').value

  const newButtonDiv = document.createElement('div')
  newButtonDiv.classList.add('customButtonContainer')

  const rollButton = document.createElement('button')
  rollButton.classList.add('rollButton')
  rollButton.addEventListener('click', () => roll(
    diceNumber, diceSides, totalModifier
  ))
  rollButton.innerText = 'Roll'

  let totalModifierText = totalModifier
    ? (totalModifier > 0 ? '+ ' : '- ') + Math.abs(totalModifier)
    : ''
  newButtonDiv.innerText = `${diceNumber}d${diceSides} ${totalModifierText}`
  newButtonDiv.appendChild(rollButton)

  document.getElementById('customButtonsContainer').appendChild(newButtonDiv)
}
