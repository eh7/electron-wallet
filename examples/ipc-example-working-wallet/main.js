const electron = require('electron'),
app = electron.app,
BrowserWindow = electron.BrowserWindow;

let mainWindow;

//const bip39 = require('bip39');
var bip39 = require('bip39-light');
//var ethers = require('ethers');
//require('ethers');
//const Wallet = require('ethereumjs-wallet').default;
//const etherHDkey = require('ethereumjs-wallet/hdkey').hdkey;
const etherHDkey = require('ethereumjs-wallet').hdkey;
const ethUtil = require('ethereumjs-util');

function createWindow () {
 mainWindow = new BrowserWindow({width: 800, height: 600})
 mainWindow.loadURL('file://'+__dirname+'/index.html')
 mainWindow.on('closed', function () {
  mainWindow = null
 })
}

app.on('ready', createWindow)
app.on('window-all-closed', function () {
 if (process.platform !== 'darwin') {
  app.quit()
 }
})

app.on('activate', function () {
 if (mainWindow === null) {
  createWindow()
 }
})


const ipc = require('electron').ipcMain;
ipc.on('synMessage', (event, args) => {
  console.log(args);
  event.returnValue = 'Main said I received your Sync message';
})

ipc.on('aSynMessage', (event, args) => {
  console.log(args);
  event.sender.send('asynReply','Main said: Async message received')
})

ipc.on('init', (event, args) => {
  const mnemonic = bip39.generateMnemonic();

  const seedHex = bip39.mnemonicToSeedHex(mnemonic);
  const HDwallet = etherHDkey.fromMasterSeed(seedHex);
  const zeroWallet = HDwallet.derivePath("m/44'/60'/0'/0/0").getWallet();
  const data = {
    address: zeroWallet.getAddressString(),
    publicKey: zeroWallet.getAddressString(),
  };
  //console.log(mnemonic)
  //console.log(seedHex)
  //console.log(`Address: ${zeroWallet.getAddressString()}`);
  //console.log(`Private Key: ${zeroWallet.getPrivateKeyString()}`);
  //console.log(`Public Key: ${zeroWallet.getPublicKeyString()}`);
  console.log('initData:', data);

  event.sender.send('initData', data);
})
