import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p: string) => path.resolve(__dirname, p);

const template = fs.readFileSync(toAbsolute('dist/static/index.html'), 'utf-8');
const { render } = await import('./dist/server/entry-server.js');

const routesToPrerender = fs
  .readFileSync(toAbsolute('public/sitemap.xml'), 'utf8')
  .match(/<loc>(.*?)<\/loc>/g)
  ?.map((loc) => {
    const url = loc.replace('<loc>', '').replace('</loc>', '');
    const pathName = new URL(url).pathname;
    return pathName;
  })
  .filter(p => p !== '/dashboard') || []; // exclude dynamic/auth routes if any

// Add some static routes if they are missed in sitemap
const predefinedRoutes = [
  '/',
  '/picker',
  '/palette',
  '/gallery',
  '/tools',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/blog',
  '/tools/contrast-checker',
  '/tools/format-converter',
  '/tools/tonal-stacker',
  '/tools/harmony-wheel',
  '/tools/mesh-gradient',
  '/tools/color-interpolator',
  '/tools/token-exporter',
  '/tools/vision-simulator',
  '/tools/image-extractor',
  '/tools/readability-tester',
  '/tools/accessibility-checker',
  '/tools/image-url-extractor',
  '/tools/color-finder',
  '/tools/css-color-names',
];

const uniqueRoutes = [...new Set([...routesToPrerender, ...predefinedRoutes])];

console.log(`Prerendering ${uniqueRoutes.length} routes...`);

(async () => {
  for (const url of uniqueRoutes) {
    const helmetContext: any = {};
    const { html: rawHtml } = render(url, helmetContext);
    
    const { helmet } = helmetContext;
    let appHead = '';
    
    // React 19 native hoisting support: extract tags from the start of the HTML string
    // React 19 often puts hoisted tags (title, meta, link) at the very beginning of the rendered string.
    let appHtml = rawHtml;
    const hoistedMatch = rawHtml.match(/^((?:<(?:title|meta|link|script|style)[^>]*>)+)/);
    if (hoistedMatch && hoistedMatch[1]) {
      appHead += hoistedMatch[1];
      appHtml = rawHtml.substring(hoistedMatch[1].length);
    }
    
    if (helmet) {
      appHead += `
        ${helmet.title.toString()}
        ${helmet.priority.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        ${helmet.script.toString()}
      `;
    }

    // Use the verification tag as a stable injection point that Vite won't strip
    const verificationTag = '<meta name="google-site-verification" content="1mGAy3undXj0rl6cQLOWBfTqJraxdtaVY5cN6yZTBcg" />';
    const html = template
      .replace(verificationTag, `${verificationTag}\n${appHead.trim()}`)
      .replace('<!--app-html-->', appHtml)
      .replace('<title>PickColors - The Digital Prism</title>', ''); // clean up placeholder if it survived

    const filePath = url === '/' ? 'index.html' : `${url.replace(/^\//, '')}/index.html`;
    const absolutePath = toAbsolute(`dist/static/${filePath}`);
    
    const dir = path.dirname(absolutePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(absolutePath, html);
    console.log(`pre-rendered: ${url}`);
  }
  
  console.log('Pre-rendering complete.');
})();
