var socket = io();
var Admin = {
    kickUsername : document.getElementById('Kickname').value,
    RickRollusername : document.getElementById('RickRollname').value,
    CustomJS : JSON.stringify([document.getElementById('JSname').value, document.getElementById('ActualCustomJS').value])
}
function kick() {
    console.log(document.getElementById('Kickname').value)
    socket.emit('kickUser', document.getElementById('Kickname').value)
}
function RickRoll() {
    socket.emit('rickrollUser', document.getElementById('RickRollname').value)
}
function CustomJS() {
    socket.emit('customjsUser', JSON.stringify([document.getElementById('JSname').value, document.getElementById('ActualCustomJS').value]))
}
/*setTimeout(() => {
    document.getElementById('rickroll').play()
  }, "1000")*/