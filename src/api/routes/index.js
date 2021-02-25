const p2p = require('../../p2p');

const router = require("express").Router();

router.get('/', (req, res) => {
    res.send("Nothing to do here :)");
});

router.get('/test', (req, res) => {
    var data = {};
    data.mensagem = "fode-te caralho";
    p2p.server().sendDataToClients("SEND_BLOCKCHAIN_INSTANCE", data);
    res.send("Message sent");
});

router.use('/blockchain', require('./blockchain.route'));

module.exports = router;