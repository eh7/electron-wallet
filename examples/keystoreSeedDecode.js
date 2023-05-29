const bip39 = require('bip39-light');
const { hdkey } = require('ethereumjs-wallet');
const Wallet = require('ethereumjs-wallet').default;

/*
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
*/

const keystore = [{"version":3,"id":"72245398-69a5-4def-9a0c-35ac0795bbd9","address":"26d2e07c72666f78a9ce569056283cd3f12dff71","crypto":{"ciphertext":"82c0f8b7efd16fd2e1084f91ae8b59057ca2120ee525dfba893afcd64273f58c","cipherparams":{"iv":"d95abf5418d72bbb071690952b4c8540"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"bfed4ecf38b31f21c75364fd789348f9244006c0d0368f3f0a386ad8b9f80e9f","n":262144,"r":8,"p":1},"mac":"271b2a48faff3bebb0c95361213bb71c7695ffb99ba99c2651d0205b982e0980"}},{"version":3,"id":"1d425296-0dc4-4cfa-a250-998df40c6659","address":"e1771dbbbbd1c544a2e66145be165a7ea656c31e","crypto":{"ciphertext":"7ac4b2abbe2dd537f75c541548870e86ce56a1b39bc7b9745deb16d5050a3bf9","cipherparams":{"iv":"1706f00904fd6740c19a858d521ab36d"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"2b5267859a09cc2892cb06d2de0c81d7bc07769d12fbd69450bc904df64ab6bc","n":262144,"r":8,"p":1},"mac":"e7427c7dac8ea0e2caeed31211b1fcd6378a10bb48b5e5c43c607bfc77970e07"}}];

console.log(keystore.length); 

async function decodeSeedKeystore () {
  const password = '123456';
  const resPkey0 = await Wallet.fromV3(keystore[0], password);
  console.log(resPkey0);
  const resPkey1 = await Wallet.fromV3(keystore[1], password);
  console.log(resPkey1);

  const seedHex = resPkey0.privateKey.toString('hex') + resPkey1.privateKey.toString('hex');

  const HDwallet = hdkey.fromMasterSeed(seedHex);
  const zeroWallet = HDwallet.derivePath("m/44'/60'/0'/0/0").getWallet();
  const address = zeroWallet.getAddressString();
  const addressCheckSum = zeroWallet.getChecksumAddressString();
  console.log(addressCheckSum);
  
}

decodeSeedKeystore();
