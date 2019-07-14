### Setup (with Docker)
    docker pull node:latest &&\
    docker run \
        -it \
        --rm \
        -v "$PWD":/usr/src/app \
        -w /usr/src/app \
        node:latest \
            bash

### Step 0: package.json

    git pull origin master

Check if dependencies are up to date:
- https://www.npmjs.com/search?q=bn.js
- https://www.npmjs.com/search?q=lodash
- https://www.npmjs.com/search?q=webpack
- https://www.npmjs.com/search?q=webpack-cli

> Edit web3 version

### Step 1: Update
    npm run update

### Step 2: Clean up
    npm run clean

### Step 3: Install
    npm install

### Step 4: Build
    npm run build
    npm run build:prod