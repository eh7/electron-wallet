/*
//import bip39 from 'bip39-light'

const NewUserForm = async () => {

  //const phrase = "phrase"///await bip39.generateMnemonic();
  //    <p>{phrase}</p>

  return (
    <div>
      <h5>New User Form</h5>
      <p>generate a key for the user if they have one?</p>
    </div>
  );
}

export {
  NewUserForm
}
*/
import bip39 from 'bip39-light'
import EthjsWallet, { hdkey as etherHDkey } from 'ethereumjs-wallet'
//import { default as Store } from 'electron-store';

//const store = new Store();

const NewUserForm = () => {
  const mnemonic = bip39.generateMnemonic()
  //const mnemonic = message || await bip39.generateMnemonic();
  const seedHex = bip39.mnemonicToSeedHex(mnemonic);
  const HDwallet = etherHDkey.fromMasterSeed(seedHex);
  const zeroWallet = HDwallet.derivePath("m/44'/60'/0'/0/0").getWallet();
  const key = zeroWallet.getPrivateKey().toString('hex');
  const address = zeroWallet.getAddressString();
  const addressCheckSum = zeroWallet.getChecksumAddressString();


  //store.set('WalletPhrase', keystore);

  return (
    <div>
      <h5>New User Form</h5>
      <p>create/retrive key for the user</p>
      <h4>{mnemonic}</h4>
      <h5>key: {key}</h5>
      <h5>address: {addressCheckSum}</h5>
    </div>
  );
}

export {
  NewUserForm
}
