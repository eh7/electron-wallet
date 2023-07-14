const { ethers } = require("ethers");
//const conf = require("./conf.js");

const amount = '0.001';
const subscribeAddress = '0x6b1527F6E2248A862061963b8c1BD013AcaCa5A6';
const subscribeData = 'newsFeed00';

const rpcURL = 'https://polygon-mumbai.gateway.tenderly.co';

//const provider = new ethers.providers.JsonRpcProvider();
const provider = new ethers.JsonRpcProvider(rpcURL);

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const run = async () => {
  const myAddr = subscribeAddress;
  //let currentBlock =  37925391 ;
  let currentBlock =  await provider.getBlockNumber(); 
  let n = await provider.getTransactionCount(subscribeAddress);
  let bal = (await provider.getBalance(subscribeAddress)).toString();
  //console.log('run', myAddr, currentBlock, n, bal);

  let found = 0;

  for (var i=currentBlock; i >= 0 && (n > 0 || bal > 0); --i) {
    try {
      var block = await provider.getBlock(i);
      console.log(i, block.transactions.length);
      let txCount = 0;
      for (const txs of block) {
        const tx = await provider.getTransaction(txs);
        /*
        console.log(
          txCount,
          txs,
          tx,
        );
        */
        if (myAddr == tx.to) {
          found++;
          console.log(
            '(myAddr == tx.to) :: \n',
            i,
            '\nfrom:', tx.from,
            '\nto:', tx.to,
            '\nvalue:', tx.value.toString(10),
            '\ndata:', ethers.toUtf8String(
              tx.data,
            ),
            '\n', n, found
          );
        }
        txCount++;
      }
      await sleep(2000);
      //if (i === currentBlock - 100) process.exit();
    } catch (e) {
      console.error("Error in block " + i, e);
      process.exit();
    }
  }
}
//const signer = provider.getSigner();

run();
