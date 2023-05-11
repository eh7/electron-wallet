/*
 * import {
  app,
  BrowserWindow,
  ipcMain,
  dialog,
  Menu,
} from "electron";
import * as path from "path";

import bip39 from 'bip39-light';
import etherHDkey from 'ethereumjs-wallet';
*/

const electron = require('electron'),
app = electron.app,
BrowserWindow = electron.BrowserWindow,
ipcMain = electron.ipcMain,
dialog = electron.dialog,
Menu = electron.Menu;

let mainWindow;

var bip39 = require('bip39-light');
const etherHDkey = require('ethereumjs-wallet').hdkey;
const ethUtil = require('ethereumjs-util');

function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600})
  mainWindow.loadURL('file://'+__dirname+'/../index.html')
  mainWindow.on('closed', function () {
    mainWindow = null
  })

  ipcMain.on('set-title', (event, title) => {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win.setTitle(title)
  })
}

app.on('ready', createWindow)
app.on('window-all-closed', function () {
 if (process.platform !== 'darwin') {
  app.quit()
 }
})

app.on('activate', function () {
 if (mainWindow === null) {
  createWindow()
 }
})
