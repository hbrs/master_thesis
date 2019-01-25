/**
 * @component ccm-node_info
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 * @version 1.0.0
 */

"use strict";

( () => {

    const component = {

        name: 'node_state',
        version: [1, 0, 0],

        ccm: {
            url: 'https://ccmjs.github.io/ccm/versions/ccm-18.6.8.min.js',
            integrity: 'sha384-PnqnIRmePKkglGAFgJCKvXYVLkMYjZ+kySHxtNQS0kH2dIXKwISMKu2irzx+YyCY',
            crossorigin: 'anonymous'
        },

        config: {
            css: ['ccm.load', 'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css'],
            js: ['ccm.load', ['https://code.jquery.com/jquery-3.3.1.min.js', 'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js']],
            web3: ['ccm.instance', 'https://cdn.jsdelivr.net/gh/hbrs/master_thesis@latest/ccm_components/web3/ccm.web3.min.js'],
            metamask: ['ccm.instance', 'https://cdn.jsdelivr.net/gh/hbrs/master_thesis@latest/ccm_components/metamask/ccm.metamask.min.js'],

            html: ['ccm.load', 'https://cdn.jsdelivr.net/gh/hbrs/master_thesis@latest/ccm_components/node_state/resources/html_state.js']
        },

        Instance: function () {

            /* Lifecycle */

            this.init = async () => {};
            this.ready  = async () => {};
            this.start  = async () => {

                if(this.provider === 'metamask' && this.metamask.isMetaMask())
                    this.web3.provider.setProvider(this.metamask.getProvider());
                else
                    this.web3.provider.setByUri(this.provider);

                if(this.web3.isConnected()) {
                    this.html.inner[1].inner[0].inner.class = "list-group-item list-group-item-success";
                    this.html.inner[1].inner[0].inner.inner = "Connected";
                } else {
                    this.html.inner[1].inner[0].inner.class = "list-group-item list-group-item-danger";
                    this.html.inner[1].inner[0].inner.inner = "Not connected!";
                }

                this.html.inner[1].inner[2].inner[1].inner[1].inner = this.web3.version.api();
                this.html.inner[1].inner[2].inner[2].inner[1].inner = await this.web3.version.node();
                this.html.inner[1].inner[2].inner[3].inner[1].inner = await this.web3.version.network();
                this.html.inner[1].inner[2].inner[4].inner[1].inner = await this.web3.version.ethereum();

                this.html.inner[1].inner[4].inner[1].inner[1].inner = await this.web3.net.isListening();
                this.html.inner[1].inner[4].inner[2].inner[1].inner = await this.web3.net.peerCount();


                this.ccm.helper.setContent(this.element, this.ccm.helper.html(this.html, {}));
                //this.ccm.helper.setContent(this.element, `<span style="font-size: 1em; color: red;"><i class="fas fa-check-circle"></i></span>`);

                this.showToast(document.querySelector(this.selector));
            };


            /* Functions */

            this.showToast = (element) => {
                element.addEventListener('click', () => {
                    $(this.element.querySelector('#toast')).toast("show");
                });
            };
        }
    };

    let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();