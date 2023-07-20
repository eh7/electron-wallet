// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract PaymentPool is Ownable {

  uint256 poolTotal;

  constructor() public {
    poolTotal = 0;
  }

  event LogMessage(
    string message,
    uint256 value
  );

  function getFundTotal()
    onlyOwner
    public
    returns (uint256)
  {
    return poolTotal;
  }

  function fund(uint256 _amount)
    public
  {
    poolTotal = poolTotal + _amount;

    emit LogMessage(
      "LogMessage in function fund: ",
      poolTotal
    );
  }

  function claim(uint256 _amount)
    public
  {
    if (poolTotal >= _amount) {
      poolTotal = poolTotal - _amount;
    }

    // TODO add code to transfer tokens to claimer

    emit LogMessage(
      "function claim(uint): ",
      poolTotal
    );
  }
}
