/**
 * @component ccm-certificate_student
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 * @version 1.0.0
 */

ccm.files['abi.js'] = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "_firstname",
                "type": "string"
            },
            {
                "name": "_lastname",
                "type": "string"
            }
        ],
        "name": "enroll",
        "outputs": [
            {
                "name": "enrolled",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_student",
                "type": "address"
            }
        ],
        "name": "getStudent",
        "outputs": [
            {
                "name": "firstname",
                "type": "string"
            },
            {
                "name": "lastname",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];