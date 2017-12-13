//io() usamos para iniciar el request, hacemos un request del cliente al servidor
// y mantemos esa conexion abierta
var socket = io();

socket.on('connect', function () {
  console.log('conected to server');

});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  console.log('new Message.', message);
});

socket.emit('createMessage', {
  from: 'index.js Walter',
  text: 'another message'
}, function(data) {
  console.log('Recibido por callback-> ', data);
});
