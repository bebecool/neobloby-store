#!/usr/bin/env node

const { exec } = require('child_process');

console.log('🔄 Running Medusa migrations...');

exec('npx medusa migrations run', (error, stdout, stderr) => {
  if (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
  if (stderr) {
    console.error(`⚠️  stderr: ${stderr}`);
  }
  console.log(`✅ stdout: ${stdout}`);
  console.log('✅ Migrations completed successfully!');
  process.exit(0);
});
