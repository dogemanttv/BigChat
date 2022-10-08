const app = require('express')();
const http = require('http').Server(app);
const port = process.env.PORT || 80;
const io = require('socket.io')(http);
const cookieParser = require('cookie-parser');
var name1234;
app.use(cookieParser());
//Pages
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.get('/home', (req, res) => {
  res.sendFile(__dirname + '/home.html');
});
app.get('/chat/public', (req, res) => {
  res.sendFile(__dirname + '/publicchat.html');
});
app.get('/chat/private/*', (req, res) => {
  res.sendFile(__dirname + '/privatechat.html');
});
app.get('/chat/startprivatechat', (req, res) => {
  res.sendFile(__dirname + '/startprivatechat.html');
})
app.get('/admin', (req, res) => {
  if (req.cookies['admin'] !== 'true') {
    res.sendFile(__dirname + '/418.html');
    return false;
  }
  res.sendFile(__dirname + '/admin.html');
})
//CSS & JS Files
app.get('/index.css', (req, res) => {
  res.sendFile(__dirname + '/index.css');
});
app.get('/publicchat.js', (req, res) => {
  res.sendFile(__dirname + '/publicchat.js');
});
app.get('/privatechat.js', (req, res) => {
  res.sendFile(__dirname + '/privatechat.js');
});
app.get('/spc.js', (req, res) => {
  res.sendFile(__dirname + '/spc.js');
});
app.get('/admin.js', (req, res) => {
  res.sendFile(__dirname + '/admin.js');
});
//Images
app.get('/peopleicon.svg', (req, res) => {
  res.sendFile(__dirname + '/peopleicon.svg');
});
app.get('/chaticon.svg', (req, res) => {
  res.sendFile(__dirname + '/chaticon.svg');
});
app.get('/homeicon.svg', (req, res) => {
  res.sendFile(__dirname + '/homeicon.svg');
});
app.get('/nameicon.svg', (req, res) => {
  res.sendFile(__dirname + '/nameicon.svg');
});
app.get('/404.svg', (req, res) => {
  res.sendFile(__dirname + '/404.svg');
});
app.get('/trollface.svg', (req, res) => {
  res.sendFile(__dirname + '/trollface.svg');
});
app.get('/rickroll.mp4', (req, res) => {
  res.sendFile(__dirname + '/rickroll.mp4');
});
app.get('/rickroll.mp3', (req, res) => {
  res.sendFile(__dirname + '/rickroll.mp3');
});
//Socket.io
io.on('connection', (socket) => {
  socket.on('public chat name', msg => {
    name1234 = msg
  });
  socket.on('public chat', msg => {
    io.emit('public chat message link', '<a href="/chat/private/' + name1234 + '">' + name1234 + ': ' + '</a>')
    io.emit('public chat', msg);
  });
  socket.on('privatechat', msg => {
    messageinfo = msg.split('‎')
    //messageinfo[(0, 1, 2)]
    //0 = username
    //1 = message
    //2 = person who the message is for
    console.log(msg)
    io.emit(messageinfo[2], messageinfo[0] + '‎' + messageinfo[1])
    //Emits to person message is for
    //also do regex stuff client-side
  })
  socket.on('kickUser', msg => {
    console.log(msg)
    io.emit('KickUser', msg)
  })
  socket.on('rickrollUser', msg => {
    console.log(msg)
    io.emit('RickRollUser', msg)
  })
  socket.on('customjsUser', msg => {
    console.log(msg)
    io.emit('CustomJSUser', msg)
  })
});
app.use((req, res, next) => {
  res.status(404).sendFile(__dirname + '/404.html');
})

http.listen(port, () => {
  console.log(`running on port ${port}`);
});
