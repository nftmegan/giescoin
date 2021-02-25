const BlockChain = require('./blockchain.object');
const Block = require('./block.object');

var blockChain = new BlockChain();
blockChain.addBlock();

const calculateHash = (block) => {
    const { timestamp, transactions, previousHash, nonce } = block;
    const blockString = timestamp + previousHash + JSON.stringify(transactions) + nonce;
    
    const hashFunction = crypto.createHash('sha256').update(blockString).digest('hex');
    return hashFunction;
}

const validateChain = (chain) => {
    for(let i = 1; i < chain.length; i++) {
        const currentBlock = chain[i];
        const previousBlock = chain[i-1];

        if(currentBlock.hash !== calculateHash(currentBlock))
            return false;
            
        if(previousBlock.hash != currentBlock.previousHash)
            return false;
    }
    return true;
}

exports.mineBlock = () => {

}

exports.retrieveBlockChain = () => {
    return blockChain;
}

exports.injectChainAttempt = (newChain) => {
    console.log("Attempting to inject a new BlockChain version");

    if(newChain.length < blockChain.chainSize()) {
        if(validateChain(newChain)) {
            blockChain.setChain(newChain);
            console.log("Swapped to a new BlockChain");
        }
        else
            console.log("Invalid chain");
    }
    else {
        console.log("New chain smaller");
    }
}

module.exports = blockChain;