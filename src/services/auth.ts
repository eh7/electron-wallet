import * as Store from 'electron-store';

export default class Auth {

  store: any;
  ethers: any;
  password: string;

  constructor(
    store: any,
    ethers: any,
  ) {
    this.password = '123456';
    this.store = store;
    this.ethers = ethers;
    //const pass = this.store.get('password');
    //console.log('Auth constructor', pass);
  }

  setupAuthData = async (data: any) => {
    console.log('setupAuthData');
    console.log(
      // ethers.keccak256,
      'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      'utils:', Buffer.from(this.password),
      '\nhexlify:', this.ethers.hexlify(
        Buffer.from(this.password)
      ),
      this.ethers.keccak256(
        Buffer.from(this.password)
      ),
    );
    this.store.set('password', 
      this.ethers.keccak256(
        Buffer.from(this.password)
      ),
    );
    console.log(
      'StoredPassword:', this.store.get('password')
    );
  }

  checkPasswordSet = () => {
    const password = this.store.get('password');
    console.log('checkPasswordSet :: password: ' + password);
    return password;
  }

  checkLoginAuth = async (_password: string) => {
    const password = this.ethers.keccak256(
      Buffer.from(_password)
    );
    if (password === this.store.get('password')) {
      return true;
    } else {
      return false;
    }
  }

  /*
  */
  testAuthData = async (data: any) => {
    const password = this.ethers.keccak256(
      Buffer.from(data.password)
    );
    const localPassword = this.store.get('password');
    console.log(
      'testAuthData\n',
      password,
      '\n',
      localPassword,
      '\n',
      (password === localPassword),
    );
//console.log(this.ethers.keccak256);
    if (password === this.store.get('password')) {
      console.log('password match now genrate json web token and return to client');
    } else {
      console.log('password match FAILED');
    }
  }
}
/*
setupAuthData({
  password: '123456',
});
testAuthData({
  password: '123456',
});
*/
