class Event {
    constructor(path, callbackFnc) {
        this.path = path;
        this.callbackFnc = callbackFnc;
    }

    fire(res, data) {
        this.callbackFnc(res, data);
    }
}

var eventsArr = [];

const util = require('./util');
exports.util = () => {
    return util;
};

exports.on = (path, callbackFnc) => {
    if (getEventByPath(path))
        return;

    var newEvent = new Event(path, callbackFnc);
    eventsArr.push(newEvent);
}

exports.fire = (path, res, data) => {
    var event = getEventByPath(path);

    if (event)
        event.fire(res, data);
}

const getEventByPath = (path) => {
    var event;
    eventsArr.forEach(e => {
        if (e.path === path) {
            event = e;
        }
    });
    return event != null ? event : false;
}

require('../events')(this);