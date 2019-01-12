# Setup geth with Docker

### Step 01: Setup network
    docker network create           \
        --driver=bridge             \
        --subnet=172.22.0.0/24      \
        --ip-range=172.22.0.254/24  \
        --gateway=172.22.0.1        \
        dockernet

### Step 02: Create volumn
    docker volume rm        v_keys  &&\
    docker volume rm        v_geth1 &&\
    docker volume create    v_keys  &&\
    docker volume create    v_geth1 &&\
    docker volume ls

### Step 03: Generate random keys
    docker run                      \
        --rm                        \
        --interactive               \
        --tty                       \
        --volume        v_keys:/opt \
        --workdir       /opt        \
        ubuntu:latest               \
            bash

*Run within the cointainer:*

    head -200 /dev/urandom          \
        | cksum                     \
        | cut -f1 -d " "            \
        | sha256sum                 \
        | head -c 64 > pw_geth1.txt &&\
    exit

### Step 04: Create account
    docker run                                          \
        --rm                                            \
        --volume                    v_keys:/tmp:ro      \
        --volume                    v_geth1:/root       \
        ethereum/client-go:stable                       \
            account new                                 \
                --datadir           "/root"             \
                --password          "/tmp/pw_geth1.txt"

**Links:**
- https://hub.docker.com/r/ethereum/client-go

### Step 05: Create genesis block
    nano /tmp/genesis.json

    // content of `genesis.json`
    {
        "alloc"         : {},
        "config"        : {
            "chainId"           : 32,
            "homesteadBlock"    : 0,
            "eip155Block"       : 0,
            "eip158Block"       : 0
        },
        "coinbase"      : "0x0000000000000000000000000000000000000000",
        "difficulty"    : "0x200000000",
        "gasLimit"      : "0x2100000",
        "mixhash"       : "0x0000000000000000000000000000000000000000000000000000000000000000",
        "nonce"         : "0x0000000000000000000000000000000000000000000000000000000000000000",
        "parentHash"    : "0x0000000000000000000000000000000000000000000000000000000000000000",
        "timestamp"     : "0x1547310609"
    }

- Offical source: [https://github.com/ethereum/go-ethereum/wiki/Private-network](https://github.com/ethereum/go-ethereum/wiki/Private-network)
- [https://arvanaghi.com/blog/explaining-the-genesis-block-in-ethereum/](https://arvanaghi.com/blog/explaining-the-genesis-block-in-ethereum/)
- [https://lightrains.com/blogs/genesis-json-parameter-explained-ethereum](https://lightrains.com/blogs/genesis-json-parameter-explained-ethereum)

### Step 06: Init blockchain
    docker run                                                              \
        --rm                                                                \
        --volume                    /tmp/genesis.json:/tmp/genesis.json:ro  \
        --volume                    v_geth1:/root                           \
        ethereum/client-go:stable                                           \
            init                                                            \
                --datadir           "/root"                                 \
                /tmp/genesis.json
    
### Step 07: Run node
    export ETHERBASE='0x'
    
    docker pull                     ethereum/client-go:stable                   &&\
    docker stop                     geth1                                       &&\
    docker rm                       geth1                                       &&\
    docker run                                                                  \
        --detach                                                                \
        --restart                   unless-stopped                              \
        --name                      geth1                                       \
        --hostname                  geth1                                       \
        --net                       dockernet                                   \
        --ip                        172.22.0.10                                 \
        --volume                    v_keys:/tmp:ro                              \
        --volume                    v_geth1:/root                               \
        ethereum/client-go:stable                                               \
            --datadir               "/root"                                     \
            --nousb                                                             \
            --networkid             32                                          \
            --identity              "geth1"                                     \
                                                                                \
            --unlock                $ETHERBASE                                  \
            --password              "/tmp/pw_geth1.txt"                         \
                                                                                \
            --rpc                                                               \
            --rpcaddr               "0.0.0.0"                                   \
            --rpcport               8545                                        \
            --rpcapi                "eth,net,web3,rpc"                          \
            --rpccorsdomain         "*"                                         \
            --rpcvhosts             "vm-2d05.inf.h-brs.de"                      \
                                                                                \
            --port                  30303                                       \
            --maxpeers              8                                           \
            --nat                   "any"                                       \
            --nodiscover                                                        \
                                                                                \
            --mine                                                              \
            --minerthreads          8                                           \
            --etherbase             $ETHERBASE                                  \
            --targetgaslimit        4712388                                     \
            --gasprice              18000000000                                 \
                                                                                \
            --verbosity             3                                           &&\
    docker logs -f                  geth1

*Important: Each node needs an own port!*

**Full list of possible parameter**
- [https://github.com/ethereum/go-ethereum/wiki/Command-Line-Options](https://github.com/ethereum/go-ethereum/wiki/Command-Line-Options)
- [https://ethereum.gitbooks.io/frontier-guide/content/cli.html](https://ethereum.gitbooks.io/frontier-guide/content/cli.html)
- [https://github.com/ethereum/go-ethereum/wiki/Management-APIs](https://github.com/ethereum/go-ethereum/wiki/Management-APIs)

### Step 08: Attach to node
    docker run                                          \
        --rm                                            \
        --interactive                                   \
        --tty                                           \
        --volume                    v_geth1:/root:ro    \
        ethereum/client-go:stable                       \
            --datadir               "/root"             \
            --networkid             32                  \
            attach

### Step 09: Connect to node
    // find out nodeId
    admin.nodeInfo
    
    // connect to node
    admin.addPeer("enode://<id>@<ip>:<port>")
    
    // show connected nodes
    admin.peers
    
    // show nodes blocknumber
    eth.blockNumber

### Step 09: API commands
- check accounts: `eth.accounts` 
- create account: `personal.newAccount("12345678")`
    - first account is coinbase account
- unlock account: `personal.unlockAccount("address", "pw")`
- get account balance: `web3.fromWei(eth.getBalance(eth.coinbase), "ether")`
- miner: `miner.start(<#threads>), miner.stop()`

**Links:**
- https://github.com/ethereum/go-ethereum/wiki/Managing-your-accounts

### Step 10: Setup monitoring
    docker run                          \
        --rm                            \
        --interactive                   \
        --tty                           \
        --name          nodejs          \
        --hostname      nodejs          \
        --net           dockernet       \
        --ip            172.22.0.22     \
        --workdir       /usr/src/app    \
        node:latest                     \
            bash

*Run this script within the container:*

    apt update                                                          &&\
    apt install nano                                                    &&\

    git clone https://github.com/cubedro/eth-net-intelligence-api.git   &&\
    git clone https://github.com/cubedro/eth-netstats.git               &&\

    npm install -g pm2                                                  &&\
    npm install -g grunt-cli                                            &&\

    cd eth-net-intelligence-api                                         &&\

    npm install                                                         &&\

    nano app.json                                                       &&\

    pm2 start app.json                                                  &&\

    cd ../eth-netstats                                                  && \

    npm install                                                         &&\
    grunt all                                                           &&\

    export WS_SECRET=secret                                             &&\

    npm start

*Content of `app.json`:*

    {
        "name"              : "geth_1",
        "script"            : "app.js",
        "log_date_format"   : "YYYY-MM-DD HH:mm Z",
        "merge_logs"        : false,
        "watch"             : false,
        "max_restarts"      : 4,
        "exec_interpreter"  : "node",
        "exec_mode"         : "fork_mode",
        "env": {
            "NODE_ENV"        : "production",
            "RPC_HOST"        : "172.22.0.10",
            "RPC_PORT"        : "8545",
            "LISTENING_PORT"  : "30303",
            "INSTANCE_NAME"   : "geth_1",
            "CONTACT_DETAILS" : "",
            "WS_SERVER"       : "http://172.22.0.22:3000",
            "WS_SECRET"       : "secret",
            "VERBOSITY"       : 2
        }
    }

**Links:**
- https://github.com/cubedro/eth-net-intelligence-api
- https://github.com/cubedro/eth-netstats
- https://github.com/ethereum/wiki/wiki/Network-Status
- https://github.com/ethereum/go-ethereum/wiki/Setting-up-monitoring-on-local-cluster
- https://github.com/ethersphere/eth-utils

### Step 11: RPC
*Example:*
    curl \
        -X POST \
        --header "Content-Type: application/json" \
        --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}' \
        https://vm-2d05.inf.h-brs.de

- https://github.com/ethereum/wiki/wiki/JSON-RPC

---

**More links:**
- https://www.polarsparc.com/xhtml/PrivateEthDocker.html
- https://medium.com/@javahippie/building-a-local-ethereum-network-with-docker-and-geth-5b9326b85f37
- https://github.com/ethereum/go-ethereum/wiki/Setting-up-private-network-or-local-cluster
- https://gist.github.com/fishbullet/04fcc4f7af90ee9fa6f9de0b0aa325ab
- https://github.com/ethereum/go-ethereum/wiki/Connecting-to-the-network
