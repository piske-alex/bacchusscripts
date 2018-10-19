const Web3 = require('web3');
const config = require('./config.js');
const net = require('net');
let abi = config.abi;
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
//console.log(`web3 version: ${web3.version}`)
var myContract = new web3.eth.Contract(abi, '0x0618822550a8483176e7b8cf7ce57cc26294a927');
/*web3.eth.getBlockNumber(function(error, result){
    //console.log(result)
    myContract.getPastEvents('Transfer', {
        //filter: {_from: '0xa558475680f0fafd6048b702b9334344236f86b4', _to: '0xa558475680f0fafd6048b702b9334344236f86b4'}, // Using an array means OR: e.g. 20 or 23
        fromBlock: result-5999,
        //fromBlock:result-999,
        toBlock: 'latest'
    }, function(error, events){  })
        .then(function(events){
            events.forEach(function(element) {
                delete element.raw;
                delete element.signature;
                delete element.logIndex;
                delete element.transactionIndex;
                delete element.blockHash;
                delete element.address;
            });
            console.log(JSON.stringify(events))
            process.exit()// same results as the optional callback above
        });
})*/
myContract.events.Transfer({ fromBlock: 0, },function(error, events){ })
    .then(function(events){
        events.forEach(function(element) {
            delete element.raw;
            delete element.signature;
            delete element.logIndex;
            delete element.transactionIndex;
            delete element.blockHash;
            delete element.address;
        });
        console.log(JSON.stringify(events))
        process.exit()// same results as the optional callback above
    })
/*

/*myContract.events.Transfer({}, { fromBlock: 6464623, toBlock: 'latest' }).get((error, eventResult) => {
    if (error)
        console.log('Error in myEvent event handler: ' + error);
    else
        console.log('myEvent: ' + JSON.stringify(eventResult.args));
});*/