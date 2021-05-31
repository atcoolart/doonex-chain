const SHA256 = require('crypto-js/sha256');

class Block {

	constructor (index, timestamp, data, previousHash = ''){
		this.index = index;
		this.timestamp = timestamp;
		this.data = data;
		this.previousHash = previousHash;
		this.hash = this.calculateHash();
	}

	calculateHash() {
		return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
	}
}


class Blockchain {
	constructor (){
		this.chain = [this.createGenesisBlock()];
	}

	createGenesisBlock()
	{
		return new Block(0, "01/06/2021", "Genesis Block","0");
	}

	getLastestBlock() {
		return this.chain[this.chain.length - 1];
	}

	addBlock(newBlock){
		newBlock.previousHash = this.getLastestBlock().hash;
		newBlock.hash = newBlock.calculateHash();
		this.chain.push(newBlock);
	}
}


let FUSD = new Blockchain();
FUSD.addBlock(new Block(1, "01/06/2021", { amount : 1000000}));
FUSD.addBlock(new Block(2, "02/06/2021", { amount : 1000000}));


console.log(JSON.stringify(FUSD, null, 4));