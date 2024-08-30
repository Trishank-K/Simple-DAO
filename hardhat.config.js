require('@nomiclabs/hardhat-ethers')
const API_URL = "https://eth-sepolia.g.alchemy.com/v2/uGSa9bjNCuG0T7SUDsS5nAeymuLb5BDm";
const PRIVATE_KEY = "422552a11a98fc362127ac8a72fa494d9aa5502d4da4b5c4cd744ef2721b7d17"
const PUBLIC_KEY = "0x3BAA7865255193031D451AE1E7D97e71F3CBb6Ad";
module.exports = {
  solidity: "0.8.0",
  defaultNetwork: "sepolia",
  networks: {
    hardhat:{},
    sepolia:{
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  }
};