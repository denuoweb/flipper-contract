const CoinFlipContract = artifacts.require('CoinFlipContract');

contract('CoinFlipContract', async (accounts) => {
  let instance;
  let contractBalance;
  let blockchainBalance;
  
  beforeEach(async () => {
    instance = await CoinFlipContract.new({ value: web3.utils.toWei('1', 'ether') });
    contractBalance = parseFloat(await instance.balance());
    blockchainBalance = parseFloat(await web3.eth.getBalance(instance.address));
  });

  it('should have a 1 eth balance after deploy', async () => {
    const oneEth = parseFloat(web3.utils.toWei('1', 'ether'));
    assert(contractBalance === oneEth, 'Contract balance after deploy is not 1 eth.');
    assert(blockchainBalance === oneEth, 'Blockchain balance after deploy is not 1 eth.');
  });

  it('should have the equal contract and blockchain balance after deploy', async () => {
    assert(contractBalance === blockchainBalance, 'Contract and blockchain balance are not equal.');
  });
  
  it('should deposit 1.5 eth', async () => {
    await instance.depositFunds({ value: web3.utils.toWei('1.5', 'ether') });
    const contractBalance = parseFloat(await instance.balance());
    const blockchainBalance = parseFloat(await web3.eth.getBalance(instance.address));
    assert(contractBalance === blockchainBalance, 'Contract and blockchain balance are not equal after deposit.');
    const finalBalance = parseFloat(web3.utils.toWei('2.5', 'ether'));
    assert(contractBalance === finalBalance, 'Din not deposit 1.5 eth.');
  });
  
  it('should withdraw 0.25 eth', async () => {
    await instance.withdraw(web3.utils.toWei('0.25', 'ether'));
    const contractBalanceAfterWithdraw = parseFloat(await instance.balance());
    const blockchainBalanceAfterWithdraw = parseFloat(await web3.eth.getBalance(instance.address));
    assert(contractBalanceAfterWithdraw === blockchainBalanceAfterWithdraw, 'Contract and blockchain balance are not equal after withdrawal.');
    const expectedBalance = parseFloat(web3.utils.toWei('0.75', 'ether'));
    assert(contractBalanceAfterWithdraw === expectedBalance, 'Din not withdraw 0.25 eth.');
  });
  
  it('should withdraw all balance', async () => {
    await instance.withdrawAll();
    const contractBalanceAfterWithdrawAll = parseFloat(await instance.balance());
    const blockchainBalanceAfterWithdrawAll = parseFloat(await web3.eth.getBalance(instance.address));
    assert(contractBalanceAfterWithdrawAll === blockchainBalanceAfterWithdrawAll, 'Contract and blockchain balance are not equal after withdrawal.');
    const expectedBalance = parseFloat(web3.utils.toWei('0', 'ether'));
    assert(contractBalanceAfterWithdrawAll === expectedBalance, 'Din not withdraw all balance.');
  });
});
