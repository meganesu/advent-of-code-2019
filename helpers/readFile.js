const fs = require('fs');

const readFile = () => {
  if (process.argv.length < 3) {
    console.log('Usage: node ' + process.argv[1] + ' FILENAME');
    process.exit(1);
  }  

  const filename = process.argv[2];
  try {
    return fs.readFileSync(filename, 'utf8');
  } catch (err) {
    throw err;
  }
};

module.exports = readFile;