const fs = require('fs');
const path = require('path');
const packageJSON = require('./package.json');

const buildPackageJSON = {
  name: 'serv-oil-app',
  dependencies: packageJSON.dependencies,
  scripts: {
    start: 'node index.js',
    deploy: "now -e MONGODB_URI=@serv-aceite-mongodb-url"
  },
};

fs.writeFile(
 path.resolve(__dirname, 'build', 'package.json'),
 JSON.stringify(buildPackageJSON),
 err => {
   if (err) {
     console.log(err);
   }
   // The file was saved
 }
);
