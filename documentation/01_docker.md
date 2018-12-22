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
    sudo docker volume rm ethereum && \
    sudo docker volume create ethereum && \
    sudo docker volume ls

### 03: Create genesis block

    cd /tmp && \
    nano /tmp/genesis.json

    // content of `genesis.json`:
    {
        "config": {
            "chainId": 15,
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
        "timestamp"     : "0x00"
    }

### 04: Init blockchain
    sudo docker run \
        --rm \
        --volume /tmp:/tmp \
        --volume ethereum:/root \
        ethereum/client-go:latest \
            init \
                --datadir /root \
                /tmp/genesis.json
    
### 04: Run node
    sudo docker stop ethereum && \
    sudo docker rm ethereum && \
    sudo docker run \
        --detach \
        --restart unless-stopped \
        --name ethereum \
        --hostname ethereum \
        --net dockernet \
        --ip 172.22.0.10 \
        --volume ethereum:/root \
        --publish 8545:8545 \
        --publish 30303:30303 \
        ethereum/client-go:latest \
            --datadir /root \
            --rpc \
            --rpcaddr 0.0.0.0 \
            --rpcport "8545" \
            --rpccorsdomain "*" \
            --rpcapi eth,net,web3 \
            --nodiscover \
            --networkid 15 && \
    sudo docker logs -f ethereum

[Parameter](https://github.com/ethereum/go-ethereum/wiki/Command-Line-Options)

### 05: Attach to node
    sudo docker run \
        --rm \
        -it \
        --volume ethereum:/root \
        ethereum/client-go:latest \
            --datadir /root \
            --networkid 15 \
            attach

### 06: Setup node

- check accounts: `eth.accounts` 
- create account: `personal.newAccount("12345678")`
    - first account is coinbase account
- unlock account: `personal.unlockAccount("address", "pw")`
- get account balance: `web3.fromWei(eth.getBalance(eth.coinbase), "ether")`
