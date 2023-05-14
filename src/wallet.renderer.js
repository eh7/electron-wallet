var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

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
  // 'huge mansion obscure weasel mix submit ripple attack then fade spoil picnic'
  console.log('sentWalletInit', window.walletAPI.walletInit(
  ));
}
walletInit();

const walletAddressDiv = document.getElementById('walletAddress');
const blockNumberDiv = document.getElementById('blockNumber');
const showDevToolsButton = document.getElementById('showDevTools');

window.walletAPI.handleWalletData((event, data) => {
  console.log('walletData from main:', data);
  walletAddressDiv.innerHTML = "<h3>Wallet Address: <b>" + data.address + "</b></h3>";
});

showDevToolsButton.addEventListener('click', (event) => {
  //event.sender.send('', value);
  window.walletAPI.showDevTools();
  console.log('showDevToolsButton clicked');
});


const blockNumberButton = document.getElementById('blockNumber');
blockNumberButton.addEventListener('click', async (event) => {
  //event.sender.send('walletBlockNumber', value);
  const block = window.walletAPI.walletBlockNumber();
  console.log('blockNumberButton clicked - blockNo.: ', block);
});
window.walletAPI.handleWalletBlockNumber((event, block) => {
  console.log('handleWalletBlockNumber', block);
  walletAddressDiv.innerHTML = "<h3>Block Number: <b>" + block + "</b></h3>";
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

//# sourceMappingURL=renderer.js.map
