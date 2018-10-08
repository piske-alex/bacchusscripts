const Web3 = require('web3');
const config = require('./config.js');
const net = require('net');
let abi = config.abi;
const web3 = new Web3(new Web3.providers.IpcProvider('/home/alex/.ethereum/geth.ipc',net));
console.log(`web3 version: ${web3.version}`)
var myContract = new web3.eth.Contract(abi, '0xB8c77482e45F1F44dE1745F52C74426C631bDD52');

myContract.getPastEvents('Transfer', {
    //filter: {_from: '0xa558475680f0fafd6048b702b9334344236f86b4', _to: '0xa558475680f0fafd6048b702b9334344236f86b4'}, // Using an array means OR: e.g. 20 or 23
    fromBlock: 6464629,
    toBlock: 'latest'
}, function(error, events){ console.log(error+events); })
    .then(function(events){
        console.log(events) // same results as the optional callback above
    });

/*myContract.events.Transfer({}, { fromBlock: 6464623, toBlock: 'latest' }).get((error, eventResult) => {
    if (error)
        console.log('Error in myEvent event handler: ' + error);
    else
        console.log('myEvent: ' + JSON.stringify(eventResult.args));
});*/