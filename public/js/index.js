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
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    text: message.text,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
  // console.log('new Message.', message);
  // forma vieja de mostrar la info sin mustache
  // var formattedTime = moment(message.createdAt).format('h:mm a');
  // var li = jQuery('<li></li>');
  // li.text(`${message.from} ${formattedTime}: ${message.text}`);
  // jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    text: message.text,
    url: message.url,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
  // var li = jQuery('<li></li>');
  // var a = jQuery('<a target="_blank">My current location</a>');
  // var formattedTime = moment(message.createdAt).format('h:mm a');
  // //para prevenir q injecten codigo malicioso conviene insertar de esta manera
  // li.text(`${message.from} ${formattedTime}: `);
  // a.attr('href',message.url);
  // li.append(a);
  // jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (event) {
  event.preventDefault();
  var messageTextBox = jQuery('[name=message]');
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, function () {
    messageTextBox.val('');
  });

});

var locationButton = jQuery('#sendLocation');
// var output = jQuery("#out");
// var paragraphLoc= jQuery('#paragraphLocation');

locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }
  locationButton.attr('disable', 'disable').text('Enviando Direccion...');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disable').text('Mandar mi Ubicacion');
    socket.emit('createLocationMessage', {
      latitud: position.coords.latitude,
      longitud: position. coords.longitude
    });
    // var img = new Image();
    // img.src = "http://maps.googleapis.com/maps/api/staticmap?center=" + position.coords.latitude + "," + position. coords.longitude + "&zoom=13&size=300x300&sensor=false";
    // output.append(img);
  }, function () {
    alert('Unable to fetch location.');
    locationButton.removeAttr('disable').text('Mandar mi Ubicacion');
  });
});
