import { execSync } from 'child_process';
import { chdir } from 'process';

try {
  // Change to project directory
  chdir('/vercel/share/v0-project');
  console.log('[v0] Working directory:', process.cwd());

  // Configure git
  console.log('[v0] Configuring git...');
  execSync('git config user.email "v0@vercel.com"');
  execSync('git config user.name "v0 Assistant"');

  // Check status
  console.log('\n[v0] Current git status:');
  execSync('git status', { stdio: 'inherit' });

  // Add all changes
  console.log('\n[v0] Adding changes...');
  execSync('git add -A');

  // Commit the changes
  console.log('[v0] Committing...');
  const commitMsg = `fix: remove Google Genai dependency and AI features

- Remove @google/genai from package.json to fix dependency version conflict
- Remove Gemini AI integration from PostTaskPage.tsx
- Remove AI vetting analysis from ApplicationsPage.tsx
- Clean up unused AI import from index.html
- Fix import path in ApplicationsPage.tsx

This resolves the pnpm installation error where @google/genai@0.21.0 doesn't exist.`;

  execSync(`git commit -m "${commitMsg.replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`, { stdio: 'inherit' });

  // Show the commit
  console.log('\n[v0] Latest commit:');
  execSync('git log -1 --oneline', { stdio: 'inherit' });

  // Push changes
  console.log('\n[v0] Pushing to pnpm-dependency-error branch...');
  execSync('git push origin pnpm-dependency-error', { stdio: 'inherit' });

  console.log('\n✅ Changes committed and pushed!');

} catch (error) {
  console.error('[v0] Error:', error.message);
}
