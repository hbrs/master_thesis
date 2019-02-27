/**
 * @component ccm-certificate_student
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 * @version 1.0.0
 */

ccm.files['html.js'] = [
    {
        "class": "card",
        "style": "width: 16rem; margin: 0 auto;",
        "inner": [
            {
                "class": "card-header text-center",
                "inner": "Enrollment"
            },
            {
                "class": "card-body",
                "inner": [
                    {
                        "class": "form-group",
                        "inner": [
                            {
                                "tag": "label",
                                "inner": "Address"
                            },
                            {
                                "tag": "code",
                                "class": "d-block",
                                "inner": "%address%"
                            }
                        ]
                    },
                    {
                        "class": "form-group",
                        "inner": [
                            {
                                "tag": "label",
                                "inner": "Firstname"
                            },
                            {
                                "tag": "input",
                                "class": "form-control",
                                "placeholder": "Firstname"
                            }
                        ]
                    },
                    {
                        "class": "form-group",
                        "inner": [
                            {
                                "tag": "label",
                                "inner": "Lastname"
                            },
                            {
                                "tag": "input",
                                "class": "form-control",
                                "placeholder": "Lastname"
                            }
                        ]
                    },
                    {
                        "class": "form-group text-right",
                        "inner": {
                            "tag": "button",
                            "class": "btn btn-primary",
                            "onclick": "%enroll%",
                            "inner": [
                                {
                                    "tag": "span",
                                    "style": "margin-right: 0.4rem;",
                                    "inner": "Enroll now"
                                },
                                {
                                    "class": "spinner-border spinner-border-sm d-none",
                                    "role": "status"
                                }
                            ]
                        }
                    }
                ]
            }
        ]
    },
    {
        "class": "card",
        "style": "width: 16rem; margin: 0 auto;",
        "inner": [
            {
                "class": "card-header text-center",
                "inner": "Student"
            },
            {
                "class": "card-body",
                "inner": [
                    {
                        "class": "form-group",
                        "inner": [
                            {
                                "tag": "label",
                                "inner": "Address"
                            },
                            {
                                "tag": "code",
                                "class": "d-block",
                                "inner": "%address%"
                            }
                        ]
                    },
                    {
                        "class": "form-group",
                        "inner": [
                            {
                                "tag": "label",
                                "inner": "Firstname"
                            },
                            {
                                "tag": "code",
                                "class": "d-block",
                                "inner": "%firstname%"
                            }
                        ]
                    },
                    {
                        "class": "form-group",
                        "inner": [
                            {
                                "tag": "label",
                                "inner": "Lastname"
                            },
                            {
                                "tag": "code",
                                "class": "d-block",
                                "inner": "%lastname%"
                            }
                        ]
                    }
                ]
            }
        ]
    }
];
