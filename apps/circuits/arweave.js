const Arweave = require('arweave');

/*
// If you want to connect directly to a node
const arweave = Arweave.init({
    host: '127.0.0.1',
    port: 1984,
    protocol: 'http'
});
*/

// Or to specify a gateway when running from NodeJS you might use
const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https'
});

console.log(arweave);

async function getWallet() {
  const key = await arweave.wallets.generate();
  return key;
  /*
  arweave.wallets.generate().then((key) => {
    console.log(key);
    // {
    //     "kty": "RSA",
    //     "n": "3WquzP5IVTIsv3XYJjfw5L-t4X34WoWHwOuxb9V8w...",
    //     "e": ...
  });
  */
};

async function getAddress(key) {
  const address = arweave.wallets.jwkToAddress(key);
  return address;

  /*
  arweave.wallets.jwkToAddress(key).then((address) => {
    console.log(address);
    //1seRanklLU_1VTGkEk7P0xAwMJfA7owA1JHW5KyZKlY
  });
  */
}

async function getBalance(address) {
  // const address = '1seRanklLU_1VTGkEk7P0xAwMJfA7owA1JHW5KyZKlY';
  const balance = await arweave.wallets.getBalance(
    address
  );
  return balance;
  /*
  arweave.wallets.getBalance('1seRanklLU_1VTGkEk7P0xAwMJfA7owA1JHW5KyZKlY').then((balance) => {
    let winston = balance;
    let ar = arweave.ar.winstonToAr(balance);

    console.log(winston);
    //125213858712

    console.log(ar);
    //0.125213858712
  });
  */
};


async function run() {
  const key = await getWallet();
  const address = await getAddress(key);
  console.log(
    address
  );
  console.log(
    await getBalance(address)
  );
}

run();
