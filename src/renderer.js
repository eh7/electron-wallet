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
//import {
//        greet,
//        default as init
//} from '../static/pkg/hello_wasm.js';
//import { remote } from 'electron';
/*
async function run() {
  //await init('./static/pkg/wasm_bindgen_minimal_example_bg.wasm');
  await init('../static/pkg/hello_wasm_bg.wasm');
//console.log('ddddddddddddddddddddddddddddddd');
//  const result = greet('test 321 from run function');
  //console.log(`greet = ${result}`);
  //if (result !== 3) {
  //  throw new Error("wasm addition doesn't work!");
  //}
}
*/
import init, { greet, greet2 } from "../static/pkg/hello_wasm.js";
//require('../static/pkg/hello_wasm.js');
const setButtonHWA = document.getElementById('hwa');
setButtonHWA.addEventListener('click', async () => {
    window.electronAPI.wasmHelloAlert();
    alert('call-hello-alert-wasm in renderer');
    await init('../static/pkg/hello_wasm_bg.wasm');
    greet('xyz');
});
//# sourceMappingURL=renderer.js.map
