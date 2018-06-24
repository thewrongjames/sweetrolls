const openRoom = () => { // eslint-disable-line no-unused-vars
  const roomNameField = document.getElementById('roomNameField')
  const roomName = roomNameField.value.replace(/(\/|\\)/g, '')
  if (!roomName) {
    document.getElementById('noRoomNameWarning').classList.remove('hidden')
    return
  }
  window.location.assign('/' + roomName)
}
