import bip39 from 'bip39-light';
//import EthjsWallet from 'ethereumjs-wallet';
import EthjsWallet, { hdkey as etherHDkey } from 'ethereumjs-wallet';
import { ethers } from 'ethers';

import * as dotenv from 'dotenv';
dotenv.config();

//const myEventHandler = function () {
//  console.log('event emitted');
//}
//eventEmitter.on('scream', myEventHandler);

const endPoint = process.env.MAINNET_RPC_END_POINT || '';

export default class Wallet {

  constructor(
     eventEmitter,
     walletInitData,
  ) {
    this.eventEmitter = eventEmitter;
    this.data = '';
    this.initData = walletInitData;

    // TODO move this into it's own function
    window.walletAPI.keystoreSeedHex((event, keystore) => {
      console.log('xxxxxxxxxxxxxxx keystore xxxxxxxxxxxx', keystore);
    });

    this.setupWallet(walletInitData);
  }

  checkWalletSetup = (message) => {
    if (this.data.address) {
      return true;
    } else {
      return false;
    }
  }

  setupWallet = async (message) => {
    const mnemonic = message || await bip39.generateMnemonic();
    const seedHex = bip39.mnemonicToSeedHex(mnemonic);
    const HDwallet = etherHDkey.fromMasterSeed(seedHex);
    const zeroWallet = HDwallet.derivePath("m/44'/60'/0'/0/0").getWallet();
    const address = zeroWallet.getAddressString();
    const addressCheckSum = zeroWallet.getChecksumAddressString();
    const keystore = this.seedHexToKeystore(seedHex, '_password');
    this.data = {
      address: zeroWallet.getAddressString(),
      addressCheckSum,
      mnemonic: mnemonic,
      privateKey: zeroWallet.getPrivateKeyString(),
      publicKey: zeroWallet.getPublicKeyString(),
    };
    console.log('save data', this.data);

    this.ethersData = await this.setupEthers();
    console.log('this wallet.js:', this.ethersData.provider);
    this.eventEmitter.emit('wallet provider setup done', this);
    //console.log('this wallet.js:', await this.getNetwork());
    // console.log('this.setupEthers', this.ethersData);

    /*
    console.log('this.ethersData', this.ethersData);
    alert('ethers data loaded see console');
    //alert(`mnemonic: ${mnemonic}`);
    //alert(`seedHex: ${seedHex}`);
    //alert(`seedHex: ${seedHex}`);
    console.log('wallet data:', this.data);
    alert(JSON.stringify(this.data));
    */
  }

  setupEthers = async (data) => {
    if (endPoint === '') {
      throw({
        error: 'no endPoint set',
      });
    }
    const provider = new ethers.providers.JsonRpcProvider(endPoint);
    const wallet = new ethers.Wallet(this.data.privateKey);
    //const currentBlock = await provider.getBlockNumber();
    //console.log('currentBlock:', currentBlock);
    //alert(currentBlock);
    
    return {
      ethers,
      //latestBlock: currentBlock,
      provider,
      wallet,
    };
  }

  getNetwork = async () => {
    return await this.ethersData.provider.getNetwork();
  }

  getAddress = () => {
    return this.wallet.data.addressCheckSum;
  }

  // TODO debug this and check it works okay
  recoverSeedHexFromKeystore = async (_password) => {
    const password = _password;
    const resPkey0 = await EthjsWallet.fromV3(this.data.keystore0, password);
    const resPkey1 = await EthjsWallet.fromV3(this.data.keystore1, password);
    // console.log(_pkeySeed);
    const seedHex = resPkey0.privateKey.toString('hex') + resPkey1.privateKey.toString('hex');
    const HDwallet = hdkey.fromMasterSeed(seedHex);
    const zeroWallet = HDwallet.derivePath("m/44'/60'/0'/0/0").getWallet();
    const address = zeroWallet.getAddressString();
    const addressCheckSum = zeroWallet.getChecksumAddressString();
    console.log(addressCheckSum);
  }

  seedHexToKeystore = async (_pkeySeed, _password) => {
    try {
      const pkey0 = _pkeySeed.substr(0, (_pkeySeed.length / 2));
      const pkey1 = _pkeySeed.substr((_pkeySeed.length / 2));
      const password = _password;
      const keystore0 = await this.pkeyV3(pkey0, password);
      const keystore1 = await this.pkeyV3(pkey1, password);
      //this.data.keystore0 = keystore0;
      //this.data.keystore1 = keystore1;
      const keystore = [
        keystore0,
        keystore1,
      ];
      this.data.keystore = keystore;
console.log('xxxxxxxxxxxxxxxxxxxxxx', window.walletAPI.saveKeystoreData);
      window.walletAPI.saveKeystoreData(this.data.keystore);
    }
    catch (err) {
      console.log('seedHexToKeystore err:', err);
    }
  }

  pkeyV3 = async (_pkey, _password) => {
    try {
      const key = Buffer.from(_pkey, 'hex');
      const wallet = EthjsWallet.fromPrivateKey(key);
      return await wallet.toV3(_password);
    }
    catch (err) {
      console.log('pkeyV3 err:', err);
    }
  }
}
