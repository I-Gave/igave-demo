const IGVCore = artifacts.require('./IGVCore.sol');

module.exports = function (deployer) {
  deployer.deploy(IGVCore);
};
