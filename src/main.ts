import {
  app,
  BrowserWindow,
  ipcMain,
  dialog,
  Menu,
  MenuItem,
} from "electron";
import * as path from "path";

//import { createFileRoute, createURLRoute } from 'electron-router-dom';

import * as bip39 from 'bip39-light';
import { hdkey as etherHDkey } from 'ethereumjs-wallet';
//import ethUtil from 'ethereumjs-util';

import * as dotenv from 'dotenv';
dotenv.config()
const endPoint = process.env.MAINNET_RPC_END_POINT || '';

// testing electron store to persist app config data
import * as Store from 'electron-store';
const store = new Store();
//store.set('keystore', []);
//console.log(app.getPath('userData'));
//console.log('keystore:', store.get('keystore'));
let seedKeystore = store.get('keystore');
//console.log('appData store:', store.get('appData')); 

/*
import { ethers } from 'ethers';
*/
let ethers = {};
let ethersData = {};
let provider;
let wallet;

async function ethersGetBalance (ethers, address) {
  const balance = await ethers.provider.getBalance(address);
  console.log('provider.getBalance:', balance.toString())
  let formatedBalance = 0;
  try {
    formatedBalance = ethers.ethers.utils.formatEther(balance.toString());
  }
  catch(err) {
    console.log('ethers.utils.formatEther ERROR:', err);
  }
  return formatedBalance;
  //return balance;
  //return await ethers.provider.getBalance(address);
  //return ethers.utils.formatEther(
  //  await ethers.provider.getBalance(address),
  //);
}

async function ethersGetBlockNo (ethers) {
   return await ethers.provider.getBlockNumber();
}

async function importEthers (data) {
  const { ethers } = await import('ethers');
  const provider = new ethers.providers.JsonRpcProvider(endPoint);
  //console.log(provider);
  //console.log(data);
  const wallet = new ethers.Wallet(data.privateKey);
  //console.log(wallet);
  //const currentBlock = await provider.getBlockNumber();
  //console.log('currentBlock', currentBlock);
  return {
    ethers,
    //latestBlock: currentBlock,
    provider,
    wallet,
  };
}

const menu = new Menu();

let data = {};
let devTools = false;

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

function openDevTools (mainWindow) {
  mainWindow.webContents.openDevTools();
  devTools = true;
}

function closeDevTools (mainWindow) {
  mainWindow.webContents.closeDevTools();
  devTools = false;
}

function toggleDevTools (mainWindow) {
  mainWindow.webContents.toggleDevTools();
  (devTools) ? devTools = false : devTools = true;
}

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      //contextIsolation: false,
    },
    width: 800,
  });

  //console.log(__dirname);
  //const devServerURL = createURLRoute(process.env['ELECTRON_RENDERER_URL']!, id);
  //const devServerURL = createURLRoute(__dirname!, 'main');
  //mainWindow.loadURL(devServerURL)

  // create bepoke menu options
  let defaultMenu = Menu.getApplicationMenu();
  defaultMenu.append(new MenuItem({
    label: 'Dev Tools',
    submenu: [
      {
        label: 'open',
        accelerator: 'CommandOrControl+Shift+I',
        click: () => openDevTools(mainWindow),
      },
      {
        label: 'close',
        accelerator: 'CommandOrControl+Shift+O',
        click: () => closeDevTools(mainWindow),
      },
      {
        label: 'toggle',
        accelerator: 'CommandOrControl+Shift+T',
        click: () => toggleDevTools(mainWindow),
      },
    ]
  }));
  Menu.setApplicationMenu(defaultMenu);
  // console.log('currentApp defaultMenu', defaultMenu);

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

  ipcMain.on('walletBalance', async (event, address) => {
    console.log('getting walletBalance:', address);
    const balance = await ethersGetBalance(
      ethersData,
      address,
    );
    console.log('Wallet Balance Address:', address);
    console.log('walletBalance:', balance);
    event.sender.send('walletBalance', balance)
  });

  ipcMain.on('walletBlockNumber', async (event, message) => {
    console.log('getting latest block..:');
    const blockNo = await ethersGetBlockNo(ethersData);
    console.log('latest blockNo.:', blockNo);
    event.sender.send('walletBlockNumber', blockNo)
  });

  //ipcMain.on('walletInitMain', (event, message) => {
  ipcMain.on('walletInitMain', async (event, message) => {
    //console.log('walletInitMain recieved:', event, message);
    //console.log('walletInitMain recieved:', message);
    console.log('walletInitMain recieved:', '');
    const mnemonic = message ||  await bip39.generateMnemonic();
    //const mnemonic = await bip39.generateMnemonic();
    const seedHex = bip39.mnemonicToSeedHex(mnemonic);
    const HDwallet = etherHDkey.fromMasterSeed(seedHex);
    const zeroWallet = HDwallet.derivePath("m/44'/60'/0'/0/0").getWallet();
    const address = zeroWallet.getAddressString();
    const addressCheckSum = zeroWallet.getChecksumAddressString();
    data = {
      address: zeroWallet.getAddressString(),
      addressCheckSum,
      mnemonic: mnemonic,
      privateKey: zeroWallet.getPrivateKeyString(),
      publicKey: zeroWallet.getPublicKeyString(),
    };
    event.sender.send('walletData', data)

    ethersData = await importEthers(data);

    // console.log(data);
    //console.log(
    //  await ethersGetBlockNo(ethersData)
    //);
    //const blockNo = await ethersGetBlockNo();
  });

  ipcMain.on('showDevTools', async (event, message) => {
    //console.log('showDevTools', devTools);
    if (devTools) {
      //console.log('closeDevTools');
      mainWindow.webContents.closeDevTools();
      devTools = false;
    } else {
      //console.log('openDevTools');
      mainWindow.webContents.openDevTools();
      devTools = true;
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "../static/index.html"));

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();

  ipcMain.on('walletPubKeyOkay', (_event, value) => {
    // console.log('walletPubKeyOkay', value) // will print value to Node console
  })

  // console.log(mainWindow.webContents.send('walletPubKey', { pubkey: 'newPubKey' }));

  ipcMain.on('getKeystoreSeedHex', (event) => {
    const keystore = store.get('keystore');
    event.sender.send('keystoreSeedHex', keystore); 
  });

  ipcMain.on('getWalletData', (event) => {
    const data = store.get('data');
    event.sender.send('walletData', data); 
  });

  ipcMain.on('getPhrase', (event) => {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    //event.sender.send('walletPhrase', 'this is an example phrase returned from main')
    event.sender.send('walletPhrase', {
      name: 'name',
      phrase: 'this is an example phrase returned from main',
    });
  });

  ipcMain.on('saveKeystoreData', (event, keystore) => {
    store.set('keystore', keystore);
    const savedKeystore = store.get('keystore');
    //console.log('xxxxxxxxxxxxxx saveKeystoreData main xxxxxxxxxxxxxxxxx', keystore, savedKeystore);
    console.log('xxxxx saveKeystoreData main store.set keystore xxxxx');
  });

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

  if (typeof seedKeystore !== 'undefined' && seedKeystore) {
    if (Object.keys(seedKeystore).length !== 2) {
      console.log('everything loaded :: keystore NOT created -> direct to keystore creation/import app');
      //window.location.href = './apps/reactWallet/index.html';
    } else {
      console.log('everything loaded :: keystore created procced to main app page');
    }
  }
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

