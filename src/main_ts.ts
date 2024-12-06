/*
const { BrowserWindow } = require('electron')

const win: BrowserWindow = new BrowserWindow({
  webPreferences: {
    // This is a default since Electron 5.
    nodeIntegration: false,
    // Protect against prototype pollution.
    contextIsolation: true,
    // Disable remote module.
    enableRemoteModule: false,
    // Link to your compiled preload file.
    preload: path.join(__dirname, '../dist/preload_ts.js'),
  },
})

import fs from 'fs'

// ...

// Wait for Electron app to be ready before registering IPC listeners.
app.whenReady().then(() => {
  // Listen to the `read-file` event.
  ipcMain.on('read-file', () => {
    const fileContent = fs.readFileSync('./file-to-read.txt', { encoding: 'utf-8' })

    // Send back an IPC event to the renderer process with the file content.
    event.sender.send('read-file-success', fileContent)
  })
})
*/
