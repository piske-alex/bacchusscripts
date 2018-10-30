const Web3 = require('web3');
const config = require('./config.js');
//let abi = config.abi;
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const main = async () => {
    // This code was written and tested using web3 version 1.0.0-beta.26
    //console.log(`web3 version: ${web3.version}`)

    // Who holds the token now?
    var myAddress = process.argv[2]

    // Who are we trying to send this token to?
    console.log(web3.fromWei(web3.eth.getBalance(myaddress)))
    //console.log(balance)
}
main()