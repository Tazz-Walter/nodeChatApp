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

  socket.on('disconnect', () => {
    console.log('Disconnected from client');
  });

});


// app.get('/', (request, response) => {
//   response.render('index.html');
// });

server.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
