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

interface Callback {
  (): void;
}

contextBridge.exposeInMainWorld('electronAPI', {
  setTitle: (title: string) => ipcRenderer.send('set-title', title),
});

contextBridge.exposeInMainWorld('authAPI', {
  checkPasswordSet: () => ipcRenderer.send('checkPasswordSet'),
  checkPasswordSetResult: (callback: Callback) => ipcRenderer.on('checkPasswordSetResult', callback),
  auth: (password: string) => ipcRenderer.send('auth', password),
  handleAuthResult: (callback: Callback) => ipcRenderer.on('authResult', callback),
});

contextBridge.exposeInMainWorld('walletAPI', {
  auth: (password: string) => ipcRenderer.send('auth', password),
  handleAuthResult: (callback: Callback) => ipcRenderer.on('authResult', callback),
  getWalletData: () => ipcRenderer.send('getWalletData'),
  walletInit: (data: object) => ipcRenderer.send('walletInitMain', data),
  walletUpdate: (data: object) => ipcRenderer.invoke('walletData:update', data),
  handleWalletData: (callback: Callback) => ipcRenderer.on('walletData', callback),
  walletBalance: (address: string) => ipcRenderer.send('walletBalance', address),
  walletBlockNumber: () => ipcRenderer.send('walletBlockNumber'),
  handleWalletBlockNumber: (callback: Callback) => ipcRenderer.on('walletBlockNumber', callback),
  handleWalletBalance: (callback: Callback) => ipcRenderer.on('walletBalance', callback),
  showDevTools: () => ipcRenderer.send('showDevTools'),
  getPhrase: () => ipcRenderer.send('getPhrase'),
  walletPhrase: (callback: Callback) => ipcRenderer.on('walletPhrase', callback),
  saveWalletData: (data: object) => ipcRenderer.send('saveWalletData', data),
  saveKeystoreData: (data: object) => ipcRenderer.send('saveKeystoreData', data),
  getKeystoreSeedHex: () => ipcRenderer.send('getKeystoreSeedHex'),
  keystoreSeedHex: (callback: Callback) => ipcRenderer.on('keystoreSeedHex', callback),
  walletData: (callback: Callback) => ipcRenderer.on('walletData', callback),
  testing: (data: string) => alert('data: ' + data),
});
