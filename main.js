'use strict';

loadHistoryChat();

const chat = document.getElementById('chat');
const sendBtn = document.getElementById('send');
const username = document.getElementById('username');

username.disabled = isUsername(username.value);

sendBtn.addEventListener('click', () => {
  const message = document.getElementById('message');

  username.disabled = isUsername(username.value);

  // Отправка на сервер
  fetch('script.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username.value,
      message: message.value
    })
  })
  .then(res => res.json())
  .then(data => loadHistoryChat()) // загружаем историю сообщений
  .catch(err => console.log('ERROR write: ' + err));

  message.value = '';
});

function createTagP(text) {
  const p = document.createElement('p');
  p.className = 'msg';
  p.innerHTML = text;

  return p;
}

function isUsername(username) {
  return username ? true : false;
}

function loadHistoryChat() {
  fetch('script.php')
  .then(res => res.json())
  .then(data => {
    chat.innerHTML = '';

    data.forEach(msg => {
      chat.appendChild(createTagP(msg));
    });

    chat.scrollTop = chat.scrollHeight;
  })
  .catch(err => console.log("ERROR get: " + err));
}