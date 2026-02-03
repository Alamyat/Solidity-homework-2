import { ethers } from "hardhat";

describe("Gas measurement", function () {
  it("Measure addNumber and 100 pushes for Original and Optimized", async function () {
    const Orig = await ethers.getContractFactory("DataDemoOriginal");
    const orig = await Orig.deploy();
    await orig.waitForDeployment();

    const Opt = await ethers.getContractFactory("DataDemoOptimized");
    const opt = await Opt.deploy();
    await opt.waitForDeployment();

    // single add
    const txOrigSingle = await orig.addNumber(1);
    const rOrigSingle = await txOrigSingle.wait();
    console.log("Original single add gas:", rOrigSingle.gasUsed.toString());

    const txOptSingle = await opt.addNumber(1);
    const rOptSingle = await txOptSingle.wait();
    console.log("Optimized single add gas:", rOptSingle.gasUsed.toString());

    // 100 pushes original
    let totalOrig = ethers.BigNumber.from(0);
    for (let i = 0; i < 100; i++) {
      const t = await orig.addNumber(i);
      const rr = await t.wait();
      totalOrig = totalOrig.add(rr.gasUsed);
    }
    console.log("Original total gas for 100 pushes:", totalOrig.toString());
    console.log("Original avg per push:", totalOrig.div(100).toString());

    // 100 pushes optimized
    let totalOpt = ethers.BigNumber.from(0);
    for (let i = 0; i < 100; i++) {
      const t = await opt.addNumber(i);
      const rr = await t.wait();
      totalOpt = totalOpt.add(rr.gasUsed);
    }
    console.log("Optimized total gas for 100 pushes:", totalOpt.toString());
    console.log("Optimized avg per push:", totalOpt.div(100).toString());
  });
});
