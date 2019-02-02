/**
 * @component ccm-notary
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 * @version 1.0.0
 */

ccm.files['html_notary.js'] = {
    class: "card",
    inner: [
        {
            class: "card-header",
            inner: "Notary"
        },
        {
            class: "card-body text-center",
            inner: {
                class: "dropzone"
            }
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
                            class: "display-inline-block-min-width-4-rem",
                            inner: "Owner:"
                        },
                        {
                            tag: "code",
                            id: "owner",
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
                            class: "display-inline-block-min-width-4-rem",
                            inner: "SHA256:"
                        },
                        {
                            tag: "code",
                            id: "sha256",
                            inner: "No document dropped yet"
                        }
                    ]
                },
                {
                    tag: "button",
                    onclick: "%upload%",
                    class: "btn btn-primary",
                    inner: "Claim ownership"
                },
                {
                    id: "loader",
                    class: "display-none",
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
        },
        {
            tag: "ul",
            class: "list-group list-group-flush",
            inner: [
                {
                    tag: "li",
                    class: "list-group-item list-group-item-danger display-none",
                    id: "error",
                    inner: ""
                },
                {
                    tag: "li",
                    class: "list-group-item list-group-item-success display-none",
                    id: "success",
                    inner: ""
                }
            ]
        },
        {
            class: "card-footer",
            inner: "Contract: <code>%contract%</code>"
        }
    ]
};
