//const socket = io();
$(function(){
  const socket = io();

//obteniendo Dom elements form interface
const $messageForm = $('#message-form');
const $messageBox = $('#message');
const $chat = $('#chat');

//Obtener elementos del nickname form
const $nickForm = $('#nickForm');
const $catForm = $('#CatForm');
const $niError = $('#nickError');
const $nickName = $('#nickName');

const $users = $('#usernames');

$nickForm.submit(e => {
  e.preventDefault();
  socket.emit('new user',$nickName.val(), data => {
    if(data){
      $('#nickWrap').hide();
      $('#Catalogo').show();
    }else{
      $nickerror.html(`
        <div class="alert aler-danger">
        Usuario ya existe.
        </div>
        `);
    }
    $nickName.val('');
  });
});

$catForm.submit(e => {
  e.preventDefault();
  $('#Catalogo').hide();
  $('#contentWrap').show();
});

//eventos
$messageForm.submit(e => {
  e.preventDefault();
  socket.emit('send message', $messageBox.val(), data =>{
    $chat.append(`<p class="error">${data}</p>`)
  });
  $messageBox.val('');
});
socket.on('new message', function(data){
  displayMsg(data);
});

socket.on('usernames', data => {
  let html = '';
  for(let i = 0; i < data.length; i++){
    html += `<p> <i class="fas fa-user"></i>
    ${data[i]}</p>`
  }
  $users.html(html);
});

socket.on('whisper', data => {
displayMsg(data);
});

socket.on('load old msgs', data =>{
  for(let i = 0; i < data.length; i++){
    displayMsg(data[i]);
  }
});

function displayMsg(data){
  $chat.append(`<p class="whisper"><b>${data.nick}: </b> ${data.msg}</p>`);
}

})
