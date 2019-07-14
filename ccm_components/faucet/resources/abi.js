/**
 * @component ccm-faucet
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 * @version 2.0.0
 */

ccm.files['abi.js'] = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "_receiver",
                "type": "address"
            }
        ],
        "name": "requestEther",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "etherLeft",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_receiver",
                "type": "address"
            }
        ],
        "name": "getBalance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];