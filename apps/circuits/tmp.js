const { ethers } = require("ethers");

let char = String.fromCharCode(
  65,
  32,
  32,
  72,
  69,
  76,
  76,
  79
);
console.log(char);

const amount = ethers.BigNumber.from(1);
console.log(amount.toString());
