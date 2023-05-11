const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  setTitle: (title) => ipcRenderer.send('set-title', title),
});

contextBridge.exposeInMainWorld('walletAPI', {
  walletInit: () => ipcRenderer.send('walletInitMain', 'init from renderer'),
});
