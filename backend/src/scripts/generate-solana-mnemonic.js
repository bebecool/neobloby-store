/**
 * Script to generate a BIP39 mnemonic phrase for Solana payment provider
 * 
 * Usage: node src/scripts/generate-solana-mnemonic.js
 * 
 * This will generate a 12 or 24-word mnemonic phrase that can be used
 * as SOLANA_MNEMONIC in your .env file.
 * 
 * ⚠️ IMPORTANT: Keep this mnemonic phrase secure and never share it with anyone!
 */

import * as bip39 from 'bip39';

console.log('\n🔐 Generating Solana BIP39 Mnemonic Phrase...\n');

try {
  // Generate a 12-word mnemonic (128 bits of entropy)
  //const mnemonic = bip39.generateMnemonic(128);
  
  // For 24-word mnemonic, uncomment below:
  const mnemonic24 = bip39.generateMnemonic(256);

  console.log('✅ Mnemonic phrase generated successfully!\n');
  console.log('📋 Your 24-word mnemonic phrase:\n');
  console.log(`   ${mnemonic24}\n`);
  console.log('⚠️  IMPORTANT SECURITY NOTES:');
  console.log('   - Save this mnemonic phrase in a secure location');
  console.log('   - Never share it with anyone');
  console.log('   - Add it to your .env file as: SOLANA_MNEMONIC="your phrase here"');
  console.log('   - Do not commit this phrase to version control\n');
  
} catch (error) {
  console.error('❌ Error generating mnemonic:', error.message);
  process.exit(1);
}
