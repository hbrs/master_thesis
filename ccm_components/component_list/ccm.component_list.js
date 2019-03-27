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
                '../component_list/resources/html.js'
            ],
            abi: [
                'ccm.load',
                '../component_list/resources/abi.js'
            ],
            css: [
                'ccm.load', [
                    'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
                    '../component_list/resources/style.css'
                ]
            ],
            js: [
                'ccm.load', [
                    'https://code.jquery.com/jquery-3.3.1.slim.min.js',
                    'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js'
                ]
            ],
            store: [ "ccm.store", { "name": "req_components", "url": "http://localhost:8080" } ]
        },

        Instance: function () {

            /* Lifecycle */

            this.init   = async () => {};
            this.ready  = async () => {};
            this.start  = async () => {

                if (!this.metamask.isMetaMask ()) {

                    console.error ('metamask not installed!');
                    return;
                }

                this.web3.setProvider (this.metamask.getProvider ());

                this.metamask.enable (
                    accounts =>
                        this.account = accounts [0]
                );

                this.metamask.onAccountsChanged (
                    accounts =>
                        this.account = accounts [0]
                );

                this.contract =
                    this.web3.eth.contract.new (this.abi);

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

                let nr = 1;

                data.forEach (contract => {
                    this.element.querySelector ('tbody')
                        .appendChild(
                            this.ccm.helper.html (this.html.row, {
                                nr:             nr++,
                                name:           contract.name,
                                //requirements:   contract.requirements.reduce ((accumulator, value, index) => { return accumulator + `<button class='btn btn-outline-danger btn-sm' value='${value}'>R${index + 1}</button>`; }, ''),
                                //requirements:   this.buildRequirementButtons (contract.requirements),
                                requirements:   this.buildRequirementButtons (contract.address, contract.requirements),
                                description:    this.buildDescriptionButton (contract.address, contract.description),
                                //description:    this.buildDescriptionButton (contract.address, contract.description),
                                //address:        contract.address,
                                fund:           contract.fund,
                                //funder:         contract.funder,
                                approved:       contract.approved,
                                requested:      new Date (contract.created_at).toLocaleDateString()
                            })
                        );
                });
            };

            this.buildDescriptionButton = (address, description) => {
                return this.ccm.helper.html (this.html.buttonDescription, {
                    click: () => {

                        this.ccm.helper.setContent (
                            this.element.querySelector ('#modal-area'),
                            this.ccm.helper.html (this.html.modal, {
                                title: 'Description',
                                address: address,
                                body: description
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
                                title: 'Requirements',
                                address: address,
                                body: "<ul>" + requirements.reduce ((accumulator, value, index) => { return accumulator + `<li>${value}</li>`; }, '') + "</ul>"
                            })
                        );

                        $ (this.element.querySelector ('.modal')).modal ('show');
                    }
                });

                /*const span = document.createElement ('span');

                requirements.reduce ((accumulator, value, index) => {

                    span.appendChild (this.ccm.helper.html (this.html.btnRequirement, {
                        index: index + 1,
                        value: value,
                        click: () => alert (value)
                    }));

                }, 0);

                return span;*/
            };
        }
    };

    let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
})();