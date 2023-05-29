var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

let walletData = {};

const ping = () => __awaiter(this, void 0, void 0, function* () {
    const response = yield window.versions.ping();
    console.log('XXXXXXXXXXXXXXXXXX', response); // prints out 'pong'
});
ping();

console.log(window.myAPI);
const setButton = document.getElementById('btn');
const titleInput = document.getElementById('title');
setButton.addEventListener('click', () => {
    if (titleInput != null) {
        const title = titleInput.value;
        window.electronAPI.setTitle(title);
    }
});

// IPC 1 way example with wasm call
import init, { greet, greet2 } from "../static/pkg/hello_wasm.js";
//require('../static/pkg/hello_wasm.js');
//
const greetButton = document.getElementById('greet');
const greet2Button = document.getElementById('greet2');

async function initHelloWasm () { 
  await init('../static/pkg/hello_wasm_bg.wasm');
}
initHelloWasm();

greetButton.addEventListener('click', () => {
  //await init('../static/pkg/hello_wasm_bg.wasm');
  greet('xyz greet');
});

greet2Button.addEventListener('click', () => {
  //await init('../static/pkg/hello_wasm_bg.wasm');
  greet2('abc greet2');
});

const setButtonHWA = document.getElementById('hwa');
setButtonHWA.addEventListener('click', async () => {
    window.electronAPI.wasmHelloAlert();
    alert('call-hello-alert-wasm in renderer');
    await init('../static/pkg/hello_wasm_bg.wasm');
    greet('xyz');
});

// IPC 2 way example
console.log('btn2 setup');
const message = document.getElementById('message')
const btn2 = document.getElementById('btn2')
console.log('btn2 setup');
const filePathElement = document.getElementById('filePath')
console.log('btn2 setup');
btn2.addEventListener('click', async () => {
  console.log('btn2 clicked');
  window.electronAPI.sendMessageToMain(message.value);
  window.walletAPI.walletUpdate({
    pubKey: 'pubKeyData',
  });

  window.walletAPI.walletPubKeyOkay({
    pubkey: 'walletPubKeyOkay',
  });

  //const filePath = await window.electronAPI.openFile()
  //filePathElement.innerText = filePath
})
console.log('btn2 setup');

async function walletInit() {
  // window.walletAPI.walletInit();
  console.log('sentWalletInit', window.walletAPI.walletInit(
    'huge mansion obscure weasel mix submit ripple attack then fade spoil picnic'
  ));
}
walletInit();

const walletAddressDiv = document.getElementById('walletAddress');
const blockNumberDiv = document.getElementById('blockNumber');
const showDevToolsButton = document.getElementById('showDevTools');

window.walletAPI.handleWalletData((event, data) => {
  console.log('walletData from main:', data);
  walletData = data;
  walletAddressDiv.innerHTML = "<h3>Wallet Address: <b>" + data.addressCheckSum + "</b></h3>";
});

showDevToolsButton.addEventListener('click', (event) => {
  //event.sender.send('', value);
  window.walletAPI.showDevTools();
  console.log('showDevToolsButton clicked');
});

const balanceButton = document.getElementById('balance');
balanceButton.addEventListener('click', async (event) => {
  const block = window.walletAPI.walletBalance(
    walletData.addressCheckSum
  );
  console.log('balanceButton clicked - for address: ', walletData.addressCheckSum);
  walletAddressDiv.innerHTML = "<h3>Wallet Address: <b>" + 
    walletData.addressCheckSum +
    "</b></h3>" +
    "<h3>Block Number: <b>" +
    walletData.block +
    "</b></h3>" +
    "<h3>Balance: <b>...</b>";
});
window.walletAPI.handleWalletBalance((event, balance) => {
  console.log('handleWalletBalance', balance);
  walletData.balance = balance;
  walletAddressDiv.innerHTML = "<h3>Wallet Address: <b>" + 
    walletData.addressCheckSum +
    "</b></h3>" +
    "<h3>Block Number: <b>" +
    walletData.block +
    "</b></h3>" +
    "<h3>Balance: <b>" +
    walletData.balance +
    "</b>";
});

const blockNumberButton = document.getElementById('blockNumber');
blockNumberButton.addEventListener('click', async (event) => {
  //event.sender.send('walletBlockNumber', value);
  const block = window.walletAPI.walletBlockNumber();
  console.log('blockNumberButton clicked - blockNo.: ', block);
  let img = document.createElement("img");
  img.src = './images/Loading_icon.gif'; 
  // document.body.appendChild(img)
  walletAddressDiv.innerHTML = "<h3>Wallet Address: <b>" + walletData.addressCheckSum + "</b></h3>" + "<h3>Block Number: <b>...</b></h3>";
});
window.walletAPI.handleWalletBlockNumber((event, block) => {
  console.log('handleWalletBlockNumber', block);
  walletData.block = block;
  // walletAddressDiv.innerHTML = "<h3>Block Number: <b>" + block + "</b></h3>";
  walletAddressDiv.innerHTML = "<h3>Wallet Address: <b>" + walletData.addressCheckSum + "</b></h3>" + "<h3>Block Number: <b>" + block + "</b></h3>";
});

const appIndexButton = document.getElementById('appIndex');
const appWalletButton = document.getElementById('appWallet');
appIndexButton.addEventListener('click', async (event) => {
  location.href = "./index.html";
  console.log('appIndex');
});
appWalletButton.addEventListener('click', async (event) => {
  location.href = "./wallet.html";
  console.log('appButton');
});

//console.log('sentWalletInit', window.walletAPI.walletInit(
window.walletAPI.keystoreSeedHex((event, keystore) => {
  //console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', keystore);
  if (typeof keystore !== 'undefined' && Object.keys(keystore).length === 2) {
    console.log('keystore set OKAY');
  } else {
    console.log('keystore NOT set redirect wallet setup app');
    //window.location.href = './apps/reactWallet/index.html';
//    window.location.href = './apps/setupWallet/index.html';
  }
});
console.log('request keystoreSeedHex', window.walletAPI.getKeystoreSeedHex());

//# sourceMappingURL=renderer.js.map
