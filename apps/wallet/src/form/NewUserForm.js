import React, { useState, useEffect } from 'react'

import buffer from 'buffer'
//import crypto from 'crypto'
import keccak256 from 'keccak256'

import {
  aes256gcm,
  randomBytes,
} from '../services/cryptLib'

import dotenv from 'dotenv'

dotenv.config()

/*
// Demo implementation of using `aes-256-gcm` with node.js's `crypto` lib.
const aes256gcm = (key) => {
  const ALGO = 'aes-256-gcm';
  //const ALGO = 'aes-256-cbc';

  // encrypt returns base64-encoded ciphertext
  const encrypt = (str) => {
    // The `iv` for a given key must be globally unique to prevent
    // against forgery attacks. `randomBytes` is convenient for
    // demonstration but a poor way to achieve this in practice.
    //
    // See: e.g. https://csrc.nist.gov/publications/detail/sp/800-38d/final
    const iv = new Buffer(crypto.randomBytes(12), 'utf8');
    const cipher = crypto.createCipheriv(ALGO, key, iv);

    // Hint: Larger inputs (it's GCM, after all!) should use the stream API
    let enc = cipher.update(str, 'utf8', 'base64');
    enc += cipher.final('base64');
    return [enc, iv, cipher.getAuthTag()];
  };

  // decrypt decodes base64-encoded ciphertext into a utf8-encoded string
  const decrypt = (enc, iv, authTag) => {
    const decipher = crypto.createDecipheriv(ALGO, key, iv);
    decipher.setAuthTag(authTag);
    let str = decipher.update(enc, 'base64', 'utf8');
    str += decipher.final('utf8');
    return str;
  };

  return {
    encrypt,
    decrypt,
  };
};
*/

const KEY = process.env.key;
const aes = aes256gcm(KEY)

/*
//console.log('KEY', process.env.KEY)
//console.log('KEY', KEY.toString('hex'))
//const KEY = new Buffer(crypto.randomBytes(32), 'utf8');
//console.log('KEY', KEY.toString('hex'))
//console.log('KEY', process.env.key)
const testString = "this is the test string"
const encrypted = aes.encrypt(testString) 
const decrypted = aes.decrypt(
  encrypted[0],
  encrypted[1],
  encrypted[2],
) 
console.log(
  encrypted,
  decrypted,
  testString
)
*/

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

/*
window.walletAPI.getUserPhraseResult((event, _phrase) => {
  if (_phrase === '') {
    const mnemonic = bip39.generateMnemonic();
    window.walletAPI.setUserPhrase(mnemonic)
    console.log('no getUserPhraseResult -> generate new one', mnemonic)
  } else {
    try {
      //setPhrase(_phrase)
      const seedHex = bip39.mnemonicToSeedHex(_phrase);
      const HDwallet = etherHDkey.fromMasterSeed(seedHex);
      const zeroWallet = HDwallet.derivePath("m/44'/60'/0'/0/0").getWallet();
      const key = zeroWallet.getPrivateKey().toString('hex');
      const address = zeroWallet.getAddressString();
console.log('address', address)
    } catch (e) {
        console.log('EERROORROORR :: ', e)
    }
    console.log('window.walletAPI object ::: ', window.walletAPI)
  }
})
*/

//const store = new Store();

const NewUserForm = () => {


  const [phrase, setPhrase] = useState('')
  const [address, setAddress] = useState('')
  const [walletData, setWalletData] = useState({})
//  const [listenHandled, setListenHandled] = useState(false)

  useEffect(() => {
    console.log("useEffect triggered")
    //setListenHandled(true)
    window.walletAPI.getUserPhraseResult((event, _phrase) => {
      const mnemonicStore = aes.decrypt(
        _phrase[0],
        Buffer.from(_phrase[1], 'hex'),
        Buffer.from(_phrase[2], 'hex'),
      )
      const seedHex = bip39.mnemonicToSeedHex(mnemonicStore);
      const HDwallet = etherHDkey.fromMasterSeed(seedHex);
      const zeroWallet = HDwallet.derivePath("m/44'/60'/0'/0/0").getWallet();
      const key = zeroWallet.getPrivateKey().toString('hex');
      const address = zeroWallet.getAddressString();
      setPhrase(mnemonicStore)
      setAddress(address)
      //setWalletData({
      //  address,
      //  seedHex,
      //  key,
      //  phrase: mnemonicStore,
      //})

//      if (mnemonicStore === '') {
//        const mnemonic = bip39.generateMnemonic();
//        window.walletAPI.setUserPhrase(
//          aes.encrypt(mnemonic)
//        )
//        console.log('no getUserPhraseResult -> generate new one', mnemonic)
//      } else {
        try {

/*
          setPhrase(mnemonicStore)
      
          const seedHex = bip39.mnemonicToSeedHex(mnemonicStore);
          const HDwallet = etherHDkey.fromMasterSeed(seedHex);
          const zeroWallet = HDwallet.derivePath("m/44'/60'/0'/0/0").getWallet();
          const key = zeroWallet.getPrivateKey().toString('hex');
          const address = zeroWallet.getAddressString();
          setWalletData({
            address,
            seedHex,
            key,
            phrase: mnemonicStore,
          })
*/
        } catch (e) {
            console.log('EERROORROORR :: ', e)
        }
//      }
    })
  })

  window.walletAPI.getUserPhrase();

  return (
    <div>
      <h5>New User Form</h5>
      <h6>phrase: { (phrase) && phrase}</h6>
      <h6>address: { (address) && address}</h6>
      <button onClick={(e) => {
        console.log(e)
        //const mnemonic = bip39.generateMnemonic();
        const mnemonic = bip39.entropyToMnemonic(
          keccak256(randomBytes(512))
        )
        const _phrase = aes.encrypt(mnemonic)
        window.walletAPI.setUserPhrase(
          [
            _phrase[0],
            _phrase[1].toString('hex'),
            _phrase[2].toString('hex')
          ]
        )
        setPhrase(mnemonic)
        //alert('new phrase CLICKED')
      }}>new phrase</button>
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
