const blockChain = require('../../blockchain');
const router = require("express").Router();
//const webSockets = require('../p2p').p2pServer();

//Define our routers here
router.get('/', (req, res) => {
    res.type('json').send(JSON.stringify(blockChain.getChain(), null, 2) + '\n');
});

router.get('/valid', (req, res) => {
    res.send(blockChain.isChainValid());
});

router.get('/peers', (req, res) => {
    var socketUrls = [];
    //webSockets.sockets.forEach(socket => socketUrls.push(socket.url));
    res.send(JSON.stringify(socketUrls));
});

router.get('/broadcast-to-peers', (req, res) => {
    //webSockets.sockets.forEach(socket => socket.send("aaaaa"));
});

module.exports = router;