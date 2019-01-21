# Clean blockchain

### Only blockchain

    docker stop bootnode geth1 geth2                            &&\
    docker rm bootnode geth1 geth2                              &&\

    sudo su                                                     &&\
    rm -R /var/lib/docker/volumes/v_geth/_data/geth1/ge*        &&\
    rm -R /var/lib/docker/volumes/v_geth/_data/geth2/g*         &&\
    
    tree -L 3 /var/lib/docker/volumes/v_geth/_data              &&\

    exit

### Full clean up

    docker stop bootnode geth1 geth2 nodejs nginx letsencrypt   &&\
    docker rm   bootnode geth1 geth2 nodejs nginx letsencrypt   &&\
    
    docker volume rm v_geth v_nginx v_letsencrypt               &&\
    
    docker ps -a                                                &&\
    docker volume ls
