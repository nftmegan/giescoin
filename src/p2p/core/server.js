const util = require('./util');

const WebSocket = require("ws");
var wss;

const router = require('./router');
const events = require('./events');

exports.listen = async () => {
    var listenPort;

    //Find an empty port
    const portfinder = require('portfinder');
    await portfinder.getPortPromise()
        .then((port) => {
            listenPort = port;
        });

    wss = new WebSocket.Server({ port: listenPort });
    
    onConnection(wss);

    const interval = setInterval(function ping() {
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
        console.log("SERVER: Connections so far:", this.getClientsCount());

        events.fire('CLIENT_CONNECTED');

        onReceivedMessage(ws);
        onCloseConnection(ws);
    });
}

const onReceivedMessage = (ws) => {
    ws.on('message', (data) => {
        parsedData = util.parse(data).value;

        router.fire(parsedData.path, ws, parsedData.data);
    });
}

const onCloseConnection = (ws) => {
    ws.on('close', () => {
        console.log("SERVER: Client disconnected, client count:", this.getClientsCount());
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
    var message = router.createMessage(path, data);
    socket.send(message);
}

exports.emitToAllClients = (path, data) => {
    wss.clients.forEach(socket => {
        sendDataToClient(socket, path, data);
    });
}