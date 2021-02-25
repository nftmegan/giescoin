function Block (timestamp, transactions, previousHash, hash, nonce) {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = hash;
    this.nonce = nonce;
}

module.exports = Block;