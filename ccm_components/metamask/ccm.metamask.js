/**
 * @component ccm-web3
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 * @version 1.0.0
 */

/**
 * MetaMask attributes, functions and events
 *
 * @attribute: isMetaMask: bool
 * @attribute: networkVersion: string
 * @attribute: selectedAddress: string
 *
 * @function: isConnected: bool
 * @function: enable: Promise
 *
 * @events: accountsChanged
 *
 */

( function () {

    const component = {

        name: 'metamask',

        ccm: {
            url: 'https://ccmjs.github.io/ccm/versions/ccm-18.6.8.min.js',
            integrity: 'sha384-PnqnIRmePKkglGAFgJCKvXYVLkMYjZ+kySHxtNQS0kH2dIXKwISMKu2irzx+YyCY',
            crossorigin: 'anonymous'
        },

        config: {
            connected: false
        },

        Instance: function () {

            /* Lifecycle */

            this.init   = async () => {};
            this.ready  = async () => {};
            this.start  = async () => {};


            /* Functions */

            this.getProvider = () => {
                return ethereum;
            };

            this.isMetaMask = () => {
                return !(
                    typeof window['ethereum'] === 'undefined' ||
                    typeof window['ethereum']['isMetaMask'] === 'undefined' ||
                    ethereum.isConnected()
                );
            };

            this.getNetworkVersion = () => {
                return ethereum.networkVersion;
            };

            this.getSelectedAddress = () => {
                return ethereum.selectedAddress;
            };

            this.connectToMetaMask = () => {
                ethereum.enable()
                    .catch(reason => console.error(reason))
                    .then(accounts => this.connected = true);
            };

            this.registerEvent = (event, callback) => {
                ethereum.on(event, accounts => callback(accounts));
            };
        }
    };

    let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();