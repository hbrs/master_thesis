# How to install geth manuel

### Step 01: Run an ubuntu container
    sudo docker run \
        -it \
        --rm \
        --name ethereum2 \
        --hostname ethereum2 \
        --net dockernet \
        --ip 172.22.0.10 \
        --publish 30303:30303 \
        ubuntu:latest \
            bash

### Step 02: Install requirements
    apt update &&\
    apt install nano wget -y &&\

    cd /tmp &&\

    #wget https://dl.google.com/go/go1.11.4.linux-amd64.tar.gz &&\
    wget https://gethstore.blob.core.windows.net/builds/geth-alltools-linux-amd64-1.8.20-24d727b6.tar.gz &&\

    #tar -C /usr/local -xzf go1.11.4.linux-amd64.tar.gz &&\
    tar -C /usr/local -xzf geth-alltools-linux-amd64-1.8.20-24d727b6.tar.gz &&\

    rm *.tar.gz &&\

    #export GOROOT=/usr/local/go &&\
    #export PATH=$PATH:$GOROOT/bin &&\

    ln -s /usr/local/geth-alltools-linux-amd64-1.8.20-24d727b6/geth /usr/bin/geth &&\
    ln -s /usr/local/geth-alltools-linux-amd64-1.8.20-24d727b6/bootnode /usr/bin/bootnode &&\
    ln -s /usr/local/geth-alltools-linux-amd64-1.8.20-24d727b6/rlpdump /usr/bin/rlpdump &&\
    ln -s /usr/local/geth-alltools-linux-amd64-1.8.20-24d727b6/abigen /usr/bin/abigen &&\
    ln -s /usr/local/geth-alltools-linux-amd64-1.8.20-24d727b6/evm /usr/bin/evm &&\

    geth version

**Check current versions for `go` and `geth` here:**
- https://golang.org/dl/
- https://geth.ethereum.org/downloads/

### Step 03: Run geth

Run `geth` like described in [01 - Setup docker](https://gogs.h7ftn2p4.cloud/Hbrs/master_thesis/src/master/documentation/01_docker.md)
