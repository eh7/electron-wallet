//console.log(window.ethereum);
// provider = new ethers.providers.JsonRpcProvider()
//

import conf from './conf.js';

let provider = null;
let signer = null;
let address = null;

//subscribeAddress = '0x6b1527F6E2248A862061963b8c1BD013AcaCa5A6';

export async function sendTx() {
  console.log(address);
  if (!address) {
    alert('metamask not initialized');
  } else {
    const to = $("#txTo").val();
    const amount = $("#txAmount").val();
    //alert(`isendTx -> in index.js, ${to} -> ${amount}`);
    //alert(`sendTx -> in index.js to subscribe to content, ${address} ${amount} -> ${to}`);

    const params = [{
        from: address,
        to: to,
        value: ethers.utils.parseUnits(amount, 'ether').toHexString(),
        //data: ethers.utils.hexlify(ethers.utils.toUtf8Bytes('newsFeed00'))
        data: ethers.utils.hexlify(ethers.utils.toUtf8Bytes(conf.subscribeData))
    }];
    console.log(params);

    const transactionHash = await provider.send('eth_sendTransaction', params)
    console.log('transactionHash is ' + transactionHash);

    // TODO listen for tx result
    const result = await provider.waitForTransaction(transactionHash);
    console.log('tx ' + transactionHash + ':', result);
    //alert('tx ' + transactionHash + ' completed');
  }
}

async function setup() {
  provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  await provider.send("eth_requestAccounts", []);
  signer = provider.getSigner()
  address = await signer.getAddress();
  $("#txFrom").val(address);
  //$("#txTo").val('0x6b1527F6E2248A862061963b8c1BD013AcaCa5A6');
  $("#txTo").val(conf.subscribeAddress);
  //$("#txAmount").val('0.001');
  $("#txAmount").val(conf.amount);
  console.log (
    provider,
    signer,
    address,
  );
}
setup();

//signer = provider.getSigner(0);
//console.log(signer);

/*
*/

/*
abi = JSON.parse('[{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')

provider = new ethers.providers.JsonRpcProvider()
signer = provider.getSigner(0);
contract = new ethers.Contract('0x5735731eEbDA5BE1eEe9f0b119B9374a63b0f507', abi, signer)

candidates = {"Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3"}

function voteForCandidate(candidate) {
 candidateName = $("#candidate").val();
  console.log(candidateName);

  contract.voteForCandidate(ethers.utils.formatBytes32String(candidateName)).then((f) => {
    let div_id = candidates[candidateName];
    contract.totalVotesFor(ethers.utils.formatBytes32String(candidateName)).then((f) => {
      $("#" + div_id).html(f);
    })
  });
}

$(document).ready(function() {
  
 candidateNames = Object.keys(candidates);

 for(var i=0; i<candidateNames.length; i++) {
  let name = candidateNames[i];
  contract.totalVotesFor(ethers.utils.formatBytes32String(name)).then((f) => {
    $("#" + candidates[name]).html(f);
  })
 }
});
*/
