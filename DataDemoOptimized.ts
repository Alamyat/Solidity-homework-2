import { expect } from "chai";
import { ethers } from "hardhat";

describe("DataDemoOptimized", function () {
  it("Should add and get number from storage", async function () {
    const Demo = await ethers.getContractFactory("DataDemoOptimized");
    const demo = await Demo.deploy();
    await demo.waitForDeployment();

    await demo.addNumber(42);
    const stored = await demo.getNumber(0);
    expect(Number(stored)).to.equal(42);
  });

  it("Should sum array via calldata", async function () {
    const Demo = await ethers.getContractFactory("DataDemoOptimized");
    const demo = await Demo.deploy();
    await demo.waitForDeployment();

    const result = await demo.sumCalldata([1, 2, 3, 4]);
    expect(Number(result)).to.equal(10);
  });

  it("Should sum array via memory", async function () {
    const Demo = await ethers.getContractFactory("DataDemoOptimized");
    const demo = await Demo.deploy();
    await demo.waitForDeployment();

    const result = await demo.sumMemory([5, 5, 0]);
    expect(Number(result)).to.equal(10);
  });
});
