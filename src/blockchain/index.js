const BlockChain = require('./blockchain.class');
var blockChain = new BlockChain();

exports.chainHeight = () => {
    return 2;
}