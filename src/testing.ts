//import bip39-light from 'bip39-light'
import { default as bip39 } from 'bip39-light'
import { hdkey as etherHDkey } from 'ethereumjs-wallet';

//console.log({ bip39Light });

export class Wallet {
  walletPath = 'm/44\'/60\'/0\'/0/0';


  walletInit = () => { 
    const mnemonic = bip39.generateMnemonic();
    const seedHex = bip39.mnemonicToSeedHex(mnemonic);
    const HDwallet = etherHDkey.fromMasterSeed(seedHex);
    const zeroWallet = HDwallet.derivePath(this.walletPath).getWallet();
    const data = {
      address: zeroWallet.getAddressString(),
      mnemonic,
      privateKey: zeroWallet.getPrivateKeyString(),
      publicKey: zeroWallet.getPublicKeyString(),
    }

    //console.log(mnemonic);
    //console.log(seedHex);
    //console.log(data);

    return data;
  }
}

const wallet = new Wallet();
console.log(wallet.walletInit());
