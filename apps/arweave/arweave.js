const Arweave = require('arweave');
const fs = require('fs');

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

async function getWallet() {
  return await arweave.wallets.generate();
}

async function getAddress(_key) {
  //console.log(_key);
  return await arweave.wallets.jwkToAddress(_key);
}

async function getBalance(_address) {
  return await arweave.wallets.getBalance(_address);
}

async function getLastTransactionID(_address) {
  return await arweave.wallets.getLastTransactionID(_address);
}

(async () => {
  const key = JSON.parse(fs.readFileSync('key.json', 'utf8'));
/*
  const key = await getWallet();
*/
  const address = await getAddress(key);
  const balance = await getBalance(address);
  const lastTxId = await getLastTransactionID(address);
  console.log(address, balance, lastTxId);
})();
