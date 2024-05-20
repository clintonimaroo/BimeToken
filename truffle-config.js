require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const { MNEMONIC, PROJECT_ID } = process.env;

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*", 
    },
    goerli: {
      provider: () => new HDWalletProvider(MNEMONIC, `https://goerli.infura.io/v3/${PROJECT_ID}`),
      network_id: 5,       
      confirmations: 2,   
      timeoutBlocks: 200,  
      skipDryRun: true     
    },
  },

  mocha: {
    // timeout: 100000
  },

  compilers: {
    solc: {
      version: "0.8.21",      
      // docker: true,        
      settings: {          
        optimizer: {
          enabled: true,
          runs: 200
        },
        evmVersion: "istanbul"
      }
    }
  },

  db: {
    enabled: false,
  }
};
