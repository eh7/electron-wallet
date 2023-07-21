// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract PaymentPool is Ownable {

  uint256 poolTotal;
  mapping(address => uint) poolUserTotal;

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

  function ownerGetPoolUserTotal(address _user)
    onlyOwner
    public
    returns (uint256)
  {
    return poolUserTotal[msg.sender];
  }

  function getPoolUserTotal()
    public
    returns (uint256)
  {
    return poolUserTotal[msg.sender];
  }

  function fund(uint256 _amount)
    public
  {
    poolTotal = poolTotal + _amount;
    poolUserTotal[msg.sender] = poolUserTotal[msg.sender] + _amount;

    emit LogMessage(
      "LogMessage in function fund: ",
      poolTotal
    );
  }

  function claim(uint256 _amount)
    public
  {
    if (poolTotal >= _amount) {
      require(poolTotal >= _amount, "poolTotal not enough");
      require(poolUserTotal[msg.sender] >= _amount, "poolUserTotal not enough");
      poolTotal = poolTotal - _amount;
      poolUserTotal[msg.sender] = poolUserTotal[msg.sender] - _amount;
    }

    // TODO add code to transfer tokens to claimer

    emit LogMessage(
      "function claim(uint): ",
      poolTotal
    );
  }
}
