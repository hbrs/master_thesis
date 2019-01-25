ccm.files['html_state.js'] = {
    class: "toast",
    id: "toast",
    style: "position: absolute; top: 0; right: 0;",
    "data-autohide": "false",
    inner: [
        {
            class: "toast-header",
            inner: [
                {
                    tag: "img",
                    class: "rounded mr-2",
                    src: "#",
                    width: "32px",
                    alt: "logo"
                },
                {
                    tag: "strong",
                    class: "mr-auto",
                    inner: {
                        tag: "span",
                        inner: "Node state"
                    }
                },
                {
                    tag: "button",
                    class: "ml-2 mb-1 close",
                    "data-dismiss": "toast",
                    "aria-label": "Close",
                    inner: {       tag: "span",
                        "aria-hidden": true,
                        inner: "&times;"
                    }
                }
            ]
        },
        {
            class: "toast-body",
            inner: [
                {
                    tag: "ul",
                    class: "list-group",
                    inner: {
                        tag: "li",
                        class: "",
                        inner: ""
                    }
                },
                {
                    tag: "br"
                },
                {
                    tag: "ul",
                    class: "list-group",
                    inner: [
                        {
                            tag: "li",
                            class: "list-group-item active",
                            inner: "Version"
                        },
                        {
                            tag: "li",
                            id: "api",
                            class: "list-group-item",
                            inner: [
                                {
                                    tag: "strong",
                                    inner: "API: ",
                                    style: "width: 5rem; display: inline-block;"
                                },
                                {
                                    tag: "span",
                                    inner: ""
                                }
                            ]
                        },
                        {
                            tag: "li",
                            class: "list-group-item",
                            style: "display: table",
                            inner: [
                                {
                                    tag: "strong",
                                    inner: "Node: ",
                                    style: "width: 5rem; display: table-cell;"
                                },
                                {
                                    tag: "span",
                                    style: "display: table-cell",
                                    inner: ""
                                }
                            ]
                        },
                        {
                            tag: "li",
                            class: "list-group-item",
                            inner: [
                                {
                                    tag: "strong",
                                    inner: "Network: ",
                                    style: "width: 5rem; display: inline-block;"
                                },
                                {
                                    tag: "span",
                                    inner: ""
                                }
                            ]
                        },
                        {
                            tag: "li",
                            class: "list-group-item",
                            inner: [
                                {
                                    tag: "strong",
                                    inner: "Ethereum: ",
                                    style: "width: 5rem; display: inline-block;"
                                },
                                {
                                    tag: "span",
                                    inner: ""
                                }
                            ]
                        }
                    ]
                },
                {
                    tag: "br"
                },
                {
                    tag: "ul",
                    class: "list-group",
                    inner: [
                        {
                            tag: "li",
                            class: "list-group-item active",
                            inner: "Net"
                        },
                        {
                            tag: "li",
                            id: "api",
                            class: "list-group-item",
                            inner: [
                                {
                                    tag: "strong",
                                    inner: "Listening: ",
                                    style: "width: 5rem; display: inline-block;"
                                },
                                {
                                    tag: "span",
                                    inner: ""
                                }
                            ]
                        },
                        {
                            tag: "li",
                            class: "list-group-item",
                            inner: [
                                {
                                    tag: "strong",
                                    inner: "Peer Count: ",
                                    style: "width: 5rem; display: inline-block;"
                                },
                                {
                                    tag: "span",
                                    inner: ""
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};
