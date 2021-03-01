module.exports = function(events) {
    require('./client.events')(events);
    require('./server.events')(events);
}