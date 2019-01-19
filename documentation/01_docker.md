# Setup geth with Docker

- [https://hub.docker.com/r/ethereum/client-go/](https://hub.docker.com/r/ethereum/client-go/)

### Step 01: Setup network
    docker network create           \
        --driver=bridge             \
        --subnet=172.22.0.0/24      \
        --ip-range=172.22.0.254/24  \
        --gateway=172.22.0.1        \
        dockernet

### Step 02: Update images
    docker pull ubuntu:latest                       &&\
    docker pull ethereum/client-go:stable           &&\
    docker pull ethereum/client-go:alltools-stable  &&\
    docker pull nginx:stable                        &&\
    docker pull node:latest                         &&\
    docker pull httpd:latest

### Step 02: Create volumn
    docker volume rm        v_letsencrypt   &&\
    docker volume rm        v_nginx         &&\
    docker volume rm        v_geth          &&\
    docker volume create    v_letsencrypt   &&\
    docker volume create    v_nginx         &&\
    docker volume create    v_geth          &&\
    docker volume ls

### Step 03: Generate random password
    docker run                          \
        --rm                            \
        --interactive                   \
        --tty                           \
        --volume        v_geth:/opt     \
        --workdir       /opt/geth1      \
        ubuntu:latest                   \
            bash

*Run within the cointainer:*

    head -200 /dev/urandom          \
        | cksum                     \
        | cut -f1 -d " "            \
        | sha256sum                 \
        | head -c 64 > password.txt &&\
    exit

### Step 04: Create account
    docker run                                                  \
        --rm                                                    \
        --volume                    v_geth:/root                \
        ethereum/client-go:stable                               \
            account new                                         \
                --datadir           "/root/geth1"               \
                --password          "/root/geth1/password.txt"

*Check results:*

    docker run                  \
        --rm                    \
        --interactive           \
        --tty                   \
        --volume v_geth:/tmp    \
        --workdir /tmp          \
        ubuntu:latest           \
            ls -la

**Links:**
- https://hub.docker.com/r/ethereum/client-go

### Step 05: Create genesis block
    docker run                              \
        --rm                                \
        --interactive                       \
        --tty                               \
        --volume /tmp:/genesis              \
        ethereum/client-go:alltools-latest  \
            puppeth

*Proof-of-work:*

> genesis

> 2

> 1

> 1

> `account from step 04`

> `[Enter]`

> yes

> 32

> 2

> 2

> genesis

> `Ctrl` + `C`

*Proof-of-authority*

> genesis
> 2
> 1
> 2
> 16
> `account from step 04`
> `[Enter]`
> `account from step 04`
> `[Enter]`
> yes
> 32
> 2
> 2
> genesis
> `Ctrl` + `C`

- [https://hackernoon.com/setup-your-own-private-proof-of-authority-ethereum-network-with-geth-9a0a3750cda8](https://hackernoon.com/setup-your-own-private-proof-of-authority-ethereum-network-with-geth-9a0a3750cda8)
- Offical source: [https://github.com/ethereum/go-ethereum/wiki/Private-network](https://github.com/ethereum/go-ethereum/wiki/Private-network)
- [https://arvanaghi.com/blog/explaining-the-genesis-block-in-ethereum/](https://arvanaghi.com/blog/explaining-the-genesis-block-in-ethereum/)
- [https://lightrains.com/blogs/genesis-json-parameter-explained-ethereum](https://lightrains.com/blogs/genesis-json-parameter-explained-ethereum)

### Step 06: Init blockchain
    docker run                                                              \
        --rm                                                                \
        --volume                    /tmp/genesis.json:/tmp/genesis.json:ro  \
        --volume                    v_geth:/root                            \
        ethereum/client-go:stable                                           \
            init                                                            \
                --datadir           "/root/geth1"                           \
                /tmp/genesis.json
    
### Step 07: Run node
    export ETHERBASE='0x'

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
            --port                  30303                                       \
            --maxpeers              8                                           \
            --nat                   "any"                                       \
            --nodiscover                                                        \
                                                                                \
            --mine                                                              \
            --etherbase             $ETHERBASE                                  \
                                                                                \
            --verbosity             3                                           &&\
    docker logs -f                  geth1

**Full list of possible parameter**
- [https://github.com/ethereum/go-ethereum/wiki/Command-Line-Options](https://github.com/ethereum/go-ethereum/wiki/Command-Line-Options)
- [https://ethereum.gitbooks.io/frontier-guide/content/cli.html](https://ethereum.gitbooks.io/frontier-guide/content/cli.html)
- [https://github.com/ethereum/go-ethereum/wiki/Management-APIs](https://github.com/ethereum/go-ethereum/wiki/Management-APIs)

### Step 08: Attach to node
    docker run                                          \
        --rm                                            \
        --interactive                                   \
        --tty                                           \
        --volume                    v_geth:/root:ro     \
        ethereum/client-go:stable                       \
            --datadir               "/root/geth1"       \
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

### Step 10: Get certificate from lets encrypte
    docker run                                              \
        --interactive                                       \
        --tty                                               \
        --name          letsencrypt                         \
        --hostname      letsencrypt.vm-2d05.inf.h-brs.de    \
        --net           dockernet                           \
        --ip            172.22.0.19                         \
        --publish       80:80                               \
        --volume        v_letsencrypt:/etc/letsencrypt      \
        ubuntu:latest                                       \
            bash

*Run within the cointainer:*

    apt update                                          && \
    apt upgrade -y                                      && \
    apt install         software-properties-common -y   && \
    add-apt-repository  ppa:certbot/certbot             && \
    apt update                                          && \
    apt install         python-certbot-nginx -y

    certbot certonly --rsa-key-size 4096 --authenticator standalone

### Step 10: Setup reverse proxy

    sudo nano /var/lib/docker/volumes/v_nginx/_data/default.conf
    
*Add this content*: [default.conf](./nginx_conf.md)

    docker run                                              \
        --detach                                            \
        --restart       unless-stopped                      \
        --name          nginx                               \
        --hostname      nginx.vm-2d05.inf.h-brs.de          \
        --net           dockernet                           \
        --ip            172.22.0.20                         \
        --publish       443:443                             \
        --volume        v_letsencrypt:/etc/letsencrypt:ro   \
        --volume        v_nginx:/etc/nginx/conf.d:ro        \
        nginx:stable                                        &&\
    docker logs -f      nginx

*Run:*

    docker run              \
        --rm                \
        --interactive       \
        --tty               \
        -volume /tmp:/tmp   \
        --workdir /tmp      \
        httpd:latest        \
            bash
        
    htpasswd -c /tmp/.htpasswd admin
    openssl dhparam -out /tmp/dhparams.pem 4096
    
    docker cp /tmp/.htpasswd    nginx:/opt/.htpasswd
    docker cp /tmp/dhparams.pem nginx:/root/.nginx/dhparams.pem
    
    docker restart nginx

- [https://docs.nginx.com/nginx/admin-guide/security-controls/configuring-http-basic-authentication/](https://docs.nginx.com/nginx/admin-guide/security-controls/configuring-http-basic-authentication/)
- [https://ethereum.stackexchange.com/questions/30357/restricted-access-authentication-for-a-remote-geth-node](https://ethereum.stackexchange.com/questions/30357/restricted-access-authentication-for-a-remote-geth-node)

### Step 10: Setup monitoring
    docker run                                      \
        --detach                                    \
        --interactive                               \
        --tty                                       \
        --restart       unless-stopped              \
        --name          nodejs                      \
        --hostname      nodejs.vm-2d05.inf.h-brs.de \
        --net           dockernet                   \
        --ip            172.22.0.30                 \
        --workdir       /usr/src/app                \
        node:latest                                 \
            bash                                    &&\
    docker exec                                     \
        --interactive                               \
        --tty                                       \
        nodejs                                      \
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
        "name"              : "geth1",
        "script"            : "app.js",
        "log_date_format"   : "YYYY-MM-DD HH:mm Z",
        "merge_logs"        : false,
        "watch"             : false,
        "max_restarts"      : 8,
        "exec_interpreter"  : "node",
        "exec_mode"         : "fork_mode",
        "env": {
            "NODE_ENV"        : "production",
            "RPC_HOST"        : "172.22.0.10",
            "RPC_PORT"        : "8545",
            "LISTENING_PORT"  : "30303",
            "INSTANCE_NAME"   : "geth1",
            "CONTACT_DETAILS" : "geth1",
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
