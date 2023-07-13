import conf from './conf.js';

let provider = null;
let signer = null;
let address = null;

export async function listSubscriptions() {
  //let history = await provider.getHistory(conf.subscribeAddress);
  const txCount = await provider.getTransactionCount(conf.subscribeAddress);
  const balance = ethers.utils.formatEther(
    (await provider.getBalance(conf.subscribeAddress)).toString()
  );
  alert(
    'listSubscriptions\nfeed: ' + conf.subscribeData +
    '\naddress: ' + conf.subscribeAddress +
    '\nbalance: ' + balance +
    '\ntxCount: ' + txCount
  );
}

export async function accountSubscriptions() {
  const myAddr = conf.subscribeAddress;
  let currentBlock =  await provider.getBlockNumber(); 
  const n = await provider.getTransactionCount(conf.subscribeAddress);
  const bal = (await provider.getBalance(conf.subscribeAddress)).toString();
alert(currentBlock);
alert(n);
alert(bal);
/*
  for (var i=currentBlock; i >= 0 && (n > 0 || bal > 0); --i) {
    console.log(i);
  }
  for (var i=currentBlock; i >= 0 && (n > 0 || bal > 0); --i) {
    try {
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
    } catch (e) { console.error("Error in block " + i, e); }
  }
*/
}

async function setup() {
  provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  await provider.send("eth_requestAccounts", []);
  signer = provider.getSigner()
  address = await signer.getAddress();
  $("#txFrom").val(address);
  //$("#txTo").val('0x6b1527F6E2248A862061963b8c1BD013AcaCa5A6');
  $("#txTo").val(conf.subscribeAddress);
  $("#txAmount").val('0.001');
  console.log (
    provider,
    signer,
    address,
  );
}
setup();
