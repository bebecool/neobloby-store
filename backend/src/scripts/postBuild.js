const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

// For Medusa v2, check if the dist directory exists instead
const MEDUSA_DIST_PATH = path.join(process.cwd(), 'dist');

// Check if dist exists (Medusa v2 build output)
if (!fs.existsSync(MEDUSA_DIST_PATH)) {
  console.log('No dist directory found. Skipping postBuild steps.');
  process.exit(0);
}

console.log('PostBuild script completed successfully for Medusa v2');
