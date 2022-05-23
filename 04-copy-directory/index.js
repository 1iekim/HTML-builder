const fs = require('fs');
const path = require('path');

const way = path.join(__dirname, 'files');
const wayCopy = path.join(__dirname, 'files-copy');

fs.mkdir(wayCopy, {recursive: true}, (err)=>{
  if(err) console.log('Err', err.message);
});

fs.readdir(way, (err, files) => {
  files.forEach(file => {
    fs.copyFile(path.join(way, file), path.join(wayCopy, file), () => {});
  });
})