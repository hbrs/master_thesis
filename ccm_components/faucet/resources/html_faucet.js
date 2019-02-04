/**
 * @component ccm-faucet
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 * @version 1.0.0
 */

ccm.files['html_faucet.js'] = {
    class: "card",
    style: "width: 16rem; margin: 0 auto;",
    inner: [
        {
            class: "card-header",
            inner: "Faucet"
        },
        {
            class: "card-body",
            inner: [
                {
                    tag: "h5",
                    class: "card-title",
                    inner: "Details"
                },
                {
                    tag: "p",
                    class: "card-text",
                    inner: [
                        {
                            tag: "strong",
                            inner: "Address"
                        },
                        {
                            tag: "code",
                            style: "display: block;",
                            id: "address",
                            inner: ""
                        }
                    ]
                },
                {
                    tag: "p",
                    class: "card-text",
                    inner: [
                        {
                            tag: "strong",
                            inner: "Balance"
                        },
                        {
                            tag: "code",
                            style: "display: block;",
                            id: "balance",
                            inner: ""
                        }
                    ]
                },
                {
                    tag: "button",
                    onclick: "%request%",
                    class: "btn btn-primary",
                    inner: "Request 1 ether"
                },
                {
                    id: "loader",
                    style: "display: none;",
                    inner: [
                        {
                            tag: "span",
                            inner: "Your claim is being processed, please wait: "
                        },
                        {
                            tag: "img",
                            src: "https://ccmjs.github.io/rmueller-components/notary/resources/loader.gif",
                            width: "12px"
                        }
                    ]
                }
            ]
        }
    ]
};