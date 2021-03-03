const BlockChain = require('./classes/blockchain.class');
var blockChain = new BlockChain();

exports.chainHeight = () => {
    return blockChain.chainHeight();
}

exports.getChain = () => {
    return blockChain.chain;
}

exports.isChainValid = () => {
    return blockChain.isChainValid();
}

exports.mine = () => {
    return blockChain.minePendingTransactions("A MINHA CONTA DO SANTANDER");
}