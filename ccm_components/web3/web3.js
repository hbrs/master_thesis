"use strict";

var script = document.createElement("script");  // create a script DOM node
script.src = 'https://cdn.jsdelivr.net/gh/ethereum/web3.js/dist/web3.min.js';  // set its src to the provided URL

document.head.appendChild(script);

class Testy {
    constructor(x) {
        console.log(x);
    }

    meth1() {
        const web3 = new Web3();
        console.log(web3.version.api);
    }
}