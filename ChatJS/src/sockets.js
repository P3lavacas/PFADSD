const Chat = require('./models/chat');

module.exports = function(io){

let users = {};

io.on('connection',  async socket => {
  console.log("Nuevo usuario conectado");

let messages = await Chat.find({}).limit(16);
socket.emit('load old msgs', messages);

socket.on('new user', (data, cb) => {
  console.log(data);
if(data in users){
  cb(false);
}else{
  cb(true);
  socket.nickname = data;
  users[socket.nickname] = socket;
  updateNicknames()
}
});

  socket.on('send message', async (data, cb) => {

var msg = data.trim();
//determinar tipo de mensaje
if(msg.substr(0, 3) === '/w '){
  msg = msg.substr(3);
  const index = msg.indexOf(' ');
  //determinar usuario receptor
  if(index != -1){
  var name = msg.substring(0, index);
  var msg = msg.substr(index + 1);
  //validar que el nombre existe en la bd
  if(name in users){
    users[name].emit('whisper', {
    msg,
    nick: socket.nickname
  });
}else{
cb('Error! Ingresa un usuario valido');
}
} else{
  cb('Error! Ingresa tu mensaje');
}
} else{

 var newMsg = new Chat({
    msg: data,
    nick: socket.nickname
  });
await newMsg.save();

  io.sockets.emit('new message', {
  msg: data,
  nick: socket.nickname
});
}
  });

socket.on('disconnect', data => {
  if(!socket.nickname) return;
  delete users[socket.nickname];
  updateNicknames()
});

function updateNicknames(){
  io.sockets.emit('usernames', Object.keys(users));
}

});

}
