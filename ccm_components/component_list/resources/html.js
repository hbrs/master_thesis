/**
 * @component ccm-component_request
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 * @version 2.0.0
 */

ccm.files['html.js'] = {
    "main": [
        {
            "class": "table-responsive-md",
            "inner": {
                "tag": "table",
                "class": "table table-striped text-center",
                "inner": [
                    {
                        "tag": "thead",
                        "class": "thead-dark",
                        "inner": {
                            "tag": "tr",
                            "inner": [
                                {
                                    "tag": "th",
                                    "scope": "col",
                                    "inner": "#"
                                },
                                {
                                    "tag": "th",
                                    "scope": "col",
                                    "inner": "Component"
                                },
                                {
                                    "tag": "th",
                                    "scope": "col",
                                    "inner": "Requirements"
                                },
                                {
                                    "tag": "th",
                                    "scope": "col",
                                    "inner": "Description"
                                },
                                {
                                    "tag": "th",
                                    "scope": "col",
                                    "inner": "Fund [ETH]"
                                },
                                {
                                    "tag": "th",
                                    "scope": "col",
                                    "inner": "Requested"
                                },
                                {
                                    "tag": "th",
                                    "scope": "col",
                                    "inner": "Status"
                                },
                                {
                                    "tag": "th",
                                    "scope": "col",
                                    "inner": "Action"
                                }
                            ]
                        }
                    },
                    {
                        "tag": "tbody",
                        "inner": []
                    }
                ]
            }
        },
        {
            "tag": "span",
            "id": "modal-area"
        }
    ],
    "row": {
        "tag": "tr",
        "data-address": "%address%",
        "inner": [
            {
                "tag"   : "td",
                "inner" : "%index%"
            },
            {
                "tag"   : "td",
                "inner" : {
                    "tag"   : "strong",
                    "inner" : "%name%"
                }
            },
            {
                "tag"   : "td",
                "inner" : "%requirements%"
            },
            {
                "tag"   : "td",
                "inner" : "%description%"
            },
            {
                "tag"   : "td",
                "inner" : {
                    "tag"   : "i",
                    "inner" : "%fund%"
                }
            },
            {
                "tag"   : "td",
                "inner" : "%requested%"
            },
            {
                "tag"   : "td",
                "inner" : [
                    {
                        "tag"   : "span",
                        "class" : "badge badge-pill badge-%badge_color%",
                        "inner" : "%badge_text%"
                    }
                ]
            },
            {
                "tag"   : "td",
                "style" : "text-align: left;",
                "inner" : [
                    {
                        "tag": "button",
                        "class": "btn btn-outline-warning btn-sm %btnFund%",
                        "onclick": "%openModal%",
                        "inner": "Add Fund"
                    },
                    {
                        "tag": "button",
                        "class": "btn btn-outline-primary btn-sm %btnRegisterDeveloper%",
                        "onclick": "%registerDeveloper%",
                        "inner": [
                            {
                                "tag": "span",
                                "style": "margin-right: 0.4rem;",
                                "inner": "Develop component"
                            },
                            {
                                "class": "spinner-border spinner-border-sm d-none",
                                "role": "status"
                            }
                        ]
                    },
                    {
                        "tag": "button",
                        "class": "btn btn-outline-danger btn-sm action %btnSubmitComponent%",
                        "onclick": "%submitComponent%",
                        "inner": [
                            {
                                "tag": "span",
                                "style": "margin-right: 0.4rem;",
                                "inner": "Submit component"
                            },
                            {
                                "class": "spinner-border spinner-border-sm d-none",
                                "role": "status"
                            }
                        ]
                    },
                    {
                        "tag": "button",
                        "class": "btn btn-outline-success btn-sm action %btnApproveComponent%",
                        "onclick": "%approveComponent%",
                        "inner": [
                            {
                                "tag": "span",
                                "style": "margin-right: 0.4rem;",
                                "inner": "Approve component"
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
    },

    "btnRequirement": {
        "tag":      "button",
        "class":    "btn btn-outline-info btn-sm",
        "onclick":  "%click%",
        "inner":    "Requirements [%size%]"
    },

    "btnDescription": {
        "tag":      "button",
        "class":    "btn btn-outline-info btn-sm",
        "onclick":  "%click%",
        "inner":    "Description"
    }
};