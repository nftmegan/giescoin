const router = require("express").Router();

router.get('/', (req, res) => {
    res.send("Nothing to do here :)");
});

router.use('/blockchain', require('./blockchain.route'));

module.exports = router;