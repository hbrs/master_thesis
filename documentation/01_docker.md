# Docker

[Docu](https://hub.docker.com/r/ethereum/client-go)

### Addresses
- IP Address: 194.95.66.64
- RPC Port: 8545

### 01: Setup network
    sudo docker network create \
        --driver=bridge \
        --subnet=172.22.0.0/24 \
        --ip-range=172.22.0.254/24 \
        --gateway=172.22.0.1 \
        dockernet

### 02: Create volumn
    sudo docker volume rm geth_1 && \
    sudo docker volume create geth_1 && \
    sudo docker volume ls

### 03: Create account
    echo "12345678" > /tmp/password.txt

    sudo docker run \
        -it \
        --rm \
        --volume /tmp/password.txt:/tmp/password.txt \
        --volume geth_1:/root \
        ethereum/client-go:stable \
            account new \
                --datadir "/root" \
                --password /tmp/password.txt

### 03: Create genesis block

    cd /tmp && \
    nano /tmp/genesis.json

    // content of `genesis.json`:
    {
        "config": {
            "chainId": 32,
            "homesteadBlock": 0,
            "eip155Block": 0,
            "eip158Block": 0
        },
        "alloc"         : {},
        "difficulty"    : "0x20000",
        "gasLimit"      : "0x2fefd8",
        "nonce"         : "0x6800300660911093",
        "mixhash"       : "0x0000000000000000000000000000000000000000000000000000000000000000",
        "parentHash"    : "0x0000000000000000000000000000000000000000000000000000000000000000",
        "timestamp"     : "0x0"
    }

### 04: Init blockchain
    sudo docker run \
        --rm \
        --volume /tmp/genesis.json:/tmp/genesis.json \
        --volume geth_1:/root \
        ethereum/client-go:stable \
            init \
                --datadir "/root" \
                /tmp/genesis.json
    
### 04: Run node
    sudo docker stop geth_1 &&\
    sudo docker rm geth_1 &&\
    sudo docker run \
        --detach \
        --restart unless-stopped \
        --name geth_1 \
        --hostname geth_1 \
        --net dockernet \
        --ip 172.22.0.10 \
        --volume /tmp/password.txt:/tmp/password.txt \
        --volume geth_1:/root \
        --publish 8545:8545 \
        --publish 30303:30303 \
        ethereum/client-go:stable \
            --datadir "/root" \
            --nousb \
            --networkid 32 \
            --identity "geth_1" \
            --unlock 0 \
            --password /tmp/password.txt \
            --rpc \
            --rpcaddr "0.0.0.0" \
            --rpcport 8545 \
            --rpcapi "eth,net,web3,miner,rpc" \
            --rpccorsdomain "*" \
            --port 30303 \
            --maxpeers 8 \
            --nat "any" \
            --nodiscover \
            --mine \
            --minerthreads 1 \
            --targetgaslimit 4712388 \
            --gasprice 18000000000 \
            --verbosity 3 &&\
    sudo docker logs -f geth_1

Full list of possible parameter: [https://github.com/ethereum/go-ethereum/wiki/Command-Line-Options](https://github.com/ethereum/go-ethereum/wiki/Command-Line-Options)

### 05: Attach to node
    sudo docker run \
        -it \
        --rm \
        --volume geth_1:/root \
        ethereum/client-go:stable \
            --datadir "/root" \
            --networkid 32 \
            attach

### 06: Setup node
- check accounts: `eth.accounts` 
- create account: `personal.newAccount("12345678")`
    - first account is coinbase account
- unlock account: `personal.unlockAccount("address", "pw")`
- get account balance: `web3.fromWei(eth.getBalance(eth.coinbase), "ether")`

### 07: Setup monitoring
    sudo docker run \
        -it \
        --rm \
        --name nodejs \
        --publish 3000:3000 \
        --hostname nodejs \
        --net dockernet \
        --ip 172.22.0.22 \
        --workdir /usr/src/app \
        node:latest \
            /bin/bash

    apt update &&\
    apt install nano &&\

    git clone https://github.com/cubedro/eth-net-intelligence-api.git &&\
    git clone https://github.com/cubedro/eth-netstats.git &&\

    npm install -g pm2 &&\
    npm install -g grunt-cli &&\

    cd eth-net-intelligence-api &&\

    npm install &&\

    nano app.json

    pm2 start app.json

    cd ../eth-netstats && \

    npm install &&\
    grunt &&\

    export WS_SECRET=secret &&\

    npm start
