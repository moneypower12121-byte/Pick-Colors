const fs = require('fs');

const mappings = [
  { file: 'src/pages/Picker.tsx', slug: 'color-picker-converter' },
  { file: 'src/pages/Palette.tsx', slug: 'random-color-palette-generator' },
  { file: 'src/pages/tools/MeshGradient.tsx', slug: 'gradient-generator' },
  { file: 'src/pages/tools/ImageExtractor.tsx', slug: 'image-color-extractor' },
  { file: 'src/pages/tools/HarmonyWheel.tsx', slug: 'color-harmonies-generator' },
  { file: 'src/pages/tools/ContrastChecker.tsx', slug: 'color-contrast-checker' },
  { file: 'src/pages/tools/ReadabilityTester.tsx', slug: 'text-readability-tester' },
  { file: 'src/pages/tools/AccessibilityChecker.tsx', slug: 'accessibility-color-checker' },
  { file: 'src/pages/tools/ColorFinder.tsx', slug: 'color-finder-by-code' },
  { file: 'src/pages/tools/CssColorNames.tsx', slug: 'css-color-names-finder' },
  { file: 'src/pages/tools/VisionSimulator.tsx', slug: 'color-blindness-simulator' },
  { file: 'src/pages/tools/TonalStacker.tsx', slug: 'tonal-stacker-tool' },
  { file: 'src/pages/tools/ColorInterpolator.tsx', slug: 'color-interpolator' },
  { file: 'src/pages/tools/BrandMatcher.tsx', slug: 'brand-color-matcher' },
  { file: 'src/pages/tools/TokenExporter.tsx', slug: 'design-token-exporter' },
  { file: 'src/pages/tools/FormatConverter.tsx', slug: 'color-picker-converter' },
  { file: 'src/pages/tools/ImageUrlExtractor.tsx', slug: 'image-color-extractor' },
  { file: 'src/pages/tools/NameThatColor.tsx', slug: 'css-color-names-finder' },
  { file: 'src/pages/tools/MoodBoardGenerator.tsx', slug: 'random-color-palette-generator' }
];

mappings.forEach(({ file, slug }) => {
  if (!fs.existsSync(file)) {
    console.log(`File not found: ${file}`);
    return;
  }

  let content = fs.readFileSync(file, 'utf8');

  // Add import { Link } if it doesn't exist
  if (!content.includes("import { Link }")) {
    content = content.replace(/(import .*;\n)/, "$1import { Link } from 'react-router-dom';\n");
  }

  // Find the paragraph with className="text-body max-w-2xl" or similar
  // and insert the link right after it.
  // Many files have:
  // <p className="text-body max-w-2xl">
  //   ...
  // </p>
  // We'll replace `</p>` with `</p>\n          <div className="mt-4"><Link to="/blog/${slug}" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-container transition-colors">Read the guide →</Link></div>`
  
  // Let's use a regex to find the first occurrence of `</p>` after `<p className="text-body`
  const pStart = content.indexOf('className="text-body');
  if (pStart !== -1) {
    const pEnd = content.indexOf('</p>', pStart);
    if (pEnd !== -1) {
      // Check if we already added it
      if (!content.includes(`to="/blog/${slug}"`)) {
        const insertPos = pEnd + 4;
        const linkHtml = `\n          <div className="mt-4"><Link to="/blog/${slug}" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-container transition-colors">Read the guide →</Link></div>`;
        content = content.slice(0, insertPos) + linkHtml + content.slice(insertPos);
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
      } else {
        console.log(`Already updated ${file}`);
      }
    } else {
      console.log(`Could not find </p> in ${file}`);
    }
  } else {
    console.log(`Could not find text-body in ${file}`);
  }
});
