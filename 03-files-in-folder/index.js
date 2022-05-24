const fs = require('fs');
const { readdir } = require('fs/promises');
const path = require('path');
const way = path.join(__dirname, 'secret-folder');

async function redProm() {
  const files = await readdir(way, {withFileTypes: true});
  const arrFile = [];  
  
  for (let file of files) {
    if(file.isFile()){
      arrFile.push(file.name);
    }
  }

  for (let file of files) {
    if(!file.isFile()) continue;
    
    let timeWay = path.join(way, file.name); 
    
    fs.stat(timeWay, (err, st) => {
      let fullname = arrFile[arrFile.indexOf(file.name)];
      let name = fullname.slice(0, file.name.lastIndexOf('.'));
      let dirent = fullname.slice(file.name.lastIndexOf('.')+1);
    
      console.log(`${name} - ${dirent} - ${st.size}`);
    });
  }
}

redProm();