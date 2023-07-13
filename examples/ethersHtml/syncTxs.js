const { ethers } = require("ethers");
//const conf = require("./conf.js");

const amount = '0.001';
const subscribeAddress = '0x6b1527F6E2248A862061963b8c1BD013AcaCa5A6';
const subscribeData = 'newsFeed00';

const rpcURL = 'https://polygon-mumbai.gateway.tenderly.co';

//const provider = new ethers.providers.JsonRpcProvider();
const provider = new ethers.JsonRpcProvider(rpcURL);

const run = async () => {
  const myAddr = subscribeAddress;
  let currentBlock =  await provider.getBlockNumber(); 
  const n = await provider.getTransactionCount(subscribeAddress);
  const bal = (await provider.getBalance(subscribeAddress)).toString();
  console.log('run', myAddr, currentBlock, n, bal);

  for (var i=currentBlock; i >= 0 && (n > 0 || bal > 0); --i) {
    try {
      //console.log(i);
      //var block = await provider.getTransaction(i-1);
      var block = await provider.getBlock(i);
      console.log(block.transactions.length);
      let txCount = 0;
      block.transactions.forEach(function(e) {
        const tx = await provider.getTransaction(e);
        console.log(
          txCount,
          e,
          tx,
        );
        txCount++;
      });
      
      if (i === currentBlock - 0) process.exit();

/*
      var block = eth.getBlock(i, true);
      if (block && block.transactions) {
        block.transactions.forEach(function(e) {
          if (myAddr == e.from) {
            if (e.from != e.to)
              bal = bal.plus(e.value);
            console.log(i, e.from, e.to, e.value.toString(10));
            --n;
          }
          if (myAddr == e.to) {
            if (e.from != e.to)
              bal = bal.minus(e.value);
            console.log(i, e.from, e.to, e.value.toString(10));
          }
        });
      }
*/
    } catch (e) {
      console.error("Error in block " + i, e);
      process.exit();
    }
  }
}
//const signer = provider.getSigner();

run();
