const blockChainService = require('../services/blockchain.service');

// CLIENT ROUTES
module.exports = function(events) {
    events.on('CLIENT::CONNECTED_TO_SERVER', (res, data) => {
        console.log("CLIENT: Connected to peer", res.url);
        var message = events.util().createMessage('SERVER::CLIENT_REQUESTED_CHAIN_HEIGHT');
        res.send(message);
    });

    events.on('CLIENT::DISCONNECTED_FROM_SERVER', (res, data) => {
        
    });

    events.on('CLIENT::SERVER_ANSWERED_CHAIN_HEIGHT', (res, data) => {
        console.log("CLIENT: Peer", res.url, "chain size:", data);
    });
}