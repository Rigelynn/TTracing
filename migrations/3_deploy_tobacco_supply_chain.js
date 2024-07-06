const TobaccoSupplyChain = artifacts.require("TobaccoSupplyChain");

module.exports = function (deployer) {
  deployer.deploy(TobaccoSupplyChain);
};
