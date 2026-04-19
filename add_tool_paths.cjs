const fs = require('fs');

const mappings = {
  'color-picker-converter': '/picker',
  'gradient-generator': '/tools/mesh-gradient',
  'random-color-palette-generator': '/palette',
  'image-color-extractor': '/tools/image-extractor',
  'color-harmonies-generator': '/tools/harmony-wheel',
  'color-contrast-checker': '/tools/contrast-checker',
  'text-readability-tester': '/tools/readability-tester',
  'accessibility-color-checker': '/tools/accessibility-checker',
  'color-finder-by-code': '/tools/color-finder',
  'css-color-names-finder': '/tools/css-color-names',
  'color-blindness-simulator': '/tools/vision-simulator',
  'tonal-stacker-tool': '/tools/tonal-stacker',
  'color-interpolator': '/tools/color-interpolator',
  'brand-color-matcher': '/tools/brand-matcher',
  'design-token-exporter': '/tools/token-exporter'
};

let content = fs.readFileSync('src/data/blogs.ts', 'utf8');

// Update interface
if (!content.includes('toolPath?: string;')) {
  content = content.replace('content: string;', 'content: string;\n  toolPath?: string;');
}

// Add toolPath to each blog
for (const [slug, path] of Object.entries(mappings)) {
  const regex = new RegExp(`(slug:\\s*'${slug}',[\\s\\S]*?content:\\s*\`[\\s\\S]*?\`\\n\\s*)},`, 'g');
  content = content.replace(regex, `$1,\n    toolPath: '${path}'\n  },`);
  
  // also handle the last item which might not have a trailing comma
  const regexLast = new RegExp(`(slug:\\s*'${slug}',[\\s\\S]*?content:\\s*\`[\\s\\S]*?\`\\n\\s*)}];`, 'g');
  content = content.replace(regexLast, `$1,\n    toolPath: '${path}'\n  }\n];`);
}

fs.writeFileSync('src/data/blogs.ts', content, 'utf8');
console.log('Updated blogs.ts');
