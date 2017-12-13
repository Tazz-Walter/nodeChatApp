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
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (event) {
  event.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function (mje) {
    console.log('ACK! confirmado', mje);
  });

});
