// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DataDemoOptimized {
    uint256[] public numbers;

    function addNumber(uint256 num) public {
        numbers.push(num);
    }

    function getNumber(uint256 index) public view returns (uint256) {
        uint256[] storage nums = numbers;
        return nums[index];
    }

    function sumMemory(uint256[] memory arr) public pure returns (uint256) {
        uint256 sum = 0;
        for (uint256 i = 0; i < arr.length; i++) {
            sum += arr[i];
        }
        return sum;
    }

    function sumCalldata(uint256[] calldata arr) public pure returns (uint256) {
        uint256 sum = 0;
        for (uint256 i = 0; i < arr.length; i++) {
            sum += arr[i];
        }
        return sum;
    }
}
