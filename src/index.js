require('dotenv').config();

const express = require("express");

const connectToNetwork = async () => {
    const p2p = require('./p2p');
    await p2p.connect();
}

const startAPI = async () => {
    var listenPort;     

    const portfinder = require('portfinder');
    await portfinder.getPortPromise({
        port: 9000,
        stopPort: 9005
    }).then((port) => {
        listenPort = port;
    });

    const app = express();

    const loader = require("./api/loaders");
    await loader.load(app);

    const port = listenPort;
    await app.listen(port);

    return port;
}

const init = async () => {
    console.log(`
      #####################################################
      ★              GiesCoin Core v0.1.1                 ★
      #####################################################
      `);
      
    await connectToNetwork().then(() => {
      console.log("Connected to the network!");
    });
    
    await startAPI().then((port) => {
      console.log(`BlockChain API started at port ${port}`);      
    });
}

init().then(() => {
    console.log("Successfully started GiesCoin!");
});