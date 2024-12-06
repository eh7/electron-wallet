"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
//import bip39-light from 'bip39-light'
var bip39_light_1 = require("bip39-light");
var ethereumjs_wallet_1 = require("ethereumjs-wallet");
//console.log({ bip39Light });
var Wallet = /** @class */ (function () {
    function Wallet() {
        var _this = this;
        this.walletPath = 'm/44\'/60\'/0\'/0/0';
        this.walletInit = function () {
            var mnemonic = bip39_light_1.default.generateMnemonic();
            var seedHex = bip39_light_1.default.mnemonicToSeedHex(mnemonic);
            var HDwallet = ethereumjs_wallet_1.hdkey.fromMasterSeed(seedHex);
            var zeroWallet = HDwallet.derivePath(_this.walletPath).getWallet();
            var data = {
                address: zeroWallet.getAddressString(),
                mnemonic: mnemonic,
                privateKey: zeroWallet.getPrivateKeyString(),
                publicKey: zeroWallet.getPublicKeyString(),
            };
            //console.log(mnemonic);
            //console.log(seedHex);
            //console.log(data);
            return data;
        };
    }
    return Wallet;
}());
exports.Wallet = Wallet;
var wallet = new Wallet();
console.log(wallet.walletInit());
