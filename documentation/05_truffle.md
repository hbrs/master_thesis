# Solidity Truffle

### How to run a dev enviroment with Truffle

---

__Requirements:__ Fresh installed Linux system (OS, Docker, VM, ...).

---

### Step 1: Installation basics

__Install:__

- [go-lang](https://golang.org)
	- [How to install](https://golang.org/doc/install)
- [Geth & Tools](https://geth.ethereum.org/downloads/)
- [Node.js & NPM](https://nodejs.org/en/download/)
- solc?

### Step 2: Install `truffle`

[Homepage](https://www.truffleframework.com)

	npm install -g truffle

### Step 3: Run private Blockchain

Read: [Setup private Blockchain](./private_blockchain.md)

	geth --datadir {path/to/localnet} --rpc --rpcapi eth,net,web3 --nodiscover --networkid 15 --bootnodes {URI}

### Step 4: Init `truffle` project

	mkdir {project}
	cd {project}
	
	truffle init

### Step 5: Edit `truffle.js`

Add the following export at the end:

	module.exports = {
	  networks: {
	    localnet: {
	      host: "127.0.0.1",
	      port: 8545,
	      network_id: "15",
	      gas: 3500000
	    }
	  }
	};

### Step 6: Run test, compile and migrate

	truffle test
	truffle compile
	truffle migrate --network localnet
	
	// for restet
	truffle migrate --reset --network hbrs

### Step 7: Interact with contracts (Console)

	truffle console --network localnet
	
	A.at("{address}").setA(45);
