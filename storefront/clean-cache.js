const fs = require('fs');
const path = require('path');

function removeDir(dirPath, options = {}) {
  const { skipIfMounted = false } = options;
  
  if (!fs.existsSync(dirPath)) {
    console.log(`${dirPath} does not exist, skipping...`);
    return;
  }

  console.log(`Removing ${dirPath}...`);
  
  try {
    // Try to remove the directory
    fs.rmSync(dirPath, { recursive: true, force: true });
    console.log(`✓ ${dirPath} removed`);
  } catch (err) {
    // If EBUSY (resource busy/locked, likely a Docker mount), just warn
    if (err.code === 'EBUSY' && skipIfMounted) {
      console.log(`⚠ ${dirPath} is mounted/locked, skipping (this is normal in Docker)`);
    } else {
      // For other errors, rethrow
      throw err;
    }
  }
}

console.log('Cleaning Next.js build cache...');
// Remove .next but skip cache subdirectory if mounted
const nextDir = path.join(__dirname, '.next');
if (fs.existsSync(nextDir)) {
  console.log('Removing .next contents (except mounted cache)...');
  try {
    const items = fs.readdirSync(nextDir);
    for (const item of items) {
      const itemPath = path.join(nextDir, item);
      if (item === 'cache') {
        // Skip cache directory if it's mounted
        console.log('⚠ Skipping .next/cache (may be Docker mounted)');
        continue;
      }
      try {
        fs.rmSync(itemPath, { recursive: true, force: true });
        console.log(`✓ Removed ${itemPath}`);
      } catch (err) {
        console.log(`⚠ Could not remove ${itemPath}: ${err.message}`);
      }
    }
  } catch (err) {
    console.log(`⚠ Could not clean .next: ${err.message}`);
  }
} else {
  console.log('.next does not exist, skipping...');
}

// node_modules/.cache is also often mounted, handle gracefully
removeDir(path.join(__dirname, 'node_modules', '.cache'), { skipIfMounted: true });
console.log('✓ Cache cleaning completed');
