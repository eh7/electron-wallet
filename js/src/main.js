const path = require('path');

const electron = require('electron'),
app = electron.app,
BrowserWindow = electron.BrowserWindow,
ipcMain = electron.ipcMain,
dialog = electron.dialog,
Menu = electron.Menu;

// stop the error I was getting 
// see: https://github.com/electron/electron/issues/32760
app.commandLine.appendSwitch('ignore-gpu-blacklist');
app.commandLine.appendSwitch('disable-gpu');
app.commandLine.appendSwitch('disable-gpu-compositing');

const wallet = require('./services/wallet');

//const hello_wasm = require('./pkg/hello_wasm.js');

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    }
  });
  mainWindow.loadURL('file://'+__dirname+'/../index.html')
  mainWindow.on('closed', function () {
    mainWindow = null
  })

  mainWindow.webContents.openDevTools();

  ipcMain.on('set-title', (event, title) => {
    const webContents = event.sender;
    const win = BrowserWindow.fromWebContents(webContents);
    win.setTitle(title);
    console.log('set-title', title);
  })

  ipcMain.on('walletInitMain', (event, message) => {
    console.log('walletInitMain:', message);
    console.log(wallet.getWalletData(message));
  });
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
