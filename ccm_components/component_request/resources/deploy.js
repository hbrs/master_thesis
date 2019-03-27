/**
 * @component ccm-component_request
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 * @version 1.0.0
 */

ccm.files['deploy.js'] = {
    "abi": [
        {
            "constant": false,
            "inputs": [],
            "name": "setApproved",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getName",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getDescription",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "isApproved",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getDeveloper",
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
            "constant": true,
            "inputs": [],
            "name": "getRequirements",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getFund",
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
            "inputs": [],
            "name": "getFounder",
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
            "constant": false,
            "inputs": [],
            "name": "setDeveloper",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "_name",
                    "type": "string"
                },
                {
                    "name": "_requirements",
                    "type": "string"
                },
                {
                    "name": "_description",
                    "type": "string"
                }
            ],
            "payable": true,
            "stateMutability": "payable",
            "type": "constructor"
        }
    ],
    "bytecode": "0x60806040526040516108e23803806108e28339810180604052606081101561002657600080fd5b81019080805164010000000081111561003e57600080fd5b8201602081018481111561005157600080fd5b815164010000000081118282018710171561006b57600080fd5b5050929190602001805164010000000081111561008757600080fd5b8201602081018481111561009a57600080fd5b81516401000000008111828201871017156100b457600080fd5b505092919060200180516401000000008111156100d057600080fd5b820160208101848111156100e357600080fd5b81516401000000008111828201871017156100fd57600080fd5b50508551909350610117925060009150602086019061016a565b50815161012b90600190602085019061016a565b50805161013f90600290602084019061016a565b5050600380546001600160a01b03191633179055505060048054600160a01b60ff0219169055610205565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106101ab57805160ff19168380011785556101d8565b828001600101855582156101d8579182015b828111156101d85782518255916020019190600101906101bd565b506101e49291506101e8565b5090565b61020291905b808211156101e457600081556001016101ee565b90565b6106ce806102146000396000f3fe6080604052600436106100865760003560e01c80637a444072116100595780637a4440721461016a5780637ae42ff91461019b5780638edd6eb6146101b0578063946bcc30146101d7578063aa1443bd146101ec57610086565b8063105d36451461008b57806317d7de7c146100a25780631a0925411461012c57806328f371aa14610141575b600080fd5b34801561009757600080fd5b506100a06101f4565b005b3480156100ae57600080fd5b506100b7610446565b6040805160208082528351818301528351919283929083019185019080838360005b838110156100f15781810151838201526020016100d9565b50505050905090810190601f16801561011e5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561013857600080fd5b506100b76104dc565b34801561014d57600080fd5b5061015661053a565b604080519115158252519081900360200190f35b34801561017657600080fd5b5061017f61054a565b604080516001600160a01b039092168252519081900360200190f35b3480156101a757600080fd5b506100b7610559565b3480156101bc57600080fd5b506101c56105b9565b60408051918252519081900360200190f35b3480156101e357600080fd5b5061017f6105be565b6100a06105cd565b6003546001600160a01b031633146102565760408051600160e51b62461bcd02815260206004820152600d60248201527f4f6e6c7920666f756e6465722100000000000000000000000000000000000000604482015290519081900360640190fd5b306001600160a01b03166328f371aa6040518163ffffffff1660e01b815260040160206040518083038186803b15801561028f57600080fd5b505afa1580156102a3573d6000803e3d6000fd5b505050506040513d60208110156102b957600080fd5b5051156103105760408051600160e51b62461bcd02815260206004820152601b60248201527f436f6d706f6e656e7420616c726561647920617070726f766564210000000000604482015290519081900360640190fd5b6004546001600160a01b03166103705760408051600160e51b62461bcd02815260206004820152601560248201527f4e6f20646576656c6f7065722073657420796574210000000000000000000000604482015290519081900360640190fd5b600460009054906101000a90046001600160a01b03166001600160a01b03166108fc306001600160a01b0316638edd6eb66040518163ffffffff1660e01b815260040160206040518083038186803b1580156103cb57600080fd5b505afa1580156103df573d6000803e3d6000fd5b505050506040513d60208110156103f557600080fd5b50516040518115909202916000818181858888f1935050505015801561041f573d6000803e3d6000fd5b506004805474ff00000000000000000000000000000000000000001916600160a01b179055565b60008054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156104d25780601f106104a7576101008083540402835291602001916104d2565b820191906000526020600020905b8154815290600101906020018083116104b557829003601f168201915b5050505050905090565b60028054604080516020601f60001961010060018716150201909416859004938401819004810282018101909252828152606093909290918301828280156104d25780601f106104a7576101008083540402835291602001916104d2565b600454600160a01b900460ff1690565b6004546001600160a01b031690565b60018054604080516020601f600260001961010087891615020190951694909404938401819004810282018101909252828152606093909290918301828280156104d25780601f106104a7576101008083540402835291602001916104d2565b303190565b6003546001600160a01b031690565b6004546001600160a01b03161561062e5760408051600160e51b62461bcd02815260206004820152601660248201527f446576656c6f70657220616c7265616479207365742100000000000000000000604482015290519081900360640190fd5b670de0b6b3a764000034101561068e5760408051600160e51b62461bcd02815260206004820152601e60248201527f506c656173652073656e64206f6e65204574686572206465706f736974210000604482015290519081900360640190fd5b600480546001600160a01b0319163317905556fea165627a7a72305820579d5d77cb5b07af8de08c0adde29e1181898aac986adb2fe9b40f917bb1c8af0029"
};