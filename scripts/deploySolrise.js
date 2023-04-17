async function main() {
    const [deployer] = await ethers.getSigners();
  
    //console.log(process.env.ALCHEMY_API_URL);
    //console.log(process.env.SEPOLIA_PRIVATE_KEY);

    console.log("Deploying contracts with the account:", deployer.address);
  
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const Solrise = await ethers.getContractFactory("Solrise");
    const solrise = await Solrise.deploy();
  
    console.log("Solrise contract address:", solrise.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });