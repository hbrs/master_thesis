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
            contract: '0x5ABF3E7655535b0d08d11eB0184CdF7595EFc6AA',
            web3: [
                'ccm.instance',
                'https://ccmjs.github.io/rmueller-components/web3/versions/ccm.web3-1.0.0.js'
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

                Dropzone.autoDiscover = false;

                if (this.metamask.isMetaMask()) {

                    this.web3.provider.setProvider(this.metamask.getProvider());

                    this.metamask.enable(this.setOwner);
                    this.metamask.onAccountsChanged(this.setOwner);

                } else {
                    console.error ('metamask not installed!');
                }

                // check if the connection to Metamask was successful
                // if not show an error and stop rendering this component
                if (!this.web3.isConnected()) {
                    this.element.innerHTML = '<p class="text-danger">Not connected!<br /> => Make sure <a href="https://metamask.io/">Metamask</a> is installed in your browser!</p>';
                    return;
                }

                this.web3.contract.registerFilter (
                    this.abi,
                    this.contract,
                    'eDocumentAdded',
                    {},
                    (error, result) => {

                        this.dropzone.removeAllFiles();

                        this.element.querySelector('.btn')
                            .classList.remove('display-none');

                        this.element.querySelector('#loader')
                            .classList.add('display-none');

                        if (result.args.isAdded) {
                            this.element.querySelector('#success')
                                .classList.remove('display-none');

                            this.element.querySelector ('#success').innerHTML
                                = `Ownership for document <code>${result.args.documentHash}</code> successfully claimed on <code>${new Date(parseInt(result.args.timestamp)*1000).toLocaleString()}</code>.`;
                                //= `Ownership for document <span class="text-muted">${result.args.documentHash}</span> successfully claimed on 2019-01-30 at 18:30pm.`;
                        } else {
                            this.element.querySelector('#error')
                                .classList.remove('display-none');

                            this.element.querySelector ('#error').innerHTML
                                = `Error: Ownership already claimed by <code>${result.args.owner}</code> on <code>${new Date(parseInt(result.args.timestamp)*1000).toLocaleString()}</code>.`;
                                //= `Error: Ownership already claimed by <span class="text-muted">${result.args.owner}</span> on 2019-01-30 at 18:30pm..`;
                        }
                    });

                this.ccm.helper.setContent (this.element, this.ccm.helper.html(this.html, {
                    contract: this.contract,
                    upload: () => {

                        if (typeof this.owner === 'undefined' || typeof this.hash === 'undefined') {

                            this.element.querySelector('#error')
                                .classList.remove('display-none');

                            this.element.querySelector('#error').innerHTML
                                = 'Error: Please drop an document first!';

                            return;
                        }

                        this.web3.contract.sendTransaction (
                            this.abi,
                            this.contract,
                            'addDocument',
                            [this.hash, this.hash]
                        );

                        this.element.querySelector('.btn')
                            .classList.add('display-none');

                        this.element.querySelector('#loader')
                            .classList.remove('display-none');
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

                    this.element.querySelector('#error')
                        .classList.add('display-none');

                    const reader = new FileReader();

                    reader.onload = event =>
                        this.fileChanged(event.target.result);

                    reader.readAsBinaryString(file);

                }).on('removedfile', file => {
                    this.hash = undefined;
                    this.element.querySelector('#sha256').innerHTML = "";
                });
            };


            /* Functions */

            this.setOwner = accounts => {
                this.owner = accounts[0];

                this.element.querySelector('#owner').innerHTML = this.owner;
            };

            this.fileChanged = (fileContent) => {
                this.hash = CryptoJS.SHA256(fileContent).toString();

                this.element.querySelector('#sha256').innerHTML = this.hash;
            };
        }
    };

    let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();