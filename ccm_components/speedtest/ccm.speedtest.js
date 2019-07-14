/**
 * @component ccm-speedtest
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 */

"use strict";

(() => {

    const component = {

        name: 'speedtest',
        ccm: 'https://ccmjs.github.io/ccm/versions/ccm-21.1.0.min.js',

        config: {
            web3: [
                'ccm.instance',
                'https://ccmjs.github.io/rmueller-components/web3/versions/ccm.web3-3.0.0.js'
            ],
            metamask: [
                'ccm.instance',
                'https://ccmjs.github.io/rmueller-components/metamask/versions/ccm.metamask-1.0.0.js'
            ],
            abi: [
                'ccm.load',
                '../speedtest/resources/abi.js'
            ],
            store: [ "ccm.store", { 'name': 'rmuel12s_components', url: 'http://localhost:8080' } ]
        },

        Instance: function () {

            /* Lifecycle */

            this.init   = async () => {};
            this.ready  = async () => {};
            this.start  = async () => {
                !this.metamask.isMetaMask() && console.error ('MetaMask is required!', 'https://metamask.io/');
                !this.storeUri              && console.error ('Store URI is missing!');

                //this.store.url = this.storeUri;

                this.web3.setProvider (this.metamask.getProvider(), {transactionConfirmationBlocks: 1});

                this.metamask.enable            (this.accountChanged);
                this.metamask.onAccountsChanged (this.accountChanged);

                this.contract = this.web3.eth.contract.new (this.abi, '0xe9a3f9f930aa83140dab26b42163c2db61cdc9c1');

                this.ccm.helper.setContent (this.element, this.ccm.helper.html({
                    "tag": "table",
                    "inner": [
                        {
                            "tag": "tr",
                            "inner": [
                                {
                                    "tag": "th",
                                    "inner": "Blockchain"
                                },
                                {
                                    "tag": "th",
                                    "inner": "Mongo"
                                }
                            ]
                        },
                        {
                            "tag": "tr",
                            "inner": [
                                {
                                    "tag": "td",
                                    "inner": {
                                        "tag": "button",
                                        "data-type": "blockchain",
                                        "data-function": "oneValue",
                                        "onclick": this.measureTime,
                                        "inner": "one value"
                                    }
                                },
                                {
                                    "tag": "td",
                                    "inner": {
                                        "tag": "button",
                                        "data-type": "mongo",
                                        "data-function": "oneValue",
                                        "onclick": this.measureTime,
                                        "inner": "one value"
                                    }
                                }
                            ]
                        }
                    ]
                }));
            };


            /* Functions */

            this.accountChanged = accounts =>
                this.account = accounts [0];

            this.measureTime = event => {

                const t = event.target.getAttribute ('data-type');
                const f = event.target.getAttribute ('data-function');

                console.time (`${t}.${f}`);

                this [t][f] ();

                console.timeEnd (`${t}.${f}`);
            };

            this.blockchain = {
                oneValue: event => {
                    this.web3.eth.contract.call (this.contract, 'getDescription')
                        .then (console.log)
                        .catch  (console.error);
                }
            };

            this.mongo = {
                oneValue: event => {
                    this.store
                        .get()
                        //.get('0xe9a3f9f930aa83140dab26b42163c2db61cdc9c1')
                        .then(console.log)
                        .catch  (console.error);
                }
            };
        }
    };

    let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
})();