'use strict';

const btn = document.getElementById('btn');
const divResult = document.getElementById('result');
const userList = document.getElementById('userList');
const loadUserList = document.getElementById('loadUserList');

btn.addEventListener('click', () => {
  const name = document.getElementById('name').value;
  const surname = document.getElementById('surname').value;
  const ns = `${name} ${surname}`;

  fetch('script.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ns: ns
    })
  })
  .then(res => res.json())
  .then(data => {
    divResult.innerHTML = data.validate;
  })
  .catch(err => console.log('ERROR write: ' + err));
});

loadUserList.addEventListener('click', () => {
  userList.innerHTML = '';

  fetch('script.php')
  .then(res => res.json())
  .then(users => {
    users.forEach(user => {
      const li = createTagLi(user);
      userList.appendChild(li);
    });
  });
});

function createTagLi(text) {
  const li = document.createElement('li');
  li.innerHTML = text;

  return li;
}