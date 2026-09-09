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

// 1.5 Generate version metadata with millisecond UTC timestamp and git hash
const versionFile = path.join(rootDir, 'src', 'version.js');
let gitHash = 'unknown';
try {
  gitHash = execSync('git rev-parse --short HEAD', { cwd: rootDir }).toString().trim();
} catch (e) {
  gitHash = 'local';
}
const nowUTC = new Date().toISOString();
const versionContent = `/**
 * System Build & Version Metadata
 * Generated automatically during build
 */
export const BUILD_INFO = {
  version: '2.1.0',
  timestampUTC: '${nowUTC}',
  commitHash: '${gitHash}',
  environment: 'production',
  releaseTag: 'sbl001-gov-v2.1'
};

if (typeof window !== 'undefined') {
  window.__BUILD_INFO__ = BUILD_INFO;
}
`;
fs.writeFileSync(versionFile, versionContent, 'utf8');
console.log(`✓ Stamped build version: v2.1.0 • UTC: ${nowUTC} • ${gitHash}`);

// 2. Run vite build
console.log('Running Vite production build with single-file inlining...');
const viteBin = path.join(rootDir, 'node_modules', 'vite', 'bin', 'vite.js');
execSync(`node --max-old-space-size=8192 "${viteBin}" build`, { 
  stdio: 'inherit', 
  cwd: rootDir
});

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
