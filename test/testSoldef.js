const {
    time,
  } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('Soldef Tests', function () {
    
    let deployer, user1, user2, user3;

    // Constants 
    const INITIAL_SUPPLY = ethers.utils.parseEther('100000');
    const MINIMUM_SUPPLY = ethers.utils.parseEther('5000');
    const SUPPLY_DELTA = 1;  // percent 
    const ONE_DAY_IN_SECS = 24 * 60 * 60;
    
    //console.log(INITIAL_SUPPLY);
    //console.log(MINIMUM_SUPPLY);


    before(async function () {
        /** Deployment tests */
        
        [deployer, user1, user2, user3] = await ethers.getSigners();

        // Contract deployment
        const DebaseTokenFactory = await ethers.getContractFactory(
            'contracts/Soldef.sol:Soldef',
            deployer
        );

        this.token = await DebaseTokenFactory.deploy("Soldef", "SOLDEF", INITIAL_SUPPLY, MINIMUM_SUPPLY, SUPPLY_DELTA);
        
        
    });

    it('Deployer should have all of the INITIAL_SUPPLY', async function () {
        //console.log(await this.token.balanceOf(deployer.address));
        expect(await this.token.balanceOf(deployer.address)).to.equal(INITIAL_SUPPLY);
    });

    it('Check if last Block timestamp equals totalSupplyLastUpdated', async function () {
        //console.log(await this.token.totalSupplyLastUpdated());
        //console.log(await time.latest());
        expect(await this.token.totalSupplyLastUpdated()).to.equal(await time.latest());
    });

    it('totalSupply after 1 day should be 1% less of INITIAL_SUPPLY', async function () {
        //console.log(await time.latest());

        // Increase the time in Hardhat Network
        onedayafter = (await time.latest()) + ONE_DAY_IN_SECS;
        await time.increaseTo(onedayafter); 
        //console.log(await time.latest());

        // Run the debase function
        await this.token.debase()


        //console.log("total Supply: %s", await this.token.totalSupply());
        supplyReduction = INITIAL_SUPPLY / 100;
        //console.log("supplyReduction is %s", supplyReduction);
        supplyAfterDebase = BigInt(INITIAL_SUPPLY - supplyReduction);
        //console.log("supplyAfterDebase is %s", supplyAfterDebase);
        expect(await this.token.totalSupply()).to.equal(99000000000000000000000n);
    });    

    it('totalSupply after 299 days should almost reach MINIMUM_SUPPLY', async function () {
        //console.log("total Supply: %s", await this.token.totalSupply());

        i = 1;
        while (i < 299) {
            onedayafter = (await time.latest()) + ONE_DAY_IN_SECS;
            await time.increaseTo(onedayafter); 
            await this.token.debase()
            i++;
        }

        //console.log("total Supply after: %s", await this.token.totalSupply());
        expect(await this.token.totalSupply()).to.equal(5000000000000000000000n);
    });   

});