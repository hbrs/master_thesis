# Run the blockchain

- Prev prev: [Setup blockchain](./01_setup_blockchain.md)
- Prev: [Clean blockchain](./02_clean_blockchain.md)
- Next: [Setup monitoring](./04_setup_monitoring.md)

---

### Step 01: Start the bootnode
    docker run                                                              \
        --detach                                                            \
        --restart                           unless-stopped                  \
        --name                              bootnode                        \
        --hostname                          bootnode.vm-2d05.inf.h-brs.de   \
        --net                               dockernet                       \
        --ip                                172.22.0.10                     \
        --volume                            v_geth:/root:ro                 \
        ethereum/client-go:alltools-latest                                  \
            bootnode                                                        \
                -addr                       ":30301"                        \
                -nodekey                    "/root/boot.key"                \
                -verbosity                  3                               &&\
    docker logs -f bootnode


### Step 02: Run the main node
    export ETHERBASE='0x'
    export BOOTNODE='enode://<pubkey>@<ip>:<port>'

*Same for proof-of-work and proof-of-authority*

    docker run                                                                  \
        --detach                                                                \
        --restart                   unless-stopped                              \
        --name                      geth1                                       \
        --hostname                  geth1.vm-2d05.inf.h-brs.de                  \
        --net                       dockernet                                   \
        --ip                        172.22.0.11                                 \
        --volume                    v_geth:/root                                \
        ethereum/client-go:stable                                               \
            --datadir               "/root/geth1"                               \
            --nousb                                                             \
            --networkid             32                                          \
            --syncmode              "full"                                      \
            --identity              "geth1"                                     \
                                                                                \
            --unlock                $ETHERBASE                                  \
            --password              "/root/geth1/password.txt"                  \
                                                                                \
            --rpc                                                               \
            --rpcaddr               "0.0.0.0"                                   \
            --rpcport               8545                                        \
            --rpcapi                "eth,net,web3,rpc"                          \
            --rpccorsdomain         "*"                                         \
            --rpcvhosts             "vm-2d05.inf.h-brs.de"                      \
                                                                                \
            --bootnodes             $BOOTNODE                                   \
            --port                  30303                                       \
            --maxpeers              8                                           \
            --nat                   "any"                                       \
                                                                                \
            --mine                                                              \
            --miner.gasprice        1000000000                                  \
            --miner.gaslimit        8000000                                     \
            --miner.etherbase       $ETHERBASE                                  \
                                                                                \
            --verbosity             3                                           &&\
    docker logs -f                  geth1

**Full list of possible parameter**
- [https://github.com/ethereum/go-ethereum/wiki/Command-Line-Options](https://github.com/ethereum/go-ethereum/wiki/Command-Line-Options)
- [https://ethereum.gitbooks.io/frontier-guide/content/cli.html](https://ethereum.gitbooks.io/frontier-guide/content/cli.html)
- [https://github.com/ethereum/go-ethereum/wiki/Management-APIs](https://github.com/ethereum/go-ethereum/wiki/Management-APIs)

### Step 03: Run secondary node
    export BOOTNODE='enode://<pubkey>@<ip>:<port>'

*Same for proof-of-work and proof-of-authority*

    docker run                                                                  \
        --detach                                                                \
        --restart                   unless-stopped                              \
        --name                      geth2                                       \
        --hostname                  geth2.vm-2d05.inf.h-brs.de                  \
        --net                       dockernet                                   \
        --ip                        172.22.0.12                                 \
        --volume                    v_geth:/root                                \
        ethereum/client-go:stable                                               \
            --datadir               "/root/geth2"                               \
            --nousb                                                             \
            --networkid             32                                          \
            --syncmode              "full"                                      \
            --identity              "geth2"                                     \
                                                                                \
            --rpc                                                               \
            --rpcaddr               "0.0.0.0"                                   \
            --rpcport               8545                                        \
            --rpcapi                "eth,net,web3,rpc"                          \
            --rpccorsdomain         "*"                                         \
            --rpcvhosts             "vm-2d05.inf.h-brs.de"                      \
                                                                                \
            --bootnodes             $BOOTNODE                                   \
            --port                  30303                                       \
            --maxpeers              8                                           \
            --nat                   "any"                                       \
                                                                                \
            --miner.gasprice        1000000000                                  \
            --miner.gaslimit        8000000                                     \
            --miner.etherbase       $ETHERBASE                                  \
                                                                                \
            --verbosity             3                                           &&\
    docker logs -f                  geth2

### Step 04: Attach to node
    docker run                                          \
        --rm                                            \
        --interactive                                   \
        --tty                                           \
        --volume                    v_geth:/root:ro     \
        ethereum/client-go:stable                       \
            --datadir               "/root/geth1"       \
            --networkid             32                  \
            attach

- https://github.com/ethereum/go-ethereum/wiki/JavaScript-Console

### Step 05: Connect to node manually (if the `bootnode` isn't running)
    // find out nodeId
    admin.nodeInfo
    
    // connect to node
    admin.addPeer("enode://<pubkey>@<ip>:<port>")
    
    // show connected nodes
    admin.peers

### Step 06: API commands
- check accounts: `eth.accounts` 
- create account: `personal.newAccount("12345678")`
    - first account is coinbase account
- unlock account: `personal.unlockAccount("address", "pw")`
- get account balance: `web3.fromWei(eth.getBalance(eth.coinbase), "ether")`
- miner: `miner.start(<#threads>), miner.stop()`

**Links:**
- https://github.com/ethereum/go-ethereum/wiki/Managing-your-accounts

### Step 07: RPC
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
