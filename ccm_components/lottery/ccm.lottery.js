/**
 * @component ccm-lottery
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 * @version 1.0.0
 */

"use strict";

( () => {

    const component = {

        name: 'lottery',

        ccm: {
            url: 'https://ccmjs.github.io/ccm/versions/ccm-18.6.8.min.js',
            integrity: 'sha384-PnqnIRmePKkglGAFgJCKvXYVLkMYjZ+kySHxtNQS0kH2dIXKwISMKu2irzx+YyCY',
            crossorigin: 'anonymous'
        },

        config: {
            css: ['ccm.load', 'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css'],
            web3: [
                'ccm.instance',
                'https://hbrs.github.io/master_thesis/ccm_components/web3/versions/ccm.web3-1.0.0.js'
            ],
            metamask: [
                'ccm.instance',
                'https://hbrs.github.io/master_thesis/ccm_components/web3/versions/ccm.web3-1.0.0.js'
            ],
            html: [
                'ccm.load',
                'https://hbrs.github.io/master_thesis/ccm_components/lottery/resources/html_lottery.js'
            ],
            abi: [
                'ccm.load',
                'https://hbrs.github.io/master_thesis/ccm_components/lottery/resources/abi_lottery.js'
            ]
        },

        Instance: function () {

            /* Lifecycle */

            this.init   = async () => {};
            this.ready  = async () => {};
            this.start  = async () => {

                let number;

                this.web3.provider.setProvider(window['ethereum']);

                // check if the connection to Metamask was successful
                // if not show an error and stop rendering this component
                if (!this.web3.isConnected()) {
                    this.element.innerHTML = '<div style="color: red;">Not connected!<br />Make sure <a href="https://metamask.io/">Metamask</a> is installed</div>';
                    return;
                }

                // show the current jackpot in the card footer.
                this.web3.contract.call(this.abi, this.contract, "getJackpot", [])
                    .then((result) => this.setJackpot(result));

                this.web3.contract.registerFilter(
                    this.abi,
                    "0x" + this.contract,
                    "ePlay",
                    {

                    },
                    (error, result) => {

                        this.setJackpot(result.args._jackpot.toString());

                        if (!result.args._result) {
                            this.addResult(number);
                        } else {
                            this.element.querySelector("#winner").innerHTML =
                                `Congratulations you won ${this.web3.fromWei(result.args._jackpot.toString(), 'ether')} ether!`;
                            this.element.querySelector("#winner").parentNode.style = "display: block;";
                        }
                    });


                this.ccm.helper.setContent(this.element, this.ccm.helper.html(this.html, {
                    play: async () => {

                        number = this.element.querySelector('#number').value;

                        if (!this.web3.isAddress(this.contract)) {
                            this.element.querySelector("#error").innerHTML = 'Invalid contract address!';
                            this.element.querySelector("#error").parentNode.style = "display: block;";

                            return;
                        } else if (isNaN(number) || number == 0) {
                            this.element.querySelector("#error").innerHTML = 'Invalid number!';
                            this.element.querySelector("#error").parentNode.style = "display: block;";

                            return;
                        } else if (!await this.web3.contract.call(this.abi, this.contract, "isOpen", [])) {
                            this.element.querySelector("#error").innerHTML = 'This lottery is already over!';
                            this.element.querySelector("#error").parentNode.style = "display: block;";

                            return;
                        }

                        this.web3.contract.sendTransaction (
                            this.abi,
                            this.contract,
                            "play",
                            [number],
                            this.web3.toWei(0.01, 'ether')
                        );
                    }
                }));
            };


            /* Functions */

            this.setJackpot = (value) => {
                this.element.querySelector("#jackpot").innerHTML = `${this.web3.fromWei(value, 'ether')} ether.`;
            };

            this.addResult = (number) => {

                const span = document.createElement('span');

                span.appendChild(document.createTextNode(number + ", "));
                span.style = 'text-decoration: line-through; color: red;';

                this.element.querySelector("#results")
                    .appendChild(span);
            };
        }
    };

    let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();