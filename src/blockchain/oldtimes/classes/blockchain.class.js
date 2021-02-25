const Block = require('./block.class');

class BlockChain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 0;
        this.pendingTransactions = [];
        this.miningReward = 50;
    }

    getChain() {
        return this.chain;
    }

    setChain(newChain) {
        this.chain = newChain;
    }

    createGenesisBlock() {
        return new Block([], "");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addNewBlock() {
        var latestBlock = this.getLatestBlock();
        
        var newBlock = new Block(this.pendingTransactions, latestBlock.hash);
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);

        return newBlock;
    }

    isEmpty() {
        return this.chain.length == 0;
    }

    isChainValid() {
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateMaskedHash())
                return false;
                
            if(previousBlock.hash != currentBlock.previousHash)
                return false;
        }
        return true;
    }
}

module.exports = BlockChain;