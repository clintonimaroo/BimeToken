const MyToken = artifacts.require("BimeToken");

contract("BimeToken", accounts => {
    it("should put 1000 MTK in the first account", async () => {
        const instance = await MyToken.deployed();
        const balance = await instance.balanceOf(accounts[0]);
        assert.equal(balance.toString(), web3.utils.toWei("1000", "ether"));
    });

    it("should transfer tokens correctly", async () => {
        const instance = await MyToken.deployed();
        await instance.transfer(accounts[1], web3.utils.toWei("100", "ether"));
        const balance = await instance.balanceOf(accounts[1]);
        assert.equal(balance.toString(), web3.utils.toWei("100", "ether"));
    });

    it("should emit TokensMinted event", async () => {
        const instance = await MyToken.deployed();
        const result = await instance.mint(accounts[2], web3.utils.toWei("50", "ether"));
        assert.equal(result.logs[0].event, "TokensMinted");
        assert.equal(result.logs[0].args.to, accounts[2]);
        assert.equal(result.logs[0].args.amount.toString(), web3.utils.toWei("50", "ether"));
    });
});
