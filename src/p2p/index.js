
const config = require('../config');

client = require('./core/client');
server = require('./core/server');
router = require('./core/router');
events = require('./core/events');

const connect = async () => {
    if(config.listen_to_peers) {
        await server.listen(router).then((response) => {
            console.log("SERVER: Listening to peers on port", response.port);
        });
    }

    if(config.debug)
        console.log("CLIENT: Trying to connect to peers");

    client.connectToPeerList(router);
}

events.on('CLIENT_CONNECTED', (data) => {
    console.log("SERVER: Someone connected");
});

module.exports = { connect, client, server, router }