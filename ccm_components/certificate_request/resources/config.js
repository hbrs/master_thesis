/**
 * @component ccm-certificate_request
 * @author René Müller <rene.mueller@smail.inf.h-brs.de> 2019
 * @license MIT License
 * @version 1.0.0
 */

ccm.files['config.js'] = {
    "all": {
        "geth2": {
            "certificates": [
                {
                    "name":     "Module A1",
                    "address":  "0x62ea499451d9a22102601b4B719a6D21dd8c5A8F"
                },
                {
                    "name":     "Module A2",
                    "address":  "0xc5a97D2eEFD6Fd77cc9268770DD794F1E7BEF5a8"
                },
                {
                    "name":     "Module B1",
                    "address":  "0xf9a30E79504A3af7704da57449A3D5531D95Bc5e"
                }
            ]
        },
        "rinkeby": {
            "certificates": [
                {
                    "name":     "CertA",
                    "address":  "0x5f6Ab27baf856c18E0165cAb82ce7412b149252c"
                },
                {
                    "name":     "CertB",
                    "address":  "0xA351beb1BdcA93aE6D8bc865d3A589CD6D698fF6"
                },
                {
                    "name":     "CertC",
                    "address":  "0xA351beb1BdcA93aE6D8bc865d3A589CD6D698fF6"
                }
            ]
        },
        "kovan": {
            "certificates": [
                {
                    "name":     "CertI",
                    "address":  "0x5f6Ab27baf856c18E0165cAb82ce7412b149252c"
                },
                {
                    "name":     "CertII",
                    "address":  "0xA351beb1BdcA93aE6D8bc865d3A589CD6D698fF6"
                },
                {
                    "name":     "CertIII",
                    "address":  "0xA351beb1BdcA93aE6D8bc865d3A589CD6D698fF6"
                }
            ]
        },
        "mainnet": {
            "certificates": [
                {
                    "name":     "Cert01",
                    "address":  "0x5f6Ab27baf856c18E0165cAb82ce7412b149252c"
                },
                {
                    "name":     "Cert02",
                    "address":  "0xA351beb1BdcA93aE6D8bc865d3A589CD6D698fF6"
                },
                {
                    "name":     "Cert03",
                    "address":  "0xA351beb1BdcA93aE6D8bc865d3A589CD6D698fF6"
                }
            ]
        }
    }
};