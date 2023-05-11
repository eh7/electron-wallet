const bip39 = require('bip39-light');
const etherHDkey = require('ethereumjs-wallet').hdkey;
const ethUtil = require('ethereumjs-util');

const walletPath = 'm/44\'/60\'/0\'/0/0';

function getData (mnemonic) {
  const seedHex = bip39.mnemonicToSeedHex(mnemonic);
  const HDwallet = etherHDkey.fromMasterSeed(seedHex);
  const zeroWallet = HDwallet.derivePath(walletPath).getWallet();
  const data = {
    address: zeroWallet.getAddressString(),
    mnemonic,
    privateKey: zeroWallet.getPrivateKeyString(),
    publicKey: zeroWallet.getPublicKeyString(),
  }
  return data;
}

function getWalletData (message) {
  console.log('getWalletData service function');
  if (message != null) { 
    return getData(message);  
  } else {
    const mnemonic = bip39.generateMnemonic();
    return getData(mnemonic);  
  }
}

exports.getWalletData = getWalletData;
