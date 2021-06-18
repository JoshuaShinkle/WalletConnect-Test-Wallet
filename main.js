const WalletConnect = require("./node_modules/@walletconnect/client").default;

let uri_arg = process.argv[2];

// Create connector
const connector = new WalletConnect(
    {
        // Required
        uri: uri_arg,
        // Required
        clientMeta: {
        description: "WalletConnect Developer App",
        url: "https://example.walletconnect.org/",
        icons: ["https://walletconnect.org/walletconnect-logo.png"],
        name: "WalletConnect",
        },
    }
);

// Subscribe to session requests
connector.on("session_request", (error, payload) => {
    if (error) {
        throw error;
    }

    // Handle Session Request
    console.log("in session request handler");
    console.log(payload);

    // Approve Session
    connector.approveSession({
        accounts: [                 // required
        '0x67214D7227987a1C7E81E71bF2B1b99E4d035642'
        ],
        chainId: 3                  // required
    })

});

// Subscribe to call requests
connector.on("call_request", (error, payload) => {
    if (error) {
        throw error;
    }

    // Handle Call Request
    console.log("in call request handler");

    if (payload.method == 'eth_sendTransaction') {

        const { spawn } = require('child_process');
        const from = spawn('./myprog', [payload.params[0].from, payload.params[0].gasPrice, payload.params[0].gas, payload.params[0].value, payload.params[0].nonce, payload.params[0].data]);
        from.stdout.on('data', (data) => {
        console.log(`${data}`);
        });

        console.log("APPROVED----------------------");
        // Approve Call Request
        connector.approveRequest({
            id: payload.id,
            result: "0x0000000000000000000000000000000000000000000000000000000000000000"
        });
    } else {
        console.log("REJECTED----------------------");
        // Reject Call Request
        connector.rejectRequest({
            id: payload.id,                         // required
            error: {
            code: "OPTIONAL_ERROR_CODE",           // optional
            message: "OPTIONAL_ERROR_MESSAGE"     // optional
            }
        });
    }

    /* {
        id: 1623343296148997,
        jsonrpc: '2.0',
        method: 'eth_sendTransaction',
        params: [
          {
            from: '0x67214D7227987a1C7E81E71bF2B1b99E4d035642',
            to: '0x67214D7227987a1C7E81E71bF2B1b99E4d035642',
            gasPrice: '0x3b9aca00',
            gas: '0x5208',
            value: '0x0',
            nonce: '0x42',
            data: '0x'
          }
        ]
    } */
});

connector.on("disconnect", (error, payload) => {
    if (error) {
        throw error;
    }

    // Delete connector
    console.log("in disconnect handler");
    console.log(payload);

});

const { accounts, chainId } = connector.createSession();

// // Reject Session
// connector.rejectSession({
//     message: 'OPTIONAL_ERROR_MESSAGE'       // optional
// })

// // Kill Session
// connector.killSession()