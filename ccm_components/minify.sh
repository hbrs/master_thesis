#!/usr/bin/env bash

# https://github.com/Rich-Harris/butternut

# install
#npm install --global npm
#npm install --global butternut

# minify
squash --check --sourcemap -i web3/ccm.web3.js -o web3/ccm.web3.min.js
squash --check --sourcemap -i metamask/ccm.metamask.js -o metamask/ccm.metamask.min.js

squash --check --sourcemap -i node_state/ccm.node_state.js -o node_state/ccm.node_state.min.js
squash --check --sourcemap -i node_state/versions/ccm.node_state-1.0.0.js -o node_state/versions/ccm.node_state-1.0.0.min.js
squash --check --sourcemap -i node_state/resources/html_state.js -o node_state/resources/html_state.min.js

#squash --check --sourcemap -i lottery/ccm.lottery.js -o lottery/ccm.lottery.min.js