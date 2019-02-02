/**
 * @component ccm-notary
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 * @version 1.0.0
 */

ccm.files['abi_notary.js'] = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "_document_hash",
                "type": "bytes32"
            },
            {
                "name": "prev_version",
                "type": "bytes32"
            }
        ],
        "name": "addDocument",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_document_hash",
                "type": "bytes32"
            }
        ],
        "name": "getDocumentOwner",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "isAdded",
                "type": "bool"
            },
            {
                "indexed": false,
                "name": "documentHash",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "prev_version",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "name": "eDocumentAdded",
        "type": "event"
    }
];