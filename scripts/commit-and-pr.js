import { execSync } from 'child_process';

try {
  // Configure git
  execSync('git config user.email "v0@vercel.com"', { stdio: 'inherit' });
  execSync('git config user.name "v0 Assistant"', { stdio: 'inherit' });

  // Check status
  console.log('\n[v0] Current branch status:');
  execSync('git status', { stdio: 'inherit' });

  // Add all changes
  console.log('\n[v0] Adding all changes...');
  execSync('git add -A', { stdio: 'inherit' });

  // Commit the changes
  console.log('\n[v0] Committing changes...');
  execSync('git commit -m "fix: remove Google Genai dependency and AI features\n\n- Remove @google/genai from package.json to fix dependency version conflict\n- Remove Gemini AI integration from PostTaskPage.tsx\n- Remove AI vetting analysis from ApplicationsPage.tsx\n- Clean up unused AI import from index.html\n- Fix import path in ApplicationsPage.tsx from state.tsx to App.tsx\n\nThis resolves the pnpm installation error where @google/genai@0.21.0 doesn\'t exist."', { stdio: 'inherit' });

  // Show the commit
  console.log('\n[v0] Latest commit:');
  execSync('git log -1 --oneline', { stdio: 'inherit' });

  // Push changes
  console.log('\n[v0] Pushing changes to pnpm-dependency-error branch...');
  execSync('git push origin pnpm-dependency-error', { stdio: 'inherit' });

  console.log('\n✅ Changes committed and pushed successfully!');
  console.log('📋 You can now create a PR at: https://github.com/adeolabambo012-alt/Rippls/pull/new/pnpm-dependency-error');

} catch (error) {
  console.error('[v0] Error:', error.message);
  process.exit(1);
}
