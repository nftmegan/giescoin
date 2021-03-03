const blockChainService = require('../services/blockchain.service');

// SERVER ROUTES
module.exports = function(events) {
    events.on('SERVER::CLIENT_CONNECTED', (res, data) => {
        console.log("SERVER: Connections so far:", data.clientCount);
    });
    
    events.on('SERVER::CLIENT_DISCONNECTED', (res, data) => {
        
    });
    
    events.on('SERVER::CLIENT_REQUESTED_CHAIN_HEIGHT', (res, data) => {
        var chainHeight = blockChainService.requestChainHeight();
        var message = events.util().createMessage('CLIENT::SERVER_ANSWERED_CHAIN_HEIGHT', chainHeight);
        res.send(message);
    });
}