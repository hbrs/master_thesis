
# Setup the blockchain

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

### Step 03: Create volumn
    docker volume rm        v_letsencrypt   &&\
    docker volume rm        v_nginx         &&\
    docker volume rm        v_geth          &&\
    docker volume create    v_letsencrypt   &&\
    docker volume create    v_nginx         &&\
    docker volume create    v_geth          &&\
    docker volume ls

### Step 04: Generate random password
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

### Step 05: Create account
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

### Step 06: Create genesis block
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

    sudo cp /tmp/genesis.json /var/lib/docker/volumes/v_geth/_data/genesis.json

- [https://hackernoon.com/setup-your-own-private-proof-of-authority-ethereum-network-with-geth-9a0a3750cda8](https://hackernoon.com/setup-your-own-private-proof-of-authority-ethereum-network-with-geth-9a0a3750cda8)
- Offical source: [https://github.com/ethereum/go-ethereum/wiki/Private-network](https://github.com/ethereum/go-ethereum/wiki/Private-network)
- [https://arvanaghi.com/blog/explaining-the-genesis-block-in-ethereum/](https://arvanaghi.com/blog/explaining-the-genesis-block-in-ethereum/)
- [https://lightrains.com/blogs/genesis-json-parameter-explained-ethereum](https://lightrains.com/blogs/genesis-json-parameter-explained-ethereum)

### Step 07: Init blockchain
    docker run                                                              \
        --rm                                                                \
        --volume                    v_geth:/root                            \
        ethereum/client-go:stable                                           \
            init                                                            \
                --datadir           "/root/geth1"                           \
                /root/genesis.json

### Step 08: Generate boot key
    docker run                              \
        --rm                                \
        --volume v_geth:/root               \
        ethereum/client-go:alltools-latest  \
            bootnode                        \
                -genkey /root/boot.key

*Print ID:*

    docker run                              \
        --rm                                \
        --volume v_geth:/root               \
        ethereum/client-go:alltools-latest  \
            bootnode                        \
                -nodekey /root/boot.key     \
                -writeaddress

---

Next: [Running the blockchian](./03_run_blockchain.md)
Clean blockchain: [Clean blockchain](./02_clean_blockchain.md)
