const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname + './../public');
const port = process.env.PORT || 3000;
const {generateMessage, generateLocationMessage} = require('./utils/message');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));
//nos permite estar escuchando al cliente

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat App'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user Joined!'));

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));

    //acknowledgements aloud the request listener to send something back to the request emitter
    callback('this is from the server.');
    //emite para todos menos para mi en el navegador
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //    createdAt: new Date().getTime()
    // });
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitud, coords.longitud));
  });

  socket.on('disconnect', () => {
    console.log('User Disconnected ');
    socket.broadcast.emit('newMessage',{
      from: 'Admin',
      text: 'One user has left the Room',
      createdAt: new Date().getTime()
    });
  });
});

server.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
