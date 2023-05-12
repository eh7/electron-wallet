// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process unless
// nodeIntegration is set to true in webPreferences.
// Use preload.js to selectively enable features
// needed in the renderer process.
//
//
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//const OBJ = require('electron');
//console.log(OBJ)
//const OBJ = require('electron');
//console.log(OBJ)
//import { remote } from 'electron';
//const mainProcess = remote.require('./index.js');
//mainProcess.test();
//declare const window: any;
//declare global {
//  interface Window {
//    api?: any;
//  }
//}
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

//import * as OBJ from 'electron';
//import { ipcRenderer } from "electron";
//console.log('require ipcRender', require('electron'));
//console.log('require ipcRender', require('electron').ipcRenderer);
//
//Object.defineProperty(exports, "__esModule", { value: true });
//var electron_1 = require("electron");
//console.log(electron_1.ipcRenderer);
//
///const ipc = require('electron').ipcRenderer;
//const { app, BrowserWindow } = require('electron')

async function walletInit() {
  // window.walletAPI.walletInit();
  console.log('sentWalletInit', window.walletAPI.walletInit());
}
walletInit();


const walletAddressDiv = document.getElementById('walletAddress');
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

/*
console.log('1 walletAPI.handleWalletPubKey event setup');
window.walletAPI.walletPubKey((event, value) => {
  console.log('2 walletAPI.handleWalletPubKey event setup');
  console.log('handleWalletPubKey');
  //console.log('handleWalletPubKey', value);
  //event.sender.send('walletPubKeyOkay', value);
  //const oldValue = message.innerText; 
  //const newValue = oldValue + value
  //counter.innerText = newValue
  //event.sender.send('counter-value', newValue)
})
console.log('walletAPI.handleWalletPubKey event setup');
*/

//# sourceMappingURL=renderer.js.map
