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
import * as Store from 'electron-store';

const store = new Store();
store.set('appData', {});
console.log('appData store:', store.get('appData')); 

/*
import { ethers } from 'ethers';
*/
let ethers = {};
let ethersData = {};
let provider;
let wallet;
const endPoint = 'https://mainnet.infura.io/v3/5ad16da394384a8ca868154e1ca744c0';

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


times in msec
 clock   self+sourced   self:  sourced script
 clock   elapsed:              other lines

000.002  000.002: --- VIM STARTING ---
000.074  000.072: Allocated generic buffers
000.112  000.038: locale set
000.113  000.001: window checked
000.337  000.224: inits 1
000.352  000.015: parsing arguments
000.353  000.001: expanding arguments
000.361  000.008: shell init
000.491  000.130: Termcap init
000.501  000.010: inits 2
000.591  000.090: init highlight
000.786  000.141  000.141: sourcing /usr/share/vim/vim81/debian.vim
000.823  000.212  000.071: sourcing $VIM/vimrc
001.590  000.661  000.661: sourcing /usr/share/vim/vim81/syntax/syncolor.vim
001.718  000.825  000.164: sourcing /usr/share/vim/vim81/syntax/synload.vim
008.826  007.062  007.062: sourcing /usr/share/vim/vim81/filetype.vim
008.869  008.015  000.128: sourcing /usr/share/vim/vim81/syntax/syntax.vim
008.879  008.042  000.027: sourcing $HOME/.vimrc
008.882  000.037: sourcing vimrc file(s)
009.385  000.031  000.031: sourcing /var/lib/vim/addons/plugin/syntastic/autoloclist.vim
009.417  000.013  000.013: sourcing /var/lib/vim/addons/plugin/syntastic/balloons.vim
009.445  000.012  000.012: sourcing /var/lib/vim/addons/plugin/syntastic/checker.vim
009.472  000.012  000.012: sourcing /var/lib/vim/addons/plugin/syntastic/cursor.vim
009.498  000.011  000.011: sourcing /var/lib/vim/addons/plugin/syntastic/highlighting.vim
009.524  000.011  000.011: sourcing /var/lib/vim/addons/plugin/syntastic/loclist.vim
009.550  000.011  000.011: sourcing /var/lib/vim/addons/plugin/syntastic/modemap.vim
009.576  000.011  000.011: sourcing /var/lib/vim/addons/plugin/syntastic/notifiers.vim
009.601  000.011  000.011: sourcing /var/lib/vim/addons/plugin/syntastic/registry.vim
009.628  000.012  000.012: sourcing /var/lib/vim/addons/plugin/syntastic/signs.vim
010.363  000.552  000.552: sourcing /var/lib/vim/addons/autoload/syntastic/util.vim
014.598  000.051  000.051: sourcing /var/lib/vim/addons/plugin/syntastic/autoloclist.vim
014.657  000.044  000.044: sourcing /var/lib/vim/addons/plugin/syntastic/balloons.vim
014.808  000.140  000.140: sourcing /var/lib/vim/addons/plugin/syntastic/checker.vim
014.890  000.068  000.068: sourcing /var/lib/vim/addons/plugin/syntastic/cursor.vim
014.958  000.057  000.057: sourcing /var/lib/vim/addons/plugin/syntastic/highlighting.vim
015.182  000.211  000.211: sourcing /var/lib/vim/addons/plugin/syntastic/loclist.vim
015.257  000.060  000.060: sourcing /var/lib/vim/addons/plugin/syntastic/modemap.vim
015.337  000.062  000.062: sourcing /var/lib/vim/addons/plugin/syntastic/notifiers.vim
015.585  000.234  000.234: sourcing /var/lib/vim/addons/plugin/syntastic/registry.vim
015.662  000.064  000.064: sourcing /var/lib/vim/addons/plugin/syntastic/signs.vim
016.641  006.995  005.452: sourcing /var/lib/vim/addons/plugin/syntastic.vim
016.870  000.064  000.064: sourcing /usr/share/vim/vim81/plugin/getscriptPlugin.vim
017.042  000.160  000.160: sourcing /usr/share/vim/vim81/plugin/gzip.vim
017.260  000.207  000.207: sourcing /usr/share/vim/vim81/plugin/logiPat.vim
017.296  000.024  000.024: sourcing /usr/share/vim/vim81/plugin/manpager.vim
017.516  000.210  000.210: sourcing /usr/share/vim/vim81/plugin/matchparen.vim
017.984  000.456  000.456: sourcing /usr/share/vim/vim81/plugin/netrwPlugin.vim
018.014  000.011  000.011: sourcing /usr/share/vim/vim81/plugin/rrhelper.vim
018.047  000.020  000.020: sourcing /usr/share/vim/vim81/plugin/spellfile.vim
018.181  000.122  000.122: sourcing /usr/share/vim/vim81/plugin/tarPlugin.vim
018.262  000.065  000.065: sourcing /usr/share/vim/vim81/plugin/tohtml.vim
018.432  000.150  000.150: sourcing /usr/share/vim/vim81/plugin/vimballPlugin.vim
018.591  000.133  000.133: sourcing /usr/share/vim/vim81/plugin/zipPlugin.vim
018.595  000.961: loading plugins
018.676  000.081: loading packages
018.695  000.019: loading after plugins
018.703  000.008: inits 3
018.895  000.192: reading viminfo
018.906  000.011: setting raw mode
018.909  000.003: start termcap
018.923  000.014: clearing screen
019.724  000.140  000.140: sourcing /var/lib/vim/addons/autoload/syntastic/log.vim
019.766  000.703: opening buffers
019.953  000.187: BufEnter autocommands
019.954  000.001: editing files in windows
020.097  000.143: VimEnter autocommands
020.098  000.001: before starting main loop
020.288  000.190: first screen update
020.289  000.001: --- VIM STARTED ---
