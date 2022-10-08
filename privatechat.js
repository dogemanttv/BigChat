var person = window.location.href.split('/').pop(-1)
console.log('Other User: ' + person + '\nYour Username ' + localStorage.getItem('name'))
document.getElementById('name').innerText = person
if (localStorage.getItem('name') == null) {
    localStorage.setItem('name', prompt('Set name.'))
    }
    var socket = io();
    var messages = document.getElementById('messages');
    var form = document.getElementById('form');
    var input = document.getElementById('input');
    
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (input.value) {
          socket.emit('privatechat', localStorage.getItem('name') + '‎' + input.value + '‎' + person)
          var item = document.createElement('p');
          item.innerText = localStorage.getItem('name') + ': ' + input.value;
          messages.appendChild(item);
          window.scrollTo(0, document.body.scrollHeight);
          input.value = '';
        }
      });
      function submit() {
        if (document.getElementById('input').value) {
            socket.emit('privatechat', localStorage.getItem('name') + '‎' + input.value + '‎' + person)
            var item = document.createElement('p');
            item.innerText = localStorage.getItem('name') + ': ' + input.value;
            messages.appendChild(item);
            window.scrollTo(0, document.body.scrollHeight);
            input.value = '';
        }
      }
      socket.on(localStorage.getItem('name'), function(msg) {
        //Recieving Messages
        var item = document.createElement('p');
        messageinfo = msg.split('‎')
        item.innerText = messageinfo[0] + ': ' + messageinfo[1];
        messages.appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
      });