require('dotenv').config();

const algosdk = require("algosdk");

// Generar una cuenta Algorand
const account_send = algosdk.mnemonicToSecretKey(process.env.DEPLOYER_MNEMONIC);

const account = algosdk.generateAccount();
console.log("Address:", account.addr);
console.log("Mnemonic:", algosdk.secretKeyToMnemonic(account.sk));

// Construir el DID
const network = "testnet"; // Cambiar a "mainnet" si es necesario
const did = `did:alg:${network}:${account.addr}`;
console.log("DID:", did);

const algodToken = "";
const algodServer = "https://testnet-api.algonode.network"; // Testnet
const algodPort = 443;

const client = new algosdk.Algodv2(algodToken, algodServer, algodPort);

const registerDID = async (account, didDoc) => {
    const params = await client.getTransactionParams().do();

    const note = new TextEncoder().encode(JSON.stringify(didDoc)); // Documento DID
    
    const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        sender: account_send.addr,
        receiver: account.addr, // Puedes enviarlo a la misma cuenta
        amount: 0, // Transacción sin transferencia
        note: note,
        suggestedParams: params,
    });

    const signedTxn = txn.signTxn(account_send.sk);
    const txId = txn.txID().toString();
    console.log("Transaction ID:", txId);

    await client.sendRawTransaction(signedTxn).do();
    console.log("DID registrado:", txId);
};

// Ejemplo de documento DID
const didDoc = {
    id: did,
    publicKey: [
        {
            id: `${did}#keys-1`,
            type: "Ed25519VerificationKey2018",
            publicKeyBase58: account.addr,
        },
    ],
    authentication: [
        {
            type: "Ed25519SignatureAuthentication2018",
            publicKey: `${did}#keys-1`,
        },
    ],
    service: [
        {
            id: `${did}#resolver`,
            type: "DIDResolver",
            serviceEndpoint: "https://resolver.example.com",
        },
    ],
};

// Registrar el DID
registerDID(account, didDoc);