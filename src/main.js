"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
//import ethUtil from 'ethereumjs-util';
//const elec = require('electron')
//console.log(elec);
// IPC 2 way example function
function handleFileOpen() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, canceled, filePaths;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log('handleFileOpen');
                    return [4 /*yield*/, electron_1.dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] })];
                case 1:
                    _a = _b.sent(), canceled = _a.canceled, filePaths = _a.filePaths;
                    if (canceled) {
                    }
                    else {
                        return [2 /*return*/, filePaths[0]];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function handleWalletData(event, data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log('handleWalletData', data);
            return [2 /*return*/];
        });
    });
}
function createWindow() {
    // Create the browser window.
    var mainWindow = new electron_1.BrowserWindow({
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: true,
            //contextIsolation: false,
        },
        width: 800,
    });
    var menu = electron_1.Menu.buildFromTemplate([
        {
            label: electron_1.app.name,
            submenu: [
                {
                    click: function () { return mainWindow.webContents.send('walletPubKey', { pubkey: 'newPubKey' }); },
                    label: 'PubKey',
                }
            ]
        }
    ]);
    electron_1.Menu.setApplicationMenu(menu);
    electron_1.ipcMain.handle('ping', function () { return 'pong'; });
    electron_1.ipcMain.handle('walletData:update', handleWalletData);
    electron_1.ipcMain.handle('messageFromUser', function (event, message) {
        console.log(message);
    });
    // IPC 1 way example
    electron_1.ipcMain.on('set-title', function (event, title) {
        var webContents = event.sender;
        var win = electron_1.BrowserWindow.fromWebContents(webContents);
        win.setTitle(title);
    });
    electron_1.ipcMain.on('call-hello-alert-wasm', function () {
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
    //ipcMain.on('walletInitMain', (event, message) => {
    electron_1.ipcMain.on('walletInitMain', function (event, message) {
        console.log('mnemonic');
        /*
        const mnemonic = bip39.generateMnemonic();
        const seedHex = bip39.mnemonicToSeedHex(mnemonic);
        //console.log(etherHDkey);
        const HDwallet = etherHDkey.fromMasterSeed(seedHex);
        const zeroWallet = HDwallet.derivePath("m/44'/60'/0'/0/0").getWallet();
        const data = {
          address: zeroWallet.getAddressString(),
          publicKey: zeroWallet.getAddressString(),
        };
        */
        //console.log('walletInitMain recieved:', event, message);
        console.log('walletInitMain recieved:', message);
    });
    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, "../static/index.html"));
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
    electron_1.ipcMain.on('walletPubKeyOkay', function (_event, value) {
        // console.log('walletPubKeyOkay', value) // will print value to Node console
    });
    console.log(1);
    console.log(mainWindow.webContents.send('walletPubKey', { pubkey: 'newPubKey' }));
    console.log(2);
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.whenReady().then(function () {
    // IPC 2 way example
    electron_1.ipcMain.handle('dialog:openFile', handleFileOpen);
    createWindow();
    electron_1.app.on("activate", function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
electron_1.app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
// Attach listener in the main process with the given ID
electron_1.ipcMain.on('request-mainprocess-action', function (event, arg) {
    // Displays the object sent from the renderer process:
    //{
    //    message: "Hi",
    //    someData: "Let's go"
    //}
    console.log(arg);
});
