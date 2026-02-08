import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();

console.log('[v0] Updating pnpm lock file...');

try {
  // Run pnpm install to regenerate the lock file
  execSync('pnpm install --lockfile-only', {
    cwd: projectRoot,
    stdio: 'inherit'
  });
  
  console.log('[v0] Lock file updated successfully');
} catch (error) {
  console.error('[v0] Error updating lock file:', error.message);
  process.exit(1);
}
