exports.connectionState = (socket) => {
    return socket.readyState;
}

exports.strConnectionState = (socket) => {
    if(socket == null)
        return "CLOSED";

    switch(socket.readyState) {
        case 0:
            return "CONNECTING";
        case 1:
            return "OPEN";
        case 2:
            return "CLOSING";
        default:
        case 3:
            return "CLOSED";
    }
}

exports.stringify = (str) => require('json-stringify-safe')(str);
exports.parse = (str) => require('json-parse-safe')(str);

exports.createMessage = (path, data) => {
    return this.stringify({ path: path, data: data });
}

exports.readMessage = (data) => {
    return this.parse(data).value;
}