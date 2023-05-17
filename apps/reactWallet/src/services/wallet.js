import bip39 from 'bip39-light';
import { hdkey as etherHDkey } from 'ethereumjs-wallet';
import { ethers } from 'ethers';

//const myEventHandler = function () {
//  console.log('event emitted');
//}
//eventEmitter.on('scream', myEventHandler);

const endPoint = 'https://mainnet.infura.io/v3/5ad16da394384a8ca868154e1ca744c0';

export default class Wallet {

  constructor(
     eventEmitter,
     walletInitData,
  ) {
    this.eventEmitter = eventEmitter;
    this.data = '';
    this.initData = walletInitData;
    this.setupWallet(walletInitData);
  }

  setupWallet = async (message) => {
    const mnemonic = message || await bip39.generateMnemonic();
    const seedHex = bip39.mnemonicToSeedHex(mnemonic);
    const HDwallet = etherHDkey.fromMasterSeed(seedHex);
    const zeroWallet = HDwallet.derivePath("m/44'/60'/0'/0/0").getWallet();
    const address = zeroWallet.getAddressString();
    const addressCheckSum = zeroWallet.getChecksumAddressString();
    this.data = {
      address: zeroWallet.getAddressString(),
      addressCheckSum,
      mnemonic: mnemonic,
      privateKey: zeroWallet.getPrivateKeyString(),
      publicKey: zeroWallet.getPublicKeyString(),
    };
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
}
