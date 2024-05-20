const MyToken = artifacts.require("BimeToken");

module.exports = function (deployer) {
    const initialSupply = web3.utils.toWei("1000", "ether"); 
    deployer.deploy(MyToken, initialSupply);
};