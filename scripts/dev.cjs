const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const indexHtml = path.join(rootDir, 'index.html');
const indexSource = path.join(rootDir, 'index.source.html');

if (fs.existsSync(indexSource)) {
  fs.copyFileSync(indexSource, indexHtml);
}

console.log('Starting Vite development server...');
execSync('npx vite', { stdio: 'inherit', cwd: rootDir });
