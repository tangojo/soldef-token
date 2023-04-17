# Soldef Token

<div align="center">
    <img src="screenshots/logo.png" width="200px"</img> 
</div>

**Soldef** is a proof of concept DeFi game based on an ERC20 token with deflationary properties.
Similar to elastic supply tokens, but with only debase and no rebase functionality.

Over time, the total supply of **Soldef** tokens is reduced. The balances of all token holders decrease proportionally.
When paired with another asset on a DEX/AMM, this will automatically increase the price over time as the tokens in the Liquidity Pool (LP) are also subject to this proportional decrease.

## Contract address

This contract is deployed on the sepolia testnet. Here is the address:

[0x155d3b8582bB9b09bd51A0ca08BA0F8fafE50bE7](https://sepolia.etherscan.io/address/0x155d3b8582bB9b09bd51A0ca08BA0F8fafE50bE7)

## Tokenomics

**Soldef** uses a deflationary mechanism to incentivise locking in vaults.
Here is a graph showing the token supply over time without additional minting of new **Soldef** tokens.

<div align="center">
    <img src="screenshots/plot.png" width="400px"</img> 
</div>

Formula for calculating the token supply after x days:
```
token_supply = initial_supply * (0.99 ^ days)
```

Users can protect themselves from this built-in deflation by locking their tokens in Stake Vaults.
This mechanism incentivises users not to sell their tokens, as the amount of tokens remains the same while the price rises.

In addition, these vaults have a time lock (e.g. 24 hours) that prevents the user from unlocking and selling shortly afterwards.
When a user initiates the release of their tokens, an event is triggered on the blockchain, alerting all other users that someone has just initiated the release of their tokens.
This gives other users the opportunity to sell their (unlocked) tokens before that user.

## Vault types

tbd

## Initial fair distribution

tbd

## Contract variables

The **Soldef** contract inherits from the ERC20 contract provided by OpenZeppelin and adds several new features:

- _initialSupply is a public variable that stores the initial supply of the token.
- _totalSupplyLastUpdated is a public variable that stores the timestamp of the last time the total supply was updated.
- _minimumSupply is a public variable that stores the minimum supply of the token.
- _supplyDelta is a public variable that stores the rate of supply reduction per day (in percentage points).

The constructor initializes these variables and mints the initial supply of tokens to the contract deployer.
The debase() function calculates the time elapsed since the last supply update, the percentage of supply reduction, and the new supply of tokens. It then updates the total supply and burns the excess tokens.
The debase() function ensures that the new supply is not below the minimum supply.
Call the debase() function periodically to reduce the token supply.

## Tests
```
npx hardhat test --network hardhat
```

```
  Soldef Tests
    ✔ Deployer should have all of the INITIAL_SUPPLY (44ms)
    ✔ Check if last Block timestamp equals totalSupplyLastUpdated (48ms)
    ✔ totalSupply after 1 day should be 1% less of INITIAL_SUPPLY
    ✔ totalSupply after 299 days should almost reach MINIMUM_SUPPLY (4454ms)
```


## Deploy & verify
```
npx hardhat run scripts/deploySoldef.js --network sepolia
npx hardhat verify --network sepolia <contract address> <constructor parameters>
```

## Todo
- Write more (unit) tests
- Write stacking contract
- Create frontend with React/Next.js and ethers.js