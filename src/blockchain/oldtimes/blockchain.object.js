function BlockChain (chain, difficulty, pendingTransactions, miningReward) {
    this.chain = chain;
    this.difficulty = difficulty;
    this.pendingTransactions = pendingTransactions;
    this.miningReward = miningReward;
}

module.exports = BlockChain;