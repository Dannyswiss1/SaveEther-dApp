import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("SaveEther", function () {
  
  async function deploySaveEther() {
    const [owner, otherAccount] = await ethers.getSigners();

    const SaveEther = await ethers.getContractFactory("SaveEther");
    const saveEther = await SaveEther.deploy();

    return { saveEther, owner, otherAccount };
  }

  describe("test address zero", async () => {
    it("check againts address 0", async () => {
      const { owner } = await loadFixture(deploySaveEther);
      expect(owner).not.equals("0x00000000000000000000000000000000000000000000000000");
    });

    describe("deposit", async () => {
      it("check if deposit value is greater than zero", async () => {
        const { saveEther } = await loadFixture(deploySaveEther);
        const deposited = await saveEther.deposit({value:1});
        expect(deposited.value).eq(1);
      })
      
      it("check for balance increment", async () => {
        const { saveEther, owner } = await loadFixture(deploySaveEther);

        await saveEther.deposit({value:1});
        const changeEtherBalances = await saveEther.checkSavings(owner);
        expect(changeEtherBalances).eq(1);
    })

    describe("emit", async () => {
      it("check if emit is active", async () => {
        const { saveEther, owner } = await loadFixture(deploySaveEther)
        const amount = 1

        await expect(await saveEther.deposit({value: amount}))
   .to.emit(saveEther, 'SavingSuccessful')
   .withArgs(owner, amount );
      })
    })
  });
});

describe("Withdraw", function () {
  it("Check if decrement balance on withdraw", async function () {
    const { saveEther, owner } = await loadFixture(deploySaveEther);
    await saveEther.deposit({ value: 1 });
    await saveEther.withdraw();
    const checkSavings = await saveEther.checkSavings(owner);
    expect(checkSavings).eq(1)
  });
});

describe("send out saving", function () {
  it("Check if transfer is successful", async function () {
    const { saveEther, owner } = await loadFixture(deploySaveEther);
    const mockAddress = "0x42AcD393442A1021f01C796A23901F3852e89Ff3";
    await saveEther.deposit({ value: 2 });
    await saveEther.sendOutSaving(mockAddress, 1);
    const checkSavings = await saveEther.checkSavings(owner);
    expect(checkSavings).eq(1)
  });
});

});

