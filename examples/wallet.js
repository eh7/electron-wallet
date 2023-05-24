/*
const {
  hdkey,
  thirdparty,
} = require('ethereumjs-wallet');

//const wallet = new Wallet();

console.log(hdkey);
*/

const ethers = require('ethers');
const ethersWallet = ethers.Wallet.createRandom();
console.log('address:', ethersWallet.address);
//console.log('mnemonic:', ethersWallet.mnemonic.phrase);
//console.log('privateKey:', ethersWallet.privateKey);

const Wallet = require('ethereumjs-wallet').default;
const pkey = Buffer.from(
  ethers.utils.arrayify(ethersWallet.privateKey),
);
const walletFromPrivateKey = Wallet.fromPrivateKey(
  pkey,
);

async function toKeystore (_walletFromPrivateKey) {
  const keystore = await  _walletFromPrivateKey.toV3String('password');
  console.log(keystore);
//  console.log(
//    'keystore:',
//    keystore,
//  );
  try {
    const importedWallet = await Wallet.fromV3(keystore, 'wrong_password');
  }
  catch (e) {
    console.log('v3 keystore wallet wrong password error');
  }
  try {
    const importedWallet = await Wallet.fromV3(keystore, 'password');
    //console.log(importedWallet);
    console.log(importedWallet.getChecksumAddressString());
  }
  catch (e) {
    console.log('importedWallet error');
  }

  return keystore;
  /*
  console.log(
    'v3 keystore:',
    await  _walletFromPrivateKey.toV3String('password'),
  );
  */
}

const keystore = toKeystore(walletFromPrivateKey);

/*
async function fromKeystore (_walletFromPrivateKey, _keystoreJsonString) {
  console.log(Wallet, _keystoreJsonString);
  return keystore;

  //const wallet = await _walletFromPrivateKey.fromV3(_keystoreJsonString);
  //console.log(
  //  wallet,
  //);
  console.log(
    'v3 keystore:',
    await  _walletFromPrivateKey.toV3String('password'),
  );
}
fromKeystore(walletFromPrivateKey, keystore);
*/

