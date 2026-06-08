import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const bumpType = process.argv[2] || 'patch';
if (!['patch', 'minor', 'major'].includes(bumpType)) {
  console.error('Usage: node scripts/bump-version.js [patch|minor|major]');
  process.exit(1);
}

const pkgPath = resolve(__dirname, '..', 'package.json');
const oldPkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
const oldVersion = oldPkg.version;

execSync(`npm version ${bumpType} --no-git-tag-version`, { cwd: __dirname, stdio: 'inherit' });

const newPkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
const newVersion = newPkg.version;

const changelogPath = resolve(__dirname, '..', 'CHANGELOG.md');
let changelog = readFileSync(changelogPath, 'utf-8');

const today = new Date().toISOString().split('T')[0];
const newEntry = `## [${newVersion}] - ${today}

### Added

### Changed

### Fixed

`;

const headerEnd = changelog.indexOf('\n## ');
if (headerEnd === -1) {
  console.error('Could not find version section in CHANGELOG.md');
  process.exit(1);
}

const insertionPoint = changelog.indexOf('\n', headerEnd);
changelog = changelog.slice(0, insertionPoint + 1) + '\n' + newEntry + changelog.slice(insertionPoint + 1);

writeFileSync(changelogPath, changelog);
console.log(`\n✓ Updated CHANGELOG.md with [${newVersion}] entry`);
console.log('Edit the new section with your changes, then commit.');
