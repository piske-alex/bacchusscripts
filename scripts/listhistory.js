const Web3 = require('web3');
const config = require('./config.js');
const net = require('net');
let abi = config.abi;
const web3 = new Web3(new Web3.providers.IpcProvider('/home/alex/.ethereum/geth.ipc',net));
console.log(`web3 version: ${web3.version}`)
var myContract = new web3.eth.Contract(abi, '0x0618822550a8483176e7b8cf7ce57cc26294a927');
myContract.getPastEvents('allEvents', {
    //filter: {_from: '0xa558475680f0fafd6048b702b9334344236f86b4', _to: '0xa558475680f0fafd6048b702b9334344236f86b4'}, // Using an array means OR: e.g. 20 or 23
    fromBlock: 6464629,
    toBlock: 'latest'
}, function(error, events){ console.log(events); })
    .then(function(events){
        console.log(events) // same results as the optional callback above
    });