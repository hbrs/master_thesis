/**
 * @component ccm-component_list
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 * @version 1.0.0
 */

"use strict";

(() => {

    const component = {

        name: 'component_list',
        version: [1, 0, 0],
        ccm: 'https://ccmjs.github.io/ccm/versions/ccm-20.0.0.min.js',

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
            store: [ "ccm.store", { "name": "rmuel12s_components", url: "wss://ccm2.inf.h-brs.de" } ],
            statusText: [
                'Funding',
                'Developing',
                'Pending',
                'Approved'
            ],
            statusColor: [
                'warning',
                'primary',
                'danger',
                'success'
            ],
            statusTextAction: [
                'Develop it',
                'Submit work',
                'Approve work'
            ]
        },

        Instance: function () {

            /* Lifecycle */

            this.init   = async () => {};
            this.ready  = async () => {};
            this.start  = async () => {

                !this.metamask.isMetaMask() && console.error ('This component requires MetaMask', 'https://metamask.io/');
                !this.storeUri              && console.error ('Store uri missing!'); // todo

                this.web3.setProvider (this.metamask.getProvider ());

                this.metamask.enable (
                    accounts =>
                        this.account = accounts [0]
                );

                this.metamask.onAccountsChanged (
                    accounts =>
                        this.account = accounts [0]
                );

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

            this.initTable = data => {
                data.forEach ((contract, index) => {
                    this.element.querySelector ('tbody')
                        .appendChild(
                            this.ccm.helper.html (this.html.row, {
                                index           : index + 1,
                                name            : contract.name,
                                requirements    : this.buildRequirementButtons (contract.key, contract.requirements),
                                description     : this.buildDescriptionButton (contract.key, contract.description),
                                address         : contract.key,
                                fund            : contract.fund,
                                funder          : contract.funder,
                                status          : this.statusText     [contract.status],
                                color           : this.statusColor    [contract.status],
                                requested       : new Date (contract.created_at).toLocaleDateString(),

                                action          : this.buildActionButton (contract.key, contract.status)
                            })
                        );
                });

                $ (this.element.querySelector ('table')).DataTable();
            };

            this.buildDescriptionButton = (address, description) => {
                return this.ccm.helper.html (this.html.buttonDescription, {
                    click: () => {

                        this.ccm.helper.setContent (
                            this.element.querySelector ('#modal-area'),
                            this.ccm.helper.html (this.html.modal, {
                                title   : 'Description',
                                address : address,
                                body    : description
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
                                buttons : ''
                            })
                        );

                        $ (this.element.querySelector ('.modal')).modal ('show');
                    }
                });
            };

            this.buildActionButton = (address, status) => {

                return status === 3 ? [] : [
                    {
                        "tag"           : "button",
                        //"id"            : "btn-fund",
                        "class"         : "btn btn-outline-warning btn-sm",
                        "data-address"  : address,
                        "onclick"       : this.renderAddFundModal,
                        "inner"         : "Add fund"
                    },
                    {
                        "tag"           : "button",
                        "class"         : `btn btn-outline-${this.statusColor [status + 1]} btn-sm`,
                        "data-address"  : address,
                        "onclick"       : this.actions [status],
                        "inner"         : this.statusTextAction [status]
                    }
                ];
            };

            this.renderAddFundModal = event => {

                this.setContractAddress (event.target.getAttribute ('data-address'));

                console.log (event.target.getAttribute ('data-address'));
                console.log (this.contract.options);

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
                        buttons: {
                            "tag"           : "button",
                            "class"         : "btn btn-primary btn-sm",
                            "onclick"       : this.addFund,
                            "inner"         : "Fund"
                        }
                    })
                );

                $ (this.element.querySelector ('.modal')).modal ('show');
            };

            this.addFund = () => {

                const number    = this.element.querySelector ('input[type=number]');
                const address   = this.contract.options.address;

                number.value ?
                    number.classList.remove ('is-invalid') : number.classList.add ('is-invalid');

                if (!number.value) return;

                // this.toggleSpinner ('#btn-fund', true);

                //$ (this.element.querySelector ('.modal')).modal ('hide');
                this.element.querySelector ('.btn-primary').setAttribute ('disabled', 'disabled');

                this.web3.eth.contract.send (
                    this.contract,
                    'addFund',
                    [],
                    {
                        from:   this.account,
                        value:  this.web3.utils.toWei (Math.abs (number.value).toString(), this.web3.units.ether)
                    }
                )
                    .on('receipt', receipt => {

                        this.store
                            .get (address)
                            .then (data => {

                                data.fund = parseFloat (data.fund) + Math.abs (number.value);

                                this.store.set (data)
                                    .then (() => window.location.reload());
                            });
                    });
            };

            this.setContractAddress = address => {

                if (!this.web3.utils.isAddress (address)) return false;

                this.contract.options.address = address;
            };

            /*this.toggleSpinner = (button, toggle) => {

                if (toggle) {
                    this.element.querySelector (button)
                        .setAttribute ('disabled', 'disabled');

                    this.element.querySelector (`${button} .spinner-border`)
                        .classList.remove ('d-none');
                } else {
                    this.element.querySelector (button)
                        .removeAttribute ('disabled');

                    this.element.querySelector (`${button} .spinner-border`)
                        .classList.add ('d-none');
                }
            };*/

            this.actions = [
                event => {

                    const address = event.target.getAttribute ('data-address');

                    this.setContractAddress (address);

                    this.web3.eth.contract.send (
                        this.contract,
                        'setDeveloper',
                        [],
                        {
                            from:   this.account,
                            value:  this.web3.utils.toWei ('1', this.web3.units.ether)
                        }
                    )
                        .on('receipt', receipt => {

                            this.store
                                .get (address)
                                .then (data => {

                                    data.fund   = parseFloat (data.fund) + 1;
                                    data.status = 1;

                                    this.store.set (data)
                                        .then (() => window.location.reload());
                                });
                        });
                },
                event => {

                    const prove = prompt ("Please submit your work here:", "");

                    const address = event.target.getAttribute ('data-address');

                    this.setContractAddress (address);

                    this.web3.eth.contract.send (
                        this.contract,
                        'submitWork',
                        [prove],
                        {
                            from:   this.account
                        }
                    )
                        .on('receipt', receipt => {

                            this.store
                                .get (address)
                                .then (data => {

                                    data.prove  = prove;
                                    data.status = 2;

                                    this.store.set (data)
                                        .then (() => window.location.reload());
                                });
                        });
                },
                event => {

                    const approved = confirm ('Approve submitted work?');

                    const address = event.target.getAttribute ('data-address');

                    this.setContractAddress (address);

                    this.web3.eth.contract.send (
                        this.contract,
                        'approveWork',
                        [approved],
                        {
                            from:   this.account
                        }
                    )
                        .on('receipt', receipt => {

                            this.store
                                .get (address)
                                .then (data => {

                                    data.status = approved ? 3 : 1;

                                    this.store.set (data)
                                        .then (() => window.location.reload());
                                });
                        });
                }
            ];
        }
    };

    let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
})();