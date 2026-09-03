const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const indexHtml = path.join(rootDir, 'index.html');
const indexSource = path.join(rootDir, 'index.source.html');
const distDir = path.join(rootDir, 'dist');
const distIndex = path.join(distDir, 'index.html');
const docsDir = path.join(rootDir, 'docs');
const docsIndex = path.join(docsDir, 'index.html');

// 1. Ensure source file exists and restore it to index.html for Vite to build
if (fs.existsSync(indexSource)) {
  fs.copyFileSync(indexSource, indexHtml);
}

// 2. Run vite build
console.log('Running Vite production build with single-file inlining...');
execSync('npx vite build', { stdio: 'inherit', cwd: rootDir });

// 3. Ensure docs directory exists
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

// 4. Overwrite root index.html and docs/index.html with compiled singlefile bundle
if (fs.existsSync(distIndex)) {
  fs.copyFileSync(distIndex, indexHtml);
  fs.copyFileSync(distIndex, docsIndex);
  console.log('✓ Successfully deployed compiled single-file bundle to index.html and docs/index.html!');
}
