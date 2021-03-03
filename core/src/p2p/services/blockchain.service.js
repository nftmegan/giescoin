const blockChain = require('../../blockchain');

exports.requestChainHeight = () => {
    return blockChain.chainHeight();
}