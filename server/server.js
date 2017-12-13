const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname + './../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));
//nos permite estar escuchando al cliente

io.on('connection', (socket) => {
  console.log('New user connected');
  //crreando el evento newEmail
  socket.emit('newMessage', {
    from: 'toropui',
    text: 'Hey. is woltaaa',
    createdAt: 123123
  });

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
  });
  socket.on('disconnect', () => {
    console.log('Disconnected from client');
  });
});

server.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
