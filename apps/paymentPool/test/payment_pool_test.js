const PaymentPool = artifacts.require("PaymentPool");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("PaymentPool", async (accounts) => {
  
  let paymentPool;

  it("should assert true", async function () {
    paymentPool = await PaymentPool.deployed();
    return assert.isTrue(true);
  });

  it("check poolTotal", async function () {
    const poolTotal = (await paymentPool.getFundTotal.call()).toNumber()
    return assert.isTrue(poolTotal === 0);
  });

  it("fund function test fund(10)", async function () {
    await paymentPool.fund(10);
    const poolTotal = (
      await paymentPool.getFundTotal.call()
    ).toNumber();
    return assert.isTrue(poolTotal === 10);
  });

  it("fund function test fund(5)", async function () {
    await paymentPool.fund(5);
    const poolTotal = (await paymentPool.getFundTotal.call()).toNumber();
    return assert.isTrue(poolTotal === 15);
  });

  it("claim function test claim(10)", async function () {
    await paymentPool.claim(5);
    let poolTotal = (await paymentPool.getFundTotal.call()).toNumber();
    return assert.isTrue(poolTotal === 10);
  });

});

/*
const Auction = artifacts.require("Auction");
contract('Auction', async (accounts) => {
  it('should create Auction owned by first account and associated tests', async () => {
    // TEST CODE HERE
  });
});
*/
