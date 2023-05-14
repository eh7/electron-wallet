const bip39 = require('bip39-light');
const etherHDkey = require('ethereumjs-wallet').hdkey;
const ethUtil = require('ethereumjs-util');

exports.getKeys = () => {
  zeroWallet = HDwallet.derivePath("m/44'/60'/0'/0/0").getWallet();
  console.log(mnemonic)
  console.log(seedHex)
  console.log(`Address: ${zeroWallet.getAddressString()}`);
  console.log(`Private Key: ${zeroWallet.getPrivateKeyString()}`);
}
