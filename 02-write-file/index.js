const fs = require('fs');
const path = require('path');
const way = path.join(__dirname, 'text.txt');
const outData = fs.createWriteStream(way);

process.stdout.write('Hi. Write text please...\n');

process.stdin.on('data', data => {
  const val = data.toString().trim();
  if (val.toLowerCase() === 'exit') process.exit();
  outData.write(data);
});

process.on('exit', () => process.stdout.write('Thanks.'));
process.on('SIGINT', () => {
  process.exit();
});