/**
 * @component ccm-component_list
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 * @version 2.0.0
 */

"use strict";

(() => {

    const component = {

        name: 'component_list',
        version: [2, 0, 0],
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
            html: [
                'ccm.load',
                'https://ccmjs.github.io/rmueller-components/component_list/resources/html.js'
            ],
            abi: [
                'ccm.load',
                'https://ccmjs.github.io/rmueller-components/component_list/resources/abi.js'
            ],
            css: [
                'ccm.load', [
                    'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
                    'https://cdn.datatables.net/1.10.19/css/jquery.dataTables.css',
                    'https://ccmjs.github.io/rmueller-components/component_list/resources/style.css'
                ]
            ],
            js: [
                'ccm.load', [
                    'https://code.jquery.com/jquery-3.3.1.slim.min.js',
                    'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js',
                    'https://cdn.datatables.net/1.10.19/js/jquery.dataTables.js'
                ]
            ],
            store: [ "ccm.store", { "name": "rmuel12s_components" } ],
            statusText: [
                'Created',
                'Funding',
                'Developing',
                'Pending',
                'Approved'
            ],
            statusColor: [
                'secondary',
                'warning',
                'primary',
                'danger',
                'success'
            ]
        },

        Instance: function () {

            /* Lifecycle */

            this.init   = async () => {};
            this.ready  = async () => {};
            this.start  = async () => {

                !this.metamask.isMetaMask() && console.error ('This component requires MetaMask', 'https://metamask.io/');
                !this.storeUri              && console.error ('Store uri missing!');

                this.store.url = this.storeUri;

                this.web3.setProvider (this.metamask.getProvider(), {transactionConfirmationBlocks: 1});

                this.metamask.enable            (this.accountChanged);
                this.metamask.onAccountsChanged (this.accountChanged);

                this.contract = this.web3.eth.contract.new (this.abi);

                this.store
                    .get    ()
                    .then   (this.initTable);

                this.ccm.helper.setContent (
                    this.element,
                    this.ccm.helper.html (this.html.main, {})
                );
            };


            /* Functions */

            this.accountChanged = accounts => {
                this.account = accounts [0];
            };

            this.initTable = data => {
                data.forEach ((contract, index) => {

                    this.element.querySelector ('tbody').appendChild(
                        this.ccm.helper.html (this.html.row, {
                            index           : index + 1,
                            address         : contract.key,
                            name            : contract.name,
                            requirements    : this.buildRequirementButtons (contract.key, contract.requirements),
                            description     : this.buildDescriptionButton (contract.key, contract.description),
                            fund            : contract.fund,
                            requested       : new Date (contract.created_at).toLocaleDateString(),
                            badge_text      : this.statusText [contract.status],
                            badge_color     : this.statusColor [contract.status],

                            btnFund                 : contract.status < 4   ? '' : 'd-none',
                            btnRegisterDeveloper    : contract.status === 1 ? '' : 'd-none',
                            btnSubmitComponent      : contract.status === 2 ? '' : 'd-none',
                            btnApproveComponent     : contract.status === 3 ? '' : 'd-none',

                            openModal           : this.clickHandler.addFundModal,
                            registerDeveloper   : this.clickHandler.registerDeveloper,
                            submitComponent     : this.clickHandler.submitComponent,
                            approveComponent    : this.clickHandler.approveComponent
                        })
                    );

                    if (contract.status === 0) {

                    }
                });

                $ (this.element.querySelector ('table')).DataTable();
            };

            this.clickHandler = {
                addFundModal: event => {
                    this.setContractAddress (
                        event
                            .target
                            .parentElement
                            .parentElement
                            .getAttribute ('data-address')
                    );

                    this.ccm.helper.setContent (
                        this.element.querySelector ('#modal-area'),
                        this.ccm.helper.html (this.html.modal, {
                            title: 'Add fund',
                            body: {
                                "tag"           : "input",
                                "type"          : "number",
                                "class"         : "form-control",
                                "placeholder"   : "How much would you like to fund?",
                                "autofocus"     : "autofocus"
                            },
                            footer: {
                                "tag": "button",
                                "class": "btn btn-primary btn-sm float-right",
                                "onclick": this.clickHandler.addFund,
                                "inner": [
                                    {
                                        "tag": "span",
                                        "style": "margin-right: 0.4rem;",
                                        "inner": "Add fund"
                                    },
                                    {
                                        "class": "spinner-border spinner-border-sm d-none",
                                        "role": "status"
                                    }
                                ]
                            }
                        })
                    );

                    $ (this.element.querySelector ('.modal')).modal ('show');
                },

                addFund: event => {

                    const button = event.target.nodeName === 'BUTTON' ? event.target : event.target.parentElement;

                    this.fund = this.element.querySelector ('input[type=number]');

                    this.fund.value ?
                        this.fund.classList.remove ('is-invalid') : this.fund.classList.add ('is-invalid');

                    if (!this.fund.value)
                        return;

                    this.toggleSpinner (button, true);

                    this.web3.eth.contract.send (
                        this.contract,
                        'addFund',
                        [],
                        {
                            from:   this.account,
                            value:  this.web3.utils.toWei (Math.abs (this.fund.value).toString(), this.web3.units.ether)
                        }
                    )
                        .then   (result => this.store.get (this.contract.options.address))
                        .then   (this.storeHandler.addFund)
                        .then   (this.reloadWindow)
                        .catch  (console.error);
                },

                registerDeveloper: event => {
                    const button = event.target.nodeName === 'BUTTON' ? event.target : event.target.parentElement;

                    this.setContractAddress (
                        button
                            .parentElement
                            .parentElement
                            .getAttribute ('data-address')
                    );

                    this.toggleSpinner (button, true);

                    this.web3.eth.contract.send (
                        this.contract,
                        'registerDeveloper',
                        [],
                        {
                            from:   this.account,
                            value:  this.web3.utils.toWei ('1', this.web3.units.ether)
                        }
                    )
                        .then   (result => this.store.get (this.contract.options.address))
                        .then   (this.storeHandler.registerDeveloper)
                        .then   (this.reloadWindow)
                        .catch  (console.error);
                },

                submitComponent: event => {
                    const button       = event.target.nodeName === 'BUTTON' ? event.target : event.target.parentElement;

                    this.submission    = prompt ("Please submit your work here:", "");

                    this.setContractAddress (
                        button
                            .parentElement
                            .parentElement
                            .getAttribute ('data-address')
                    );

                    this.toggleSpinner (button, true);

                    this.web3.eth.contract.send (
                        this.contract,
                        'submitComponent',
                        [this.submission],
                        { from:   this.account }
                    )
                        .then   (result => this.store.get (this.contract.options.address))
                        .then   (this.storeHandler.submitComponent)
                        .then   (this.reloadWindow)
                        .catch  (console.error);
                },

                approveComponent: event => {
                    const button    = event.target.nodeName === 'BUTTON' ? event.target : event.target.parentElement;
                    this.sufficient  = confirm ('Approve component?');

                    this.setContractAddress (
                        button
                            .parentElement
                            .parentElement
                            .getAttribute ('data-address')
                    );

                    this.toggleSpinner (button, true);

                    this.web3.eth.contract.send (
                        this.contract,
                        'approveComponent',
                        [this.sufficient],
                        { from:   this.account }
                    )
                        .then   (result => this.store.get (this.contract.options.address))
                        .then   (this.storeHandler.approveComponent)
                        .then   (this.reloadWindow)
                        .catch  (console.error);
                }
            };

            this.storeHandler = {
                addFund: data => {
                    data.fund = parseFloat (data.fund) + Math.abs (this.fund.value);

                    if (data.status === 0)
                        data.status = 1;

                    return this.store.set (data);
                },

                registerDeveloper: data => {
                    data.developer  = this.account;
                    data.fund       = parseFloat (data.fund) + 1;
                    data.status     = 2;

                    return this.store.set (data);
                },

                submitComponent: data => {
                    data.submission = this.submission;
                    data.status     = 3;

                    return this.store.set (data);
                },

                approveComponent: data => {
                    if (this.sufficient) {
                        data.status = 4;
                        data.fund = 0;
                    } else {
                        data.status = 2;
                    }

                    return this.store.set (data);
                }
            };

            this.buildDescriptionButton = (address, description) => {
                return this.ccm.helper.html (this.html.buttonDescription, {
                    click: () => {

                        this.ccm.helper.setContent (
                            this.element.querySelector ('#modal-area'),
                            this.ccm.helper.html (this.html.modal, {
                                title   : 'Description',
                                address : address,
                                body    : description,
                                footer  : ''
                            })
                        );

                        $ (this.element.querySelector ('.modal')).modal ('show');
                    }
                });
            };

            this.buildRequirementButtons = (address, requirements) => {
                return this.ccm.helper.html (this.html.buttonRequirement, {
                    size: requirements.length,
                    click: () => {

                        this.ccm.helper.setContent (
                            this.element.querySelector ('#modal-area'),
                            this.ccm.helper.html (this.html.modal, {
                                title   : 'Requirements',
                                address : address,
                                body    : '<ul>' + requirements.reduce ((accumulator, value, index) => { return accumulator + `<li>${value}</li>`; }, '') + '</ul>',
                                footer  : ''
                            })
                        );

                        $ (this.element.querySelector ('.modal')).modal ('show');
                    }
                });
            };

            this.setContractAddress = address => {
                if (!this.web3.utils.isAddress (address))
                    return false;

                this.contract.options.address = address;
            };

            this.reloadWindow = () => {
                window.location.reload();
            };

            this.toggleSpinner = (button, toggle) => {

                if (toggle) {
                    button.setAttribute ('disabled', 'disabled');
                    button.querySelector ('.spinner-border').classList.remove ('d-none');
                } else {
                    button.removeAttribute ('disabled');
                    button.querySelector ('.spinner-border').classList.add ('d-none');
                }
            };

        }
    };

    let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
})();