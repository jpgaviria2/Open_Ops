import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const site = path.join(root, 'site');
const fail = (message) => {
  console.error(`❌ ${message}`);
  process.exitCode = 1;
};
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const exists = (file) => fs.existsSync(path.join(site, file));

const pages = ['index.html', 'get-started.html', 'architecture.html'];
const html = Object.fromEntries(pages.map((page) => [page, read(`site/${page}`)]));

function localAssets(markup) {
  const matches = [...markup.matchAll(/(?:src|href)="([^"]+)"/g)].map((m) => m[1]);
  return matches.filter((asset) =>
    asset &&
    !asset.startsWith('http://') &&
    !asset.startsWith('https://') &&
    !asset.startsWith('mailto:') &&
    !asset.startsWith('#') &&
    !asset.startsWith('data:')
  );
}

for (const [page, markup] of Object.entries(html)) {
  for (const asset of localAssets(markup)) {
    if (!exists(asset.split('#')[0])) fail(`${page} references missing asset ${asset}`);
  }
}

const slideCount = [...html['index.html'].matchAll(/<section class="slide/g)].length;
if (slideCount !== 20) fail(`Expected 20 deck slides, found ${slideCount}`);
if (!html['index.html'].includes('slide-count">1 / 20')) fail('Deck slide counter is not 1 / 20');

const indexImages = [...html['index.html'].matchAll(/<img /g)].length;
if (indexImages !== 10) fail(`Expected 10 deck screenshots, found ${indexImages}`);
const galleryImages = [...html['get-started.html'].matchAll(/<img /g)].length;
if (galleryImages !== 15) fail(`Expected 15 intake gallery screenshots, found ${galleryImages}`);

const publicBundle = Object.values(html).join('\n');
const forbidden = [
  'CounterStack',
  'Open Ops',
  'Open_Ops',
  'AI-connected',
  'AI connected',
  'Execution path',
  'Merchant Launch Packet',
  'Recommended working name',
  'what\'s missing',
  'what’s missing',
  '<h2>Roadmap</h2>',
];
for (const phrase of forbidden) {
  if (publicBundle.includes(phrase)) fail(`Public pages contain forbidden/internal phrase: ${phrase}`);
}

const required = [
  'CounterMind',
  'AI-native',
  'AI agents are not an add-on',
  'Merchants do not buy a project plan',
  'CounterMind is an AI-native hosted platform',
  'Start the hosted merchant intake',
];
for (const phrase of required) {
  if (!publicBundle.includes(phrase)) fail(`Public pages missing required phrase: ${phrase}`);
}

for (let i = 1; i <= 15; i += 1) {
  const prefix = String(i).padStart(2, '0');
  const found = fs.readdirSync(path.join(site, 'assets/screenshots')).some((name) => name.startsWith(prefix));
  if (!found) fail(`Missing screenshot ${prefix}`);
}

if (!fs.existsSync(path.join(root, 'docs/production-readiness-review.md'))) {
  fail('Missing docs/production-readiness-review.md');
}

if (!process.exitCode) console.log('✅ CounterMind static site validation passed');
