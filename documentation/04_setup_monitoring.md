# Setup monitoring

Prev: [Setup blockchain](./02_run_blockchain.md)
Clean blockchain: [Clean blockchain](./02_clean_blockchain.md)

### Step 07: Get certificate from lets encrypte
    docker run                                              \
        --interactive                                       \
        --tty                                               \
        --name          letsencrypt                         \
        --hostname      letsencrypt.vm-2d05.inf.h-brs.de    \
        --net           dockernet                           \
        --ip            172.22.0.40                         \
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

*Add this content*: [default.conf](./04_1_nginx_conf.md)

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
        --volume /tmp:/tmp   \
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
