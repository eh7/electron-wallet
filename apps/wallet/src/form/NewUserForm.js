import React, { useState, useEffect } from 'react';

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

let phrase = ''

//const store = new Store();

const NewUserForm = () => {

  window.walletAPI.getUserPhrase();

  const [phrase, setPhrase] = useState('')
  const [walletData, setWalletData] = useState({})

  useEffect(() => {
    window.walletAPI.getUserPhraseResult((event, _phrase) => {
      if (_phrase === '') {
        const mnemonic = bip39.generateMnemonic();
        window.walletAPI.setUserPhrase(mnemonic)
        console.log('no getUserPhraseResult -> generate new one', mnemonic)
      } else {
        try {
        setPhrase(_phrase)
        const seedHex = bip39.mnemonicToSeedHex(_phrase);
        const HDwallet = etherHDkey.fromMasterSeed(seedHex);
        const zeroWallet = HDwallet.derivePath("m/44'/60'/0'/0/0").getWallet();
        const key = zeroWallet.getPrivateKey().toString('hex');
        const address = zeroWallet.getAddressString();
console.log('address', address)
/*
        setWalletData({
          address,
          seedHex,
          key,
          phrase: _phrase,
        })
*/
        } catch (e) {
          console.log('EERROORROORR :: ', e)
        }
      }
    })
  })

  return (
    <div>
      <h5>New User Form</h5>
      <h6>phrase: {phrase}</h6>
      <h6>address: {walletData.address}</h6>
      <h6>key: {walletData.key}</h6>
    </div>
  )


//  const mnemonic = userPhrase || await bip39.generateMnemonic();
//  const mnemonic = userPhrase || bip39.generateMnemonic();
/*
  const seedHex = bip39.mnemonicToSeedHex(mnemonic);
  const HDwallet = etherHDkey.fromMasterSeed(seedHex);
  const zeroWallet = HDwallet.derivePath("m/44'/60'/0'/0/0").getWallet();
  const key = zeroWallet.getPrivateKey().toString('hex');
  const address = zeroWallet.getAddressString();
  const addressCheckSum = zeroWallet.getChecksumAddressString();
*/

//  console.log('>>>>>>>>>>>>>>', mnemonic, userPhrase, window.walletAPI.getUserPhrase())
//  if (mnemonic !== userPhrase) {
//    window.walletAPI.setUserPhrase(mnemonic);
//  }

//  console.log(
//    'REQUEST -> gettUserPharse IN NewUserForm check/setup:: ',
//    window.walletAPI.getUserPharse()
//  );

//  return (
//    <div>
//      <h5>New User Form</h5>
//      <p>create/retrive key for the user</p>
//      <h4>{mnemonic}</h4>
//      <h4>userPhrase: {userPhrase}</h4>
//    </div>
//  );
      //<h5>key: {key}</h5>
      //<h5>address: {addressCheckSum}</h5>
}

export {
  NewUserForm
}
