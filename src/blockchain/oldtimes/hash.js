const crypto = require('crypto');

module.exports.getHash = (i) => {
    const hash = crypto.createHash('sha256').update(i.toString()).digest('base64');
    return hash;
}

/*
const hash = require('./src/hash');
const BlockChain = require('./src/blockchain');

function validateHash(hash) {
    const difficulty = 5;
    for(let i = 0; i < difficulty; i++) {
        if(hash[i] != 0) {
            return false;
        }
    }
    return true;
}

function random(min, max) {  
    return Math.floor(
        Math.random() * (max - min) + min
    )
}

const trampoline = fn => (...args) => {
    let result = fn(...args)
    while (typeof result === 'function') {
      result = result()
    }
    return result
}

const mine = async () => {
    const mineProcessRec = (mining_attempts = 0) => {
        console.log(mining_attempts);
        return process.env.MINE == "false" ? mining_attempts : () => mineProcessRec(mining_attempts+1);   
    }

    console.log("Beginning the mining proccess...");
    process.env.MINE = "true"

    

    const mineProcess = trampoline(mineProcessRec);

    var result = mineProcess();
    console.log(result);

    await wait(1000).then(() => {
        process.env.MINE = "false";
        
        return result;
    })*/