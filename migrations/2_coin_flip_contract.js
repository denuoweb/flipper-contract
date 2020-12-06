const CoinFlipContract = artifacts.require("CoinFlipContract");

module.exports = function (deployer) {
  deployer.deploy(CoinFlipContract, { value: web3.utils.toWei('1', 'ether') });
};
