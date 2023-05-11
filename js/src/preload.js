const { contextBridge, ipcRenderer } = require('electron');

//import init, { greet, greet2 } from "../static/pkg/hello_wasm.js";
//const init, { greet, greet2 } = require('./pkg/hello_wasm.js');
//require('hello_wasm');

contextBridge.exposeInMainWorld('electronAPI', {
  setTitle: (title) => ipcRenderer.send('set-title', title),
});

contextBridge.exposeInMainWorld('walletAPI', {
  //require('./pkg/hello_wasm'),
  walletInit: (message) => ipcRenderer.send('walletInitMain', message),
});


/*
import init, { greet, greet2 } from "./src/pkg/hello_wasm.js";
init().then(() => {
  console.log('hello_wasm init okay');
  //greet("WebAssembly GAV");
  //greet2("WebAssembly");
});
*/
