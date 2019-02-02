const Web3 = require('web3');

//const web3 = new Web3('ws://vm-2d05.inf.h-brs.de:8546');
const web3 = new Web3('ws://vm-2d05.inf.h-brs.de/geth2');
//console.log(web3);

web3.eth.getAccounts()
    .then(console.log)
    .catch(console.log);