const BlockChain = require('./classes/blockchain.class');
var blockChain = new BlockChain();

exports.chainHeight = () => {
    return blockChain.chainHeight();
}

exports.getChain = () => {
    return blockChain.chain;
}

exports.mineBlock = () => {
    return blockChain.chainHeight();
}