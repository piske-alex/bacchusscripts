const Web3 = require('web3');
const config = require('./config.js');
//let abi = config.abi;
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));


    // This code was written and tested using web3 version 1.0.0-beta.26
    //console.log(`web3 version: ${web3.version}`)

    // Who holds the token now?
    var myAddress = process.argv[2]

    // Who are we trying to send this token to?
    //console.log(`num transactions so far: ${count}`);

    // This file is just JSON stolen from the contract page on etherscan.io under "Contract ABI"
    var abiArray = config.abi;

    // This is the address of the contract which created the ERC20 token
    var contractAddress = "0x0618822550a8483176e7b8cf7ce57cc26294a927";
    var contract = new web3.eth.Contract(abiArray, contractAddress, {from: myAddress});

    // How many tokens do I have before sending?
    var balance = await contract.methods.balanceOf(myAddress).call();
    console.log(balance)
