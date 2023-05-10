import {
  app,
  BrowserWindow,
  ipcMain,
  dialog,
  Menu,
} from "electron";
import * as path from "path";

//const elec = require('electron')
//console.log(elec);

// IPC 2 way example function
async function handleFileOpen () {
  console.log('handleFileOpen');
  const { canceled, filePaths } = await dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] });
  if (canceled) {

  } else {
    return filePaths[0]
  }
}

async function handleWalletData (event, data) {
  console.log('handleWalletData', data);
}

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    width: 800,
  });

  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        {
          click: () => mainWindow.webContents.send('walletPubKey', { pubkey: 'newPubKey' }),
          label: 'PubKey',
        }
      ]
    }
  ]);
  Menu.setApplicationMenu(menu);

  ipcMain.handle('ping', () => 'pong');

  ipcMain.handle('walletData:update', handleWalletData);

  ipcMain.handle('messageFromUser', (event, message) => {
    console.log(message);
  });

  // IPC 1 way example
  ipcMain.on('set-title', (event, title) => {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win.setTitle(title)
  });
  
  ipcMain.on('call-hello-alert-wasm', () => {
    console.log('call-hello-alert-wasm');
    //let imp = import('../static/pkg/hello_wasm.js');
    //alert('call-hello-alert-wasm');
    //import('../static/pkg/hello_wasm')
    //.then((hello_wasm) => {
    //  console.log('then');
    //}).catch((error) => {
    //  console.log('then', error);
    //});
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "../static/index.html"));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  ipcMain.on('walletPubKeyOkay', (_event, value) => {
    // console.log('walletPubKeyOkay', value) // will print value to Node console
  })


  console.log(1);
  console.log(mainWindow.webContents.send('walletPubKey', { pubkey: 'newPubKey' }));
  console.log(2);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // IPC 2 way example
  ipcMain.handle('dialog:openFile', handleFileOpen);

  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

// Attach listener in the main process with the given ID
ipcMain.on('request-mainprocess-action', (event, arg) => {
  // Displays the object sent from the renderer process:
  //{
  //    message: "Hi",
  //    someData: "Let's go"
  //}
  console.log(
    arg
  );
});
