ccm.files['html_lottery.js'] = {
    class: "card text-center",
    style: "width: 256px; margin: 0 auto;",
    inner: [
        {
            class: "card-header",
            inner: "Lottery"
        },
        {
            tag: "ul",
            class: "list-group list-group-flush",
            inner: {
                tag: "li",
                class: "list-group-item",
                inner: [
                    {
                        tag: "input",
                        id: "number",
                        placeholder: "Number",
                        style: "text-align: center; width: 8.2rem; height: 4rem; font-size: 2rem;"
                    },
                    {
                        class: "card-body",
                        inner: {
                            tag: "button",
                            class: "btn btn-primary",
                            id: "play",
                            inner: "Play now",
                            onclick: "%play%"
                        }
                    },
                    {
                        class: "badge badge-pill badge-secondary",
                        inner: "Each game costs 0.01 ether."
                    }
                ]
            }
        },
        {
            class: "card-body",
            style: "display: none;",
            inner: {
                class: "card-text alert alert-danger",
                role: "alert",
                id: "error",
                inner: ""
            }
        },
        {
            class: "card-body",
            style: "display: none;",
            inner: {
                class: "card-text alert alert-success",
                role: "alert",
                id: "winner",
                inner: ""
            }
        },
        {
            class: "card-body",
            id: "results",
            inner: ""
        },
        {
            class: "card-footer text-muted",
            inner: [
                {
                    tag: "span",
                    inner: "Jackpot: "
                },
                {
                    tag: "span",
                    id: "jackpot"
                }
            ]
        }
    ]
};
