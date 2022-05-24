const fs = require('fs');
const path = require('path');

const wayStyle = path.join(__dirname, 'styles');
const wayProd = path.join(__dirname, 'project-dist');
const wayAllStyle = path.join(wayProd, 'bundle.css');
const output = fs.createWriteStream(wayAllStyle);

fs.readdir(wayStyle, (err, files) => {
  files.forEach(file => {
    if(file.slice(-3) === 'css') {
      fs.readFile(path.join(wayStyle, file), function (err, cont) {
        if(err) console.log('Err');
        output.write(cont);
      })
    }
  })
});

