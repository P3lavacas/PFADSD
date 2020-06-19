const http = require('http');
const path = require('path');

const express = require('express');
const socketIO = require('socket.io');

const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketIO.listen(server);

//db connection
mongoose.connect('mongodb://localhost/chat-database', {useNewUrlParser: true, useUnifiedTopology: true})
.then(db => console.log('db is connected'))
.catch(err => console.log(err));

//ajustes
app.set('port', process.env.PORT || 3000)

//mandar llamar sockets desde otro archivo
require('./sockets')(io);

//mandar arcjivos estaticos
app.use(express.static(path.join(__dirname,'public')));

// inicializando el sevidor
server.listen(app.get('port'), () =>{
  console.log("Servidor encendido en el puerto:" + app.get('port'));
});
