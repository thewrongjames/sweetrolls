let roomLog = []

const makeEnglishList = array => {
  const newArray = array.slice()
  if (newArray.length > 1) {
    newArray[newArray.length - 1] = 'and ' + newArray[newArray.length - 1]
  }
  if (newArray.length === 2) {
    return newArray.join(' ')
  }
  return newArray.join(', ')
}

const drawRoomLog = () => {
  const history = document.getElementById('history')
  while (history.firstChild) {
    history.removeChild(history.firstChild)
  }

  const elements = roomLog
    .map(
      data => {
        let totalModifierText = data.totalModifier
          ? (data.totalModifier > 0 ? '+ ' : '- ') + Math.abs(data.totalModifier)
          : ''
        return (
          `${data.playerName} rolled ${data.diceNumber}d${data.diceSides} ` +
          totalModifierText +
          ` getting ${makeEnglishList(data.rolls)} totalling ${data.total}`
        )
      }
    )
    .map(text => {
      const element = document.createElement('p')
      element.innerHTML = text
      return element
    })
  elements.reverse()

  elements.forEach(element => history.appendChild(element))
}

const updateRoomLog = () => {
  window.fetch('/api/' + document.body.dataset.roomName)
    .then(response => response.json())
    .then(newRoomLog => {
      if (newRoomLog.length !== roomLog.length) {
        roomLog = newRoomLog
        drawRoomLog()
      }
    })
}

setInterval(updateRoomLog, 1000)
