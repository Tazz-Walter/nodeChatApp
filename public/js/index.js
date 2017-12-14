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

socket.on('newLocationMessage', function (message) {
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>');
  //para prevenir q injecten codigo malicioso conviene insertar de esta manera
  li.text(`${message.from}`);
  a.attr('href',message.url);
  li.append(a);
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

var locationButton = jQuery('#sendLocation');
// var output = jQuery("#out");
// var paragraphLoc= jQuery('#paragraphLocation');

locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', {
      latitud: position.coords.latitude,
      longitud: position. coords.longitude
    });
    // var img = new Image();
    // img.src = "http://maps.googleapis.com/maps/api/staticmap?center=" + position.coords.latitude + "," + position. coords.longitude + "&zoom=13&size=300x300&sensor=false";
    // output.append(img);
  }, function () {
    alert('Unable to fetch location.');
  });
});
