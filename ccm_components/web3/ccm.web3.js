/**
 * @component ccm-metamask
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 * @version 1.0.0
 */

( function () {

    const component = {

        name: 'web3',

        ccm: {
            url: 'https://ccmjs.github.io/ccm/versions/ccm-18.6.8.min.js',
            integrity: 'sha384-PnqnIRmePKkglGAFgJCKvXYVLkMYjZ+kySHxtNQS0kH2dIXKwISMKu2irzx+YyCY',
            crossorigin: 'anonymous'
        },

        config: {
            Web3: ['ccm.load', 'https://cdn.jsdelivr.net/gh/ethereum/web3.js/dist/web3.min.js'],

            ccmMetamask: ['ccm.component', 'https://localhost/metamask/ccm.metamask.js']
        },

        Instance: function () {

            /* Lifecycle */

            this.init   = async () => {
                this.ccmMetamask.Instance();

                this.web3 = new Web3();

                if(this.metamask & this.ccmMetamask.isMetaMask()) {
                    this.setProvider(this.ccmMetamask.getProvider());
                    this.ccmMetamask.connectToMetaMask();
                } else {
                    this.setProvider(new this.web3.providers.HttpProvider(this.uri, 0, this.user, this.password, []));
                }

                /*console.log(this.versionApi());
                console.log(await this.nodeVersion());
                console.log(await this.networkVersion());
                console.log(await this.ethereumVersion());
                //console.log(await this.whisperVersion());
                console.log(await this.isConnected());*/
            };
            this.ready  = async () => {};
            this.start  = async () => {};


            /* Functions */

            this.versionApi = () => {
                return this.web3.version.api;
            };

            this.nodeVersion = () => {
                //return this.web3.version.node;
                return new Promise((resolve, reject) => {
                    this.web3.version.getNode((error, result) => { resolve(result); })
                });
            };

            this.networkVersion = () => {
                //return this.web3.version.network;
                return new Promise((resolve, reject) => {
                    this.web3.version.getNetwork((error, result) => { resolve(result); })
                });
            };

            this.ethereumVersion = () => {
                //return this.web3.version.ethereum;
                return new Promise((resolve, reject) => {
                    this.web3.version.getEthereum((error, result) => { resolve(result); })
                });
            };

            this.whisperVersion = () => {
                //return this.web3.version.whisper;
                return new Promise((resolve, reject) => {
                    this.web3.version.getWhisper((error, result) => { resolve(result); })
                });
            };

            this.isConnected = () => {
                return this.web3.isConnected();
            };

            this.setProvider = (provider) => {
                this.web3.setProvider(provider);
            };

            this.setContract= (abi) => {
                this.contract = this.web3.eth.contract(abi);
            };

            this.callContract = (address, f) => {
                this.contract.at(address)[f]( (error, result) => {
                    if (!error)
                        console.log(result);
                    else
                        console.error(error);
                });
            };
        }
    };

    let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();