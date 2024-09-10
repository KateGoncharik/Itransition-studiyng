const fs = require('fs');
const crypto = require('node:crypto');

const filePath = './data/file_00.data';

const fileBuffer = fs.readFileSync(filePath);

const hash = crypto.createHash('sha3-256');
hash.update(fileBuffer);

const hashValue = hash.digest('hex');

console.log(`SHA3-256 hash: ${hashValue}`);
