/**
 * @component ccm-component_request
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 * @version 1.0.0
 */

ccm.files['html.js'] = [
    {
        "class": "card text-center",
        "style": "width: 32rem; margin: 0 auto;",
        "inner": [
            {
                "class": "card-header",
                "inner": "Component request"
            },
            {
                "tag": "ul",
                "class": "list-group list-group-flush text-left",
                "inner": [
                    {
                        "tag": "li",
                        "class": "list-group-item",
                        "inner": [
                            {
                                "tag": "label",
                                "inner": {
                                    "tag": "strong",
                                    "inner": "Name"
                                }
                            },
                            {
                                "tag": "input",
                                "name": "name",
                                "class": "form-control",
                                "placeholder": "Component name",
                                "autofocus": "autofocus",
                            }
                        ]
                    },
                    {
                        "tag": "li",
                        "class": "list-group-item",
                        "inner": [
                            {
                                "tag": "label",
                                "inner": {
                                    "tag": "strong",
                                    "inner": "Requirements"
                                }
                            },
                            {
                                "tag": "p",
                                "class": "text-secondary",
                                "inner": "Define all requirements this component should have. <a href='#'>Here</a> you can find a template for writing good requirements."
                            },
                            {
                                "tag": "span",
                                "inner": {
                                    "class": "form-group",
                                    "inner": {
                                        "tag": "input",
                                        "class": "form-control",
                                        "placeholder": "This component should..."
                                    }
                                }
                            },
                            {
                                "tag": "button",
                                "type": "submit",
                                "class": "btn btn-secondary",
                                "onclick": "%more%",
                                "inner": "+ more"
                            }
                        ]
                    },
                    {
                        "tag": "li",
                        "class": "list-group-item",
                        "inner": [
                            {
                                "tag": "label",
                                "inner": {
                                    "tag": "strong",
                                    "inner": "Description"
                                }
                            },
                            {
                                "tag": "textarea",
                                "class": "form-control",
                                "rows": "2",
                                "placeholder": "What else do you want to tell the developer about the requested component..."
                            }
                        ]
                    },
                    {
                        "tag": "li",
                        "class": "list-group-item border-0",
                        "inner": [
                            {
                                "tag": "label",
                                "inner": {
                                    "tag": "strong",
                                    "inner": "Fund"
                                }
                            },
                            {
                                "class": "input-group",
                                "inner": [
                                    {
                                        "class": "input-group-prepend",
                                        "inner": {
                                            "class": "input-group-text",
                                            "inner": "ETH"
                                        }
                                    },
                                    {
                                        "tag": "input",
                                        "name": "fund",
                                        "class": "form-control",
                                        "type": "number",
                                        "placeholder": "Fund for this component"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "tag": "li",
                        "class": "list-group-item",
                        "inner": [
                            {
                                "tag": "label",
                                "inner": {
                                    "tag": "strong",
                                    "inner": "Funder"
                                }
                            },
                            {
                                "tag": "input",
                                "name": "funder",
                                "class": "form-control",
                                "readonly": "readonly"
                            }
                        ]
                    },
                    {
                        "tag": "li",
                        "class": "list-group-item border-0",
                        "inner": [
                            {
                                "tag": "button",
                                "class": "btn btn-primary float-right",
                                "onclick": "%send%",
                                "inner": [
                                    {
                                        "tag": "span",
                                        "style": "margin-right: 0.4rem;",
                                        "inner": "Send request"
                                    },
                                    {
                                        "class": "spinner-border spinner-border-sm d-none",
                                        "role": "status"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "class": "form-group",
        "inner": {
            "tag": "input",
            "class": "form-control",
            "placeholder": "This component should..."
        }
    },
    [
        {
            "tag": "li",
            "class": "list-group-item",
            "inner": {
                "tag": "h5",
                "class": "card-title text-center",
                "inner": "Component <code>%component%</code> successfully requested."
            }
        },
        {
            "tag": "li",
            "class": "list-group-item",
            "inner": {
                "tag": "button",
                "class": "btn btn-primary d-block text-center",
                "style": "margin: 0 auto;",
                "onclick": "javascript:window.location.reload()",
                "inner": "Request another component"
            }
        }
    ]
];