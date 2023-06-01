const bip39 = require('bip39-light');
const { hdkey } = require('ethereumjs-wallet');
const Wallet = require('ethereumjs-wallet').default;

//const mnemonic = 'huge mansion obscure weasel mix submit ripple attack then fade spoil picnic'
const mnemonic = 'huge ball'

const seedHex = bip39.mnemonicToSeedHex(mnemonic);
const HDwallet = hdkey.fromMasterSeed(seedHex);
const zeroWallet = HDwallet.derivePath("m/44'/60'/0'/0/0").getWallet();
const address = zeroWallet.getAddressString();
const addressCheckSum = zeroWallet.getChecksumAddressString();
const data = {
  address: zeroWallet.getAddressString(),
  addressCheckSum,
  mnemonic: mnemonic,
  privateKey: zeroWallet.getPrivateKeyString(),
  publicKey: zeroWallet.getPublicKeyString(),
};

console.log();
console.log(`mnemonic: '${mnemonic}'`);
console.log('seedHex', seedHex);
console.log(`HDwallet: '${HDwallet}'`);
console.log(`zeroWallet: '${zeroWallet}'`);
console.log(`address: '${address}'`);
console.log(`addressCheckSum: '${addressCheckSum}'`);
console.log(`data: '${JSON.stringify(data, null, 3)}'`);
console.log('sh', seedHex);
console.log('pk', data.privateKey);
console.log();

/*
console.log(mnenomic)
console.log(data)
*/

const pkeySeed0 = '0168c36b120db51ee296ed8e7057a693e2461ba78dee9e621757a43e54619a20';
const pkeySeed1 = '7a04c5b35d6a97c17f6cc9b3f005400b441b6662744b9f878fc72b9a0d82da37';
const pkeySeed = '0168c36b120db51ee296ed8e7057a693e2461ba78dee9e621757a43e54619a207a04c5b35d6a97c17f6cc9b3f005400b441b6662744b9f878fc72b9a0d82da37';

const pkey = '50ad70e0aa973dceb27530bf2331e2c92ced29f29cc37789f6e23ca2c1bbb03f';

async function pkeyV3 (_pkey, _password) {
  const key = Buffer.from(_pkey, 'hex');
  const wallet = Wallet.fromPrivateKey(key);
  //return await wallet.toV3String(_password);
  return await wallet.toV3(_password);
};

async function saveSeedHex (_pkeySeed) {
  const pkey0 = _pkeySeed.substr(0, (_pkeySeed.length / 2));
  const pkey1 = _pkeySeed.substr((_pkeySeed.length / 2));
  console.log(_pkeySeed.length);
  console.log(_pkeySeed);
  console.log(pkey0);
  console.log(pkey1);
  const password = 'passsssword';
  const keystore0 = await pkeyV3(pkey0, password);
  const keystore1 = await pkeyV3(pkey1, password);
  //console.log(keystore0);
  //console.log(keystore1);
  const resPkey0 = await Wallet.fromV3(keystore0, password);
  const resPkey1 = await Wallet.fromV3(keystore1, password);
  console.log(_pkeySeed);
  //console.log(resPkey0.privateKey);
  //console.log(resPkey0.privateKey.toString('hex'));
  //
  const seedHex = resPkey0.privateKey.toString('hex') + resPkey1.privateKey.toString('hex');
  console.log(
    seedHex
    //resPkey0.privateKey.toString('hex') + resPkey1.privateKey.toString('hex')
  );

  const HDwallet = hdkey.fromMasterSeed(seedHex);
  const zeroWallet = HDwallet.derivePath("m/44'/60'/0'/0/0").getWallet();
  const address = zeroWallet.getAddressString();
  const addressCheckSum = zeroWallet.getChecksumAddressString();
  console.log(addressCheckSum);
}

//pkeyV3(pkey, 'pkey');
//pkeyV3(pkeySeed0, 'seed0');
//pkeyV3(pkeySeed1, 'seed1');

saveSeedHex(pkeySeed);
