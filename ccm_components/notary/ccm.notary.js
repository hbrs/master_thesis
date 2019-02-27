/**
 * @component ccm-notary
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 * @version 1.0.0
 */

"use strict";

( () => {

    const component = {

        name: 'notary',
        ccm: 'https://ccmjs.github.io/ccm/versions/ccm-20.0.0.min.js',

        config: {
            contractAddress: '0x3e81fCDE3DcDBf35EA1c6c36F6AC0D04521c15C8',
            web3: [
                'ccm.instance',
                'https://ccmjs.github.io/rmueller-components/web3/versions/ccm.web3-2.0.0.js'
            ],
            metamask: [
                'ccm.instance',
                'https://ccmjs.github.io/rmueller-components/metamask/versions/ccm.metamask-1.0.0.js'
            ],
            html: [
                'ccm.load',
                'https://ccmjs.github.io/rmueller-components/notary/resources/html_notary.js'
            ],
            abi: [
                'ccm.load',
                'https://ccmjs.github.io/rmueller-components/notary/resources/abi_notary.js'
            ],
            css: [
                'ccm.load', [
                    'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css',
                    'https://cdn.jsdelivr.net/npm/dropzone@5.5.1/dist/min/dropzone.min.css',
                    'https://ccmjs.github.io/rmueller-components/notary/resources/style.css'
                ]
            ],
            js: [
                'ccm.load', [
                    'https://cdn.jsdelivr.net/npm/crypto-js@3.1.9-1/crypto-js.js',
                    'https://cdn.jsdelivr.net/npm/dropzone@5.5.1/dist/min/dropzone.min.js'
                ]
            ]
        },

        Instance: function () {

            /* Lifecycle */

            this.init   = async () => {};
            this.ready  = async () => {};
            this.start  = async () => {

                if (this.metamask.isMetaMask()) {

                    this.web3.setProvider(this.metamask.getProvider());

                    this.metamask.enable(this.setOwner);
                    this.metamask.onAccountsChanged(this.setOwner);

                } else {
                    console.error ('metamask not installed!');

                    this.element.innerHTML =
                        `
                        <p class="text-danger">
                            Not connected!
                            <br />=> Make sure <a href="https://metamask.io/">Metamask</a> is installed in your browser!
                        </p>
                        `;

                    return;
                }

                this.contract =
                    this.web3.eth.contract.new (this.abi, this.contractAddress);

                this.web3.eth.contract.events(this.contract, 'eDocumentAdded', { fromBlock: 'latest' })
                    .on('data', data => {

                        this.dropzone.removeAllFiles();
                        this.toggleButton();

                        if (data.returnValues.isAdded) {
                            this.showSuccess(
                                `Ownership for document 
                                <code>${data.returnValues.documentHash}</code> 
                                successfully claimed on 
                                <code>
                                ${new Date(parseInt(data.returnValues.timestamp) * 1000).toLocaleString()}
                                </code>.`
                            );
                        } else {
                            this.showError(
                                `Error: Ownership already claimed by 
                                <code>${data.returnValues.owner}</code> 
                                on 
                                <code>
                                ${new Date(parseInt(data.returnValues.timestamp) * 1000).toLocaleString()}
                                </code>.`
                            );
                        }
                    })
                    .on('error', console.error);

                this.ccm.helper.setContent (this.element, this.ccm.helper.html(this.html, {
                    contract: this.contractAddress,
                    upload: () => {

                        if (typeof this.owner === 'undefined' || typeof this.hash === 'undefined') {

                            this.showError(
                                `Error: Please drop an document first!`
                            );

                            return;
                        }

                        /* transaction to the blockchain */
                        this.web3.eth.contract.send (
                            this.contract,
                            'addDocument(bytes32,bytes32)',
                            [this.hash, this.hash],
                            {
                                from:   this.owner,
                                value:  0
                            }
                        );

                        this.toggleButton();
                    }
                }));

                this.dropzone = new Dropzone (this.element.querySelector('.dropzone'), {
                        url: "#",
                        parallelUploads: 1,
                        maxFilesize: 512,
                        maxFiles: 1,
                        //acceptedFiles: 'image/*,application/pdf,.psd',
                        autoProcessQueue: false,
                        autoQueue: true,
                        addRemoveLinks: true,
                        dictDefaultMessage: 'Drop the document here for which you want to claim ownership.',
                        dictRemoveFile: 'Remove document'
                    }
                ).on('addedfile', file => {

                    this.cleanMessages();

                    const reader = new FileReader();

                    reader.onload = event =>
                        this.fileChanged(event.target.result);

                    reader.readAsBinaryString(file);

                }).on('removedfile', file => {
                    this.hash = undefined;
                    this.element.querySelector('#sha256').innerHTML = "No document dropped yet";
                });
            };


            /* Functions */

            this.setOwner = accounts => {
                this.owner = accounts[0];

                this.element.querySelector('#owner').innerHTML = this.owner;
            };

            this.fileChanged = fileContent => {
                this.hash = '0x' + CryptoJS.SHA256(fileContent).toString();

                this.element.querySelector('#sha256').innerHTML = this.hash;
            };

            this.toggleButton = () => {

                if( this.element.querySelector('#loader').classList.contains('display-none') ) {

                    this.element.querySelector('.btn')
                        .setAttribute('disabled', 'disabled');

                    this.element.querySelector('#loader')
                        .classList.remove('display-none');
                } else {

                    this.element.querySelector('.btn')
                        .removeAttribute('disabled');

                    this.element.querySelector('#loader')
                        .classList.add('display-none');
                }
            };

            this.cleanMessages = () => {

                this.element.querySelector('#error')
                    .classList.add('display-none');

                this.element.querySelector('#success')
                    .classList.add('display-none');
            };

            this.showSuccess = (message) => {

                this.element.querySelector('#success')
                    .classList.remove('display-none');

                this.element.querySelector ('#success').innerHTML = message;
            };

            this.showError = (message) => {

                this.element.querySelector('#error')
                    .classList.remove('display-none');

                this.element.querySelector ('#error').innerHTML = message;
            };
        }
    };

    let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();