#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, 'dist');
const indexPath = path.join(distPath, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('❌ index.html not found in dist/');
  process.exit(1);
}

console.log('🔧 Fixing asset paths in index.html...');

let html = fs.readFileSync(indexPath, 'utf8');

// First, fix any duplicated paths (in case script runs twice)
html = html.replace(/\/studio\/studio\//g, '/studio/');

// Replace absolute paths /static/ with /studio/static/ (only if not already fixed)
// Check if path doesn't already start with /studio/
html = html.replace(/href="\/static\//g, 'href="/studio/static/');
html = html.replace(/src="\/static\//g, 'src="/studio/static/');
html = html.replace(/href="\/manifest\.webmanifest/g, 'href="/studio/manifest.webmanifest');

// Fix any remaining /static/ references in the HTML that aren't already /studio/static/
// Use a function to check if replacement is needed
html = html.replace(/\/static\//g, (match, offset, string) => {
  // Check if the previous characters are "/studio" (avoid double replacement)
  const before = string.substring(Math.max(0, offset - 7), offset);
  if (before.endsWith('/studio')) {
    return match; // Already has /studio/, don't replace
  }
  return '/studio/static/';
});

fs.writeFileSync(indexPath, html, 'utf8');

console.log('✅ Paths fixed successfully!');
console.log('   - /static/ → /studio/static/');

