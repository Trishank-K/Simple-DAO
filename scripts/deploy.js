async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
  
    const SimpleDAO = await ethers.getContractFactory("SimpleDAO");
    const simpleDAO = await SimpleDAO.deploy(1000); // 1000 is the initial supply
  
    console.log("SimpleDAO deployed to:", simpleDAO.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  