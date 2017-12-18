const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname + './../public');
const port = process.env.PORT || 3000;
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var usuarios = new Users();


app.use(express.static(publicPath));
//nos permite estar escuchando al cliente

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required.');
    };
    //para adeherirse a un room de chat
    socket.join(params.room);
    //removemos el usuario en caso de q alla alguno con ese id en algun room,
    //evitamos q un mismo usuario este en varios rooms a la vez
    usuarios.removeUser(socket.id);
    //adherimos al arreglo de usuarios los nuevos usuarios q se registran
    usuarios.addUser(socket.id, params.name, params.room);
    //actualizamos lista de usuarios en el room q ahay ingresado
    io.to(params.room).emit('updateUserList', usuarios.getUserList(params.room));

    // socket.leave('developers'); salir del room
    //socket.broadcast.emit -> socket.broadcast.to('developers').emit //para entrar a uno determinado
    //socket.emit
    socket.emit('newMessage', generateMessage('Admin', `${params.name} Bienvenid@ al Chat!`));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} ha ingresado!`));
    callback();
  });

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));

    //acknowledgements aloud the request listener to send something back to the request emitter
    // callback('this is from the server.');
    callback();
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
    var user = usuarios.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUserList', usuarios.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} abandono la conversacion.`));
    }

    // console.log('User Disconnected ');
    // socket.broadcast.emit('newMessage',{
    //   from: 'Admin',
    //   text: 'One user has left the Room',
    //   createdAt: new Date().getTime()
    // });
  });
});

server.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
