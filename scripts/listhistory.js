const Web3 = require('web3');
const config = require('config');
let abi = config.abi;
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var myContract = new web3.eth.Contract(abi, '0x0618822550a8483176e7b8cf7ce57cc26294a927');

myContract.getPastEvents('Transfer', {
    filter: {_from: '0xa558475680f0fafd6048b702b9334344236f86b4', _to: '0xa558475680f0fafd6048b702b9334344236f86b4'}, // Using an array means OR: e.g. 20 or 23
    fromBlock: 0,
    toBlock: 'latest'
}, function(error, events){ console.log(events); })
    .then(function(events){
        console.log(events) // same results as the optional callback above
    });