const fs = require('fs');
const path = require('path');

function removeDir(dirPath) {
  if (fs.existsSync(dirPath)) {
    console.log(`Removing ${dirPath}...`);
    fs.rmSync(dirPath, { recursive: true, force: true });
    console.log(`✓ ${dirPath} removed`);
  } else {
    console.log(`${dirPath} does not exist, skipping...`);
  }
}

console.log('Cleaning Next.js build cache...');
removeDir(path.join(__dirname, '.next'));
removeDir(path.join(__dirname, 'node_modules', '.cache'));
console.log('✓ Cache cleaned successfully');
