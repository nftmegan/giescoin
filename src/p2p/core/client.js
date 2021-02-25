const WebSocket = require("ws");

//list of address to connect to
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];

var sockets = [];

const router = require('./router');

exports.emitToServer = (socket, path, data = "") => {
    var message = router.createMessage(path, data);
    socket.send(message);
}

exports.connectToPeerList = () => {
    peers.forEach(p => this.connectToPeer(p));
}

exports.connectToPeer = (url) => {
    console.log("CLIENT: Trying to connect to peer:", url);

    const socket = new WebSocket(url);
    
    onOpenConnection(socket);
    onErrorConnection(socket);
    onCloseConnection(socket);
    onReceivedMessage(socket);
}

const onOpenConnection = (socket) => {
    socket.on('open', () => {
        sockets.push(socket);
        this.emitToServer(socket, 'REQUEST_CHAIN_HEIGHT');
        console.log("CLIENT: Connected to peer", socket.url);
    });
}

const onErrorConnection = (socket) => {
    socket.on('error', (event) => {
        console.log("CLIENT: Unable to connect to peer", socket.url);
    });
}

const onCloseConnection = (socket) => {
    socket.on('close', (event) => {
        if (event.wasClean) {
            console.log("CLIENT: Connection to a peer closed cleanly:", event.reason);
        } else {
            console.log('CLIENT: Connection to a peer died');
        }
    });
}

const onReceivedMessage = (socket) => {
    socket.on('message', (data) => {
        var parsedData = router.parseMessage(data);
        router.fire(parsedData.path, socket, parsedData.data);
    });
}