let fs = require('fs');
const { join } = require('path');
const path = require('path');

fs.mkdir(path.join(__dirname, 'project-dist'), {recursive: true}, (err) => {
  if(err) console.log('Err:');
});

const writeStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));
writeStream.on('error', Promise.reject);

fs.readdir(path.join(__dirname, 'components'), (err, files) => {
    if (err) {
      console.log(err.message);
      throw err;
    }

    Promise.all(
        [
            getComponent(path.join(__dirname, 'template.html')),
            ...files
            .map((name) => {
                return getComponent(path.join(__dirname, 'components', name));
            })
        ]
    ).then((results) => {
        const [template, ...components] = results;

        components.forEach((comp) => {
            template.data = template.data.replace(`{{${comp.name}}}`, comp.data);
        })

        writeStream.write(template.data);
    });
});

function getComponent(componentPath) {
    let data = '';

    return new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(componentPath);
        readStream.on('error', reject);
        readStream.on('close', () => resolve({name: path.basename(componentPath).slice(0, -5), data}));
        readStream.on('data', (chunk) => data += chunk);
    });
}
//CSS
const wayStyle = path.join(__dirname, 'styles');
const wayProd = path.join(__dirname, 'project-dist');
const wayAllStyle = path.join(wayProd, 'style.css');
const output = fs.createWriteStream(wayAllStyle);

fs.readdir(wayStyle, (err, files) => {
  let arrFile = [];
  files.forEach(file => {
    arrFile.push(file);
  });

  arrFile = [arrFile[1], arrFile[2], arrFile[0]];
  
  arrFile.forEach(elem => {
    fs.readFile(path.join(wayStyle, elem), function (err, cont) {
        if(err) console.log('Err');
        output.write(cont);
      })
  })
});

//Copy file
const way = path.join(__dirname, 'assets');
const wayCopy = path.join(__dirname, 'project-dist', 'assets');

fs.mkdir(wayCopy, {recursive: true}, (err)=>{
  if(err) console.log('Err', err.message);
});

fs.readdir(way, (err, files) => {
  files.forEach(file => {
    if(!file.includes('.')) {
      fs.mkdir(path.join(wayCopy, file), {recursive: true}, (err)=>{
        if(err) console.log('Err', err.message);
      });

      fs.readdir(path.join(way, file), (err, filesTo) => {
        filesTo.forEach(fileTo => {
          fs.copyFile(path.join(way, file, fileTo), path.join(wayCopy, file, fileTo), () => {});
        })
      });
    } else {
      fs.copyFile(path.join(way, file), path.join(wayCopy, file), () => {});
    }
  });
})
