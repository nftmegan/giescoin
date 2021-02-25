exports.validateChain = (chain) => {
    for(let i = 1; i < chain.length; i++) {
        const currentBlock = chain[i];
        const previousBlock = chain[i-1];

        console.log(currentBlock.hash);

        if(currentBlock.hash !== this.calculateMaskedHash(timestamp, transactions, previousHash, nonce))
            return false;
            
        if(previousBlock.hash != currentBlock.previousHash)
            return false;
    }
    return true;
}

exports.calculateHash = (block) => {
    const { timestamp, transactions, previousHash, nonce } = block;
    const blockString = timestamp + previousHash + JSON.stringify(transactions) + nonce;
    
    const hashFunction = crypto.createHash('sha256').update(blockString).digest('hex');
    return hashFunction;
}

exports.calculateMaskedHash = (block) => {
    if(hash == null)
        hash = this.calculateHash(block);

    return crypto.createHash('sha256').update(hash).digest('hex');
}