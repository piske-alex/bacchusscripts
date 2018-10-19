const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
//for web3 1.0.0

const account = web3.eth.accounts.create();
console.log(account.address+','+account.privateKey)