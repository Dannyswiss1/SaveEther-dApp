import { ethers } from "hardhat";

async function main() {

  const saveEther = await ethers.deployContract("SaveEther");

  await saveEther.waitForDeployment();

  console.log(
    `saveEther is deployed to ${saveEther.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// c/a 0x5FbDB2315678afecb367f032d93F642f64180aa3
