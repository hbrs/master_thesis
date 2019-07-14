/**
 * @component ccm-certificate_create
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 * @version 1.0.0
 */

ccm.files ['html.js'] = {
    "class": "card text-center",
    "style": "width: 32rem; margin: 0 auto;",
    "inner": [
        {
            "class": "card-header",
            "inner": "Create certificate"
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
                            "placeholder": "Certificate name",
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
                                "inner": "Institution"
                            }
                        },
                        {
                            "tag": "input",
                            "name": "institution",
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
                            "onclick": "%create%",
                            "inner": [
                                {
                                    "tag": "span",
                                    "style": "margin-right: 0.4rem;",
                                    "inner": "Create"
                                },
                                {
                                    "tag": "span",
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
};