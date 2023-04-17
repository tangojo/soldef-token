// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

//import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Soldef is ERC20 {
    uint256 public _initialSupply;
    uint256 public totalSupplyLastUpdated;
    uint256 public _minimumSupply;
    uint256 public _supplyDelta;

    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        uint256 minimumSupply,
        uint256 supplyDelta
    ) ERC20(name, symbol) {
        _initialSupply = initialSupply;
        _minimumSupply = minimumSupply;
        _supplyDelta = supplyDelta;

        // Mint initial supply
        totalSupplyLastUpdated = block.timestamp;
        _mint(msg.sender, initialSupply);
    }

    function debase() public {
        uint256 currentSupply = totalSupply();
        uint256 multiplier = 100; 

        // Calculate time elapsed since last supply update
        uint256 timeElapsed = block.timestamp - totalSupplyLastUpdated;
        //console.log("timeElapsed is  %s ", timeElapsed);

        // Calculate the supply reduction
        uint256 supplyReductionPercentage =  _supplyDelta * timeElapsed * multiplier / (100 * 1 days);
        uint256 supplyReduction =  (currentSupply * supplyReductionPercentage) / multiplier;
        //console.log("supplyReduction is  %s ", supplyReduction);

        // Ensure that the new supply is not below the minimum supply
        if (currentSupply - supplyReduction < _minimumSupply) {
            supplyReduction = currentSupply - _minimumSupply;
        }

        // Update the total supply and the timestamp
        totalSupplyLastUpdated = block.timestamp;
        _burn(msg.sender, supplyReduction);
    }
}