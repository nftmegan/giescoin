const blockChain = require('../../blockchain');

module.exports = function(router) {
    //Define p2p routes here
    router.on('REQUEST_CHAIN_HEIGHT', (sender, data) => {
        var chainHeight = blockChain.chainHeight();
        var message = router.createMessage("ANSWER_CHAIN_HEIGHT", chainHeight);
        sender.send(message);
    });
    
    router.on('ANSWER_CHAIN_HEIGHT', (sender, data) => {
        console.log("A chain do peer de do tamanho:", data);
    });
    
    router.on('teste', (sender, data) => {
        console.log("esta deu");
    });
}