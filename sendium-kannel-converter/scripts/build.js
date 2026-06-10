const fs = require('node:fs');
const path = require('node:path');

const projectRoot = path.resolve(__dirname, '..');
const sourceDir = path.join(projectRoot, 'src');
const distDir = path.join(projectRoot, 'dist');
const requiredFiles = ['index.html', 'styles.css', 'app.js'];

for (const file of requiredFiles) {
  const filePath = path.join(sourceDir, file);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing required source file: ${file}`);
  }
}

fs.rmSync(distDir, { force: true, recursive: true });
fs.mkdirSync(distDir, { recursive: true });

for (const file of requiredFiles) {
  fs.copyFileSync(path.join(sourceDir, file), path.join(distDir, file));
}

console.log(`Built ${requiredFiles.length} files into dist/`);
