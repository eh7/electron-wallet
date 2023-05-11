// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector: string, text: string) => {
    const element = document.getElementById(selector);
    if (element) {
      element.innerText = text;
    }
  };

  for (const type of ["chrome", "node", "electron"]) {
    replaceText(`${type}-version`, process.versions[type as keyof NodeJS.ProcessVersions]);
  }
});

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping'),
  // we can also expose variables, not just functions
})

contextBridge.exposeInMainWorld('myAPI', {
  desktop: true,
})

//import { remote } from 'electron';

// IPC 1 way example - setTitle, wasmHelloAlert
// IPC 2 way example - openFile
contextBridge.exposeInMainWorld('electronAPI', {
  setTitle: (title) => ipcRenderer.send('set-title', title),
  wasmHelloAlert: (title) => ipcRenderer.send('call-hello-alert-wasm'),
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  sendMessageToMain: (message) => ipcRenderer.invoke('messageFromUser', message),
});

contextBridge.exposeInMainWorld('walletAPI', {
  walletInit: () => ipcRenderer.send('walletInitMain', 'init from renderer'),
  walletUpdate: (data) => ipcRenderer.invoke('walletData:update', data),
  //handleWalletPubKey: (callback) => ipcRenderer.on('walletPubKey', callback),
  //walletPubKey: (message) => ipcRenderer.invoke('walletPubKeyOkay', message),
});

/*
contextBridge.exposeInMainWorld('electronAPI', {
  openFile: () => ipcRenderer.invoke('dialog:openFile')
})
*/
