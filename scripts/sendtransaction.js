const Web3 = require('web3');
const config = require('./config.js');
var Tx = require('ethereumjs-tx');
//let abi = config.abi;
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const main = async () => {
    // This code was written and tested using web3 version 1.0.0-beta.26
    //console.log(`web3 version: ${web3.version}`)

    // Who holds the token now?
    var myAddress = process.argv[2]

    // Who are we trying to send this token to?
    var destAddress = process.argv[3]

    // If your token is divisible to 8 decimal places, 42 = 0.00000042 of your token
    var transferAmount = process.argv[4]

    var my_privkey = process.argv[5]

    // Determine the nonce
    var count = await web3.eth.getTransactionCount(myAddress);
    console.log(`num transactions so far: ${count}`);

    // This file is just JSON stolen from the contract page on etherscan.io under "Contract ABI"
    var abiArray = config.abi;

    // This is the address of the contract which created the ERC20 token
    var contractAddress = "0x0618822550a8483176e7b8cf7ce57cc26294a927";
    var contract = new web3.eth.Contract(abiArray, contractAddress, { from: myAddress });

    // How many tokens do I have before sending?
    var balance = await contract.methods.balanceOf(myAddress).call();
    console.log(`Balance before send: ${balance}`);

    // I chose gas price and gas limit based on what ethereum wallet was recommending for a similar transaction. You may need to change the gas price!
    var rawTransaction = {
        "from": myAddress,
        "nonce": "0x" + count.toString(16),
        "gasPrice": "0x0012A05F200",
        "gasLimit": "0x30D40",
        "to": contractAddress,
        "value": "0x0",
        "data": contract.methods.transfer(destAddress, transferAmount).encodeABI(),
        "chainId": 0x01
    };

    // Example private key (do not use): 'e331b6d69882b4cb4ea581d88e0b604039a3de5967688d3dcffdd2270c0fd109'
    // The private key must be for myAddress
    var privKey = new Buffer(my_privkey, 'hex');
    var tx = new Tx(rawTransaction);
    tx.sign(privKey);
    var serializedTx = tx.serialize();

    // Comment out these three lines if you don't really want to send the TX right now
    console.log(`Attempting to send signed tx:  ${serializedTx.toString('hex')}`);
    await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', console.log);
    // The balance may not be updated yet, but let's check
    balance = await contract.methods.balanceOf(myAddress).call();
    console.log(`Balance after send: ${balance}`);
}

main();