class Event {
    constructor(path, callbackFnc) {
        this.path = path;
        this.callbackFnc = callbackFnc;
    }

    fire(sender, data) {
        this.callbackFnc(sender, data);
    }
}

var eventsArr = [];

exports.on = (path, callbackFnc) => {
    if (getEventByPath(path))
        return;

    var newEvent = new Event(path, callbackFnc);
    eventsArr.push(newEvent);
}

exports.fire = (path, sender, data) => {
    var event = getEventByPath(path);

    if (event)
        event.fire(sender, data);
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