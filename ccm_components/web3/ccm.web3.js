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

            metamask: ['ccm.component', 'https://localhost/metamask/ccm.metamask.js']
        },

        Instance: function () {

            /* Lifecycle */

            this.init   = async () => {
                this.metamask.Instance();

                this.web3 = new Web3();
                this.web3.setProvider(new this.web3.providers.HttpProvider("https://vm-2d05.inf.h-brs.de/geth1", 0, "admin", "6c854D9a", []));


                //this.web3.setProvider(this.metamask.getProvider());

                console.log(this.versionApi());
                console.log(this.versionNode());
            };
            this.ready  = async () => {};
            this.start  = async () => {};


            /* Functions */

            this.versionApi = () => {
                return this.web3.version.api;
            };

            this.versionNode = () => {
                this.web3.version.node((error, result) => { console.log(result); });
                //return this.web3.version.node;
            };
        }
    };

    let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();