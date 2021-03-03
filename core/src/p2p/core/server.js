const util = require('./util');

const WebSocket = require("ws");
var wss;

const events = require('./events');

exports.listen = async () => {
    var listenPort;

    //Find an empty port
    const portfinder = require('portfinder');
    await portfinder.getPortPromise({
        port: 7000,
        stopPort: 7002
    }).then((port) => {
            listenPort = port;
    });

    wss = new WebSocket.Server({ port: listenPort });
    
    onConnection(wss);

    setInterval(function ping() {
        wss.clients.forEach(function each(ws) {
            if (ws.isAlive === false) return ws.terminate();
        });
    }, 2000);

    var response = {};
    response.port = listenPort;
    return response;
}

const onConnection = (socket) => {
    socket.on('connection', (ws, req) => {
        var data = { clientCount: this.getClientsCount() };

        events.fire('SERVER::CLIENT_CONNECTED', ws, data);

        onReceivedMessage(ws);
        onCloseConnection(ws);
    });
}

const onReceivedMessage = (ws) => {
    ws.on('message', (data) => {
        var dataRead = util.readMessage(data);
        events.fire(dataRead.path, ws, dataRead.data);
    });
}

const onCloseConnection = (ws) => {
    ws.on('close', () => {
        events.fire('SERVER::CLIENT_DISCONNECTED', ws);
    });
}

exports.isListening = () => {
    if (wss)
        return true;
    else
        return false;
}
 
exports.getClients = () => {
    return wss.clients;
}

exports.getClientsCount = () => {
    return wss.clients.size;
}

exports.emitToClient = (socket, path, data) => {
    var message = util.createMessage(path, data);
    socket.send(message);
}

exports.emitToAllClients = (path, data) => {
    wss.clients.forEach(socket => {
        sendDataToClient(socket, path, data);
    });
}