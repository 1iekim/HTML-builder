const fs = require('fs');
const path = require('path');
const way = path.join(__dirname, 'text.txt');
const stream = fs.createReadStream(`${way}`, 'utf-8');

let text = '';

stream.on('data', chunk => text += chunk);
stream.on('end', () => console.log(text));
stream.on('error', error => console.log('Error', error.message));