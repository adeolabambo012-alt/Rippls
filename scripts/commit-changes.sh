#!/bin/bash
set -e

# Configure git
git config user.email "v0@vercel.com"
git config user.name "v0 Assistant"

# Add all changes
git add -A

# Commit the changes
git commit -m "fix: remove Google Genai dependency and AI features

- Remove @google/genai from package.json to fix dependency version conflict
- Remove Gemini AI integration from PostTaskPage.tsx
- Remove AI vetting analysis from ApplicationsPage.tsx
- Clean up unused AI import from index.html
- Fix import path in ApplicationsPage.tsx from state.tsx to App.tsx

This resolves the pnpm installation error where @google/genai@0.21.0 doesn't exist."

# Display commit info
git log -1 --oneline
