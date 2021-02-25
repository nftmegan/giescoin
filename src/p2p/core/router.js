const util = require('./util');

class Route {
    constructor(path, callbackFnc) {
        this.path = path;
        this.callbackFnc = callbackFnc;
    }

    fire(sender, data) {
        this.callbackFnc(sender, data);
    }
}

var routeArr = [];

exports.on = (path, callbackFnc) => {
    if (getRouteByPath(path))
        return;

    var newRoute = new Route(path, callbackFnc);
    routeArr.push(newRoute);
}

exports.fire = (path, sender, data) => {
    var route = getRouteByPath(path);

    if (route)
        route.fire(sender, data);
}

exports.createMessage = (path, data) => {
    return util.stringify({ path: path, data: data });
}

exports.parseMessage = (data) => {
    return util.parse(data).value;
}

const getRouteByPath = (path) => {
    var route;
    routeArr.forEach(r => {
        if (r.path === path) {
            route = r;
        }
    });
    return route != null ? route : false;
}

require('../routes/blockchain.route')(this);