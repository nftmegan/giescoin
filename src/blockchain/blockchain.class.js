class BlockChain {
    constructor(difficulty = 1, miningReward = 10) {
        this.chain = [];
        this.difficulty = difficulty;
        this.pendingTransactions = [];
        this.miningReward = miningReward;
    }

    setChain(newChain) {
        this.chain = newChain;
    };
    
    getChain() {
        return this.chain;
    }
    
    chainHeight() {
        return this.chain.length;
    }
    
    getLatestBlock() {
        return this.chain[this.chain.length-1];
    }
    
    addBlock(timestamp = Date.now(), transactions = [], previousHash = "", hash = "", nonce = 0) {
        var newBlock = new Block(timestamp, transactions, previousHash, hash, nonce);
        this.chain.push(newBlock);
    }
    
    pushBlock(block) {
        this.chain.push(block);
    }
}

module.exports = BlockChain;