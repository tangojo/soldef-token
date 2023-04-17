
    // Constants 
    const INITIAL_SUPPLY = ethers.utils.parseEther('100000');
    const MINIMUM_SUPPLY = ethers.utils.parseEther('5000');
    const SUPPLY_DELTA = 1;  // percent 

async function main() {
    const [deployer] = await ethers.getSigners();
  
    //console.log(process.env.ALCHEMY_API_URL);
    //console.log(process.env.SEPOLIA_PRIVATE_KEY);

    console.log("Deploying contracts with the account:", deployer.address);
  
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const Soldef = await ethers.getContractFactory("Soldef");
    const soldef = await Soldef.deploy("Soldef", "SOLDEF", INITIAL_SUPPLY, MINIMUM_SUPPLY, SUPPLY_DELTA);
  
    console.log("Solrise contract address:", soldef.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });