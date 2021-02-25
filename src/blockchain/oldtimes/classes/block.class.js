const crypto = require('crypto');

class Block {
    constructor(transactions = [], previousHash = '') {
        this.timestamp = Date.now();
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = /*this.calculateMaskedHash()*/"";
        this.nonce = 0;
    }

    mineBlock(difficulty, debug) {
        debug = false;

        var guess;

        do {
          this.nonce++;
          guess = this.calculateHash();
        } while(guess.substring(0, difficulty) !== Array(difficulty + 1).join("0"));

        this.hash = this.calculateMaskedHash(guess);

        if(debug) {
          console.log("-> Mined block index:", this.index, "hash:", this.hash);
        }
    }
}

module.exports = Block;