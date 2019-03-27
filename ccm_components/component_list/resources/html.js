/**
 * @component ccm-component_request
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 * @version 1.0.0
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
                                    "inner": "Component name"
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
                                /*{
                                    "tag": "th",
                                    "scope": "col",
                                    "inner": "Address"
                                },*/
                                {
                                    "tag": "th",
                                    "scope": "col",
                                    "inner": "Fund [ETH]"
                                },
                                {
                                    "tag": "th",
                                    "scope": "col",
                                    "inner": "Funder"
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
        "inner": [
            {
                "tag": "td",
                "inner": "%nr%"
            },
            {
                "tag": "td",
                "inner": "%name%"
            },
            {
                "tag": "td",
                "inner": "%requirements%"
            },
            {
                "tag": "td",
                "inner": "%description%"
            },
            /*{
                "tag": "td",
                "inner": "%address%"
            },*/
            {
                "tag": "td",
                "inner": "%fund%"
            },
            {
                "tag": "td",
                "inner": "%funder%"
            },
            {
                "tag": "td",
                "inner": "%requested%"
            },
            {
                "tag": "td",
                "inner": "%approved%"
            },
            {
                "tag": "td",
                "inner": [
                    {
                        "tag": "button",
                        "class": "btn btn-outline-warning btn-sm",
                        "inner": "Add fund"
                    },
                    {
                        "tag": "button",
                        "class": "btn btn-outline-primary btn-sm",
                        "inner": "Developer"
                    },
                    {
                        "tag": "button",
                        "class": "btn btn-outline-success btn-sm",
                        "inner": "Approve"
                    }
                ]
            }
        ]
    },
    "modal": {
        "class": "modal fade",
        "tabindex": "-1",
        "role": "dialog",
        "aria-hidden": "true",
        "data-address": "%address%",
        "inner": {
            "class": "modal-dialog",
            "role": "document",
            "inner": {
                "class": "modal-content",
                "inner": [
                    {
                        "class": "modal-header",
                        "inner": [
                            {
                                "tag": "h5",
                                "class": "modal-title",
                                "inner": "%title%"
                            },
                            {
                                "tag": "button",
                                "type": "button",
                                "class": "close",
                                "data-dismiss": "modal",
                                "aria-label": "Close",
                                "inner": {
                                    "tag": "span",
                                    "aria-hidden": "true",
                                    "inner": "&times;"
                                }
                            }
                        ]
                    },
                    {
                        "class": "modal-body",
                        "inner": {
                            "tag": "p",
                            "inner": "%body%"
                        }
                    },
                    {
                        "class": "modal-footer",
                        "inner": [
                            {
                                "tag": "button",
                                "class": "btn btn-secondary btn-sm",
                                "data-dismiss": "modal",
                                "inner": "Close"
                            },
                            {
                                "tag": "button",
                                "class": "btn btn-primary btn-sm",
                                "inner": "Save"
                            }
                        ]
                    }
                ]
            }
        }
    },
    "toast": {
        "class":            "toast",
        "role":             "alert",
        "aria-live":        "assertive",
        "aria-atomic":      "true",
        "data-autohide":    "false",
        "data-delay":       "5000",
        "inner": [
            {
                "class": "toast-header",
                "inner": [
                    {
                        "tag":      "strong",
                        "class":    "mr-auto",
                        "inner":    "Toast"
                    },
                    {
                        "tag":          "button",
                        "type":         "button",
                        "class":        "ml-2 mb-1 close",
                        "data-dismiss": "toast",
                        "aria-label":   "Close",
                        "onclick":      "%close%",
                        "inner": {
                            "tag":          "span",
                            "aria-hidden":  "true",
                            "inner":        "&times;"
                        }
                    }
                ]
            },
            {
                "class":    "toast-body",
                "inner":    "%body%"
            }
        ]
    },
    "buttonRequirement": {
        "tag":      "button",
        "class":    "btn btn-outline-danger btn-sm",
        "value":    "%value%",
        "onclick":  "%click%",
        "inner":    "Requirements [%size%]"
    },
    "buttonDescription": {
        "tag":      "button",
        "class":    "btn btn-outline-info btn-sm",
        "onclick":  "%click%",
        "inner":    "Description"
    }
};