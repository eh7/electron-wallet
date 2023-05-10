const
ipc      = require('electron').ipcRenderer,

syncBtn  = document.querySelector('#syncBtn'),
asyncBtn = document.querySelector('#asyncBtn');

let replyDiv = document.querySelector('#reply');

syncBtn.addEventListener('click', () => {
 let
 reply = ipc.sendSync('synMessage','A sync message to main');
 replyDiv.innerHTML = reply;
});

asyncBtn.addEventListener('click', () => {
 ipc.send('aSynMessage','A async message to main')
});

ipc.on('asynReply', (event, args) => {
 replyDiv.innerHTML = args;
});

ipc.on('initData', (event, data) => {
  console.log('init data from main:', data);
});

ipc.on('pubKey', (event, args) => {
  let pubKey = args;
  console.log('pubKey event triggered:', pubKey);
});

const pubKey = ipc.send('init','init wallet');
console.log('send init message to main')
