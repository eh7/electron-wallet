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
console.log('mnemonic:', ethersWallet.mnemonic.phrase);
console.log('privateKey:', ethersWallet.privateKey);

const Wallet = require('ethereumjs-wallet').default;
const pkey = Buffer.from(
  ethers.utils.arrayify(ethersWallet.privateKey),
);
const walletFromPrivateKey = Wallet.fromPrivateKey(
  pkey,
);

async function toKeystore (_walletFromPrivateKey) {
  console.log(
    'v3 keystore:',
    await  _walletFromPrivateKey.toV3('password'),
  );
}
 toKeystore(walletFromPrivateKey);


