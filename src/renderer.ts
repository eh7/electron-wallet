// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process unless
// nodeIntegration is set to true in webPreferences.
// Use preload.js to selectively enable features
// needed in the renderer process.

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

const ping = async () => {
  const response = await (window as any).versions.ping();
  console.log('XXXXXXXXXXXXXXXXXX', response); // prints out 'pong'
}

ping();

console.log((window as any).myAPI);

const setButton = document.getElementById('btn') as HTMLInputElement | null;
const titleInput = document.getElementById('title') as HTMLInputElement | null;
setButton.addEventListener('click', () => {
  if (titleInput != null) {
    const title = titleInput.value;
    (window as any).electronAPI.setTitle(title);
  }
});

//import {
//        greet,
//        default as init
//} from '../static/pkg/hello_wasm';

//import { remote } from 'electron';
import init, { greet, greet2 } from "../static/pkg/hello_wasm.js";
//require('../static/pkg/hello_wasm.js');
const setButtonHWA = document.getElementById('hwa') as HTMLInputElement | null;
setButtonHWA.addEventListener('click', () => {
  (window as any).electronAPI.wasmHelloAlert();
  alert('call-hello-alert-wasm in renderer');
});
