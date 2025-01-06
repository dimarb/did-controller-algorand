const algosdk = require("algosdk");

const indexerToken = "";
const indexerServer = "https://testnet-idx.4160.nodely.dev"; // Testnet
const indexerPort = "";

const indexerClient = new algosdk.Indexer(indexerToken, indexerServer, indexerPort);

const resolveDID = async (did) => {
    const address = did.split(":").pop(); // Extraer la dirección del DID

    try {
        // Obtener las transacciones de la cuenta
        const response = await indexerClient.searchForTransactions().address(address).do();

        // Filtrar transacciones con el campo 'note'
        const transactions = response.transactions.filter((tx) => tx.note);

        // Decodificar y mostrar los documentos DID en el campo 'note'
        const didDocuments = transactions.map((tx) => {
            const note = Buffer.from(tx.note, "base64").toString();
            return JSON.parse(note); // Asumimos que el contenido del 'note' es JSON
        });

        console.log("DID Documents:", JSON.stringify(didDocuments));
        return didDocuments;
    } catch (error) {
        console.error("Error resolving DID:", error);
    }
};
resolveDID("did:alg:testnet:W3XBGUK5RWGIRHPMXRNFLGYMIDNDWVXUOYDA6H5MOXHNTIZOEBMY2XKUBU");