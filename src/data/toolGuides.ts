export interface ToolGuideData {
  title: string;
  usage: string[];
  features: { title: string; description: string }[];
  faq: { question: string; answer: string }[];
  relatedTools: { name: string; path: string }[];
}

export const toolGuides: Record<string, ToolGuideData> = {
  'contrast-checker': {
    title: 'Color Contrast Checker',
    usage: [
      'Enter your Foreground (Text) color HEX code or use the color picker.',
      'Enter your Background color HEX code.',
      'Review the calculated contrast ratio displayed in real-time.',
      'Check the WCAG 2.1 Pass/Fail status for Normal and Large text levels (AA and AAA).',
      'Use the live preview window to see how the combination looks in a real UI context.'
    ],
    features: [
      { title: 'WCAG 2.1 Compliance', description: 'Instantly check if your colors meet the Web Content Accessibility Guidelines (WCAG) for AA and AAA levels.' },
      { title: 'Optical Preview', description: 'Don\'t just look at numbers. See your color combination in a realistic UI mockup with headings, body text, and buttons.' },
      { title: 'Real-time Calculations', description: 'Our algorithms update at 60fps as you slide the color picker, giving you instant feedback for precision adjustments.' },
      { title: 'Contrast Ratio Analysis', description: 'Get the exact mathematical ratio (e.g., 4.5:1) used by auditors to verify accessibility.' }
    ],
    faq: [
      { question: 'What is a good contrast ratio?', answer: 'For standard text, WCAG AA requires 4.5:1. For large text (18pt+), 3:1 is sufficient. Enhanced accessibility (AAA) requires 7:1.' },
      { question: 'Does contrast affect SEO?', answer: 'Yes. Search engines like Google prioritize user experience. Poor readability scores can indirectly affect your mobile-friendly and UX rankings.' },
      { question: 'Why use a contrast checker?', answer: 'To ensure your website is inclusive for users with low vision or color blindness, which accounts for roughly 1 in 12 men and 1 in 200 women.' }
    ],
    relatedTools: [
      { name: 'Accessibility Checker', path: '/tools/accessibility-checker' },
      { name: 'Vision Simulator', path: '/tools/vision-simulator' },
      { name: 'Readability Tester', path: '/tools/readability-tester' }
    ]
  },
  'format-converter': {
    title: 'Color Format Converter',
    usage: [
      'Paste any color code (HEX, RGB, HSL, or CSS Name) into the input field.',
      'The tool automatically detects the format and populates all equivalent types.',
      'Click the copy icon next to any format to copy it to your clipboard.',
      'Adjust the precision of HSL and RGB values using the sliders if needed.'
    ],
    features: [
      { title: 'Universal Detection', description: 'Our smart input engine recognizes HEX, RGB, RGBA, HSL, HSLA, and official CSS color names automatically.' },
      { title: 'Zero Loss Conversion', description: 'Mathematically precise transforms that ensure your color remains identical across different technical formats.' },
      { title: 'Developer Ready', description: 'Get codes formatted specifically for CSS, Tailwind, or Android/iOS development environments.' },
      { title: 'Alpha Channel Support', description: 'Seamlessly convert between HEX and RGBA while preserving transparency values.' }
    ],
    faq: [
      { question: 'What is the difference between HEX and RGB?', answer: 'HEX is a base-16 representation used primarily in web design. RGB stands for Red, Green, Blue and is the standard for display hardware.' },
      { question: 'Should I use HSL in CSS?', answer: 'HSL (Hue, Saturation, Lightness) is often preferred by designers because it\'s more intuitive to adjust by hand compared to HEX or RGB.' },
      { question: 'Are CSS color names precise?', answer: 'Yes, the 140+ official CSS color names translate to specific HEX values that are consistent across all modern browsers.' }
    ],
    relatedTools: [
      { name: 'CSS Color Names', path: '/tools/css-color-names' },
      { name: 'Token Exporter', path: '/tools/token-exporter' }
    ]
  },
  'tonal-stacker': {
    title: 'Tonal Stacker',
    usage: [
      'Select a base brand color using the picker or input field.',
      'Choose the number of steps (shades/tints) you want to generate.',
      'The stacker creates a mathematically balanced ramp from pure white to pure black.',
      'Copy individual HEX codes or export the entire palette for your design system.'
    ],
    features: [
      { title: 'Luminance Balancing', description: 'Unlike simple brightness shifts, our tonality engine balances perceived luminance for a more natural visual ramp.' },
      { title: 'Design System Friendly', description: 'Perfect for creating 50-900 step palettes consistent with Material Design or Tailwind CSS architectures.' },
      { title: 'Optical Smoothing', description: 'Automatically smooths the transition between shades to prevent "banding" or muddy transitions in the mid-tones.' },
      { title: 'Instant Visualization', description: 'See how the entire stack looks together to ensure enough contrast exists between consecutive steps.' }
    ],
    faq: [
      { question: 'What are tints and shades?', answer: 'A tint is a color mixed with white, increasing its lightness. A shade is a color mixed with black, decreasing its lightness.' },
      { question: 'How many shades should a UI have?', answer: 'Most modern design systems use between 5 and 10 shades per primary color to handle backgrounds, borders, and interaction states.' },
      { question: 'Why not just use opacity?', answer: 'Opacity changes can cause "interference" with background colors. Dedicated tonal steps ensure your color remains consistent regardless of background.' }
    ],
    relatedTools: [
      { name: 'Color Interpolator', path: '/tools/color-interpolator' },
      { name: 'Palette Generator', path: '/palette' }
    ]
  },
  'harmony-wheel': {
    title: 'Color Harmony Wheel',
    usage: [
      'Pick a seed color to serve as the "Root" of your harmony.',
      'Select a harmony type: Complementary, Analogous, Triadic, or Tetradic.',
      'Watch as the wheel geometrically calculates the perfect relationship between colors.',
      'Fine-tune the saturation and lightness of the entire set simultaneously for better cohesion.'
    ],
    features: [
      { title: 'Mathematical Precision', description: 'Calculates degree-perfect relationships based on Hue degree splits (e.g., 180° for complementary).' },
      { title: '4 Standard Harmonies', description: 'Explore Complementary, Split-Complementary, Triadic (120°), and Analogous (30°) combinations instantly.' },
      { title: 'Dynamic Interaction', description: 'Drag the wheel handle and watch the entire harmonic system rotate and update in real-time.' },
      { title: 'Visual Balancing', description: 'Ensures that generated harmonies maintain a consistent "mood" by syncing their saturation levels.' }
    ],
    faq: [
      { question: 'What is a complementary color?', answer: 'Complementary colors are directly opposite each other on the color wheel. They provide maximum contrast and high energy.' },
      { question: 'When should I use triadic colors?', answer: 'Triadic schemes use colors spaced evenly around the wheel. They are great for vibrant, diverse UIs where balance is key.' },
      { question: 'What are analogous colors?', answer: 'Analogous colors sit next to each other. They are inherently harmonious and create serene, comfortable designs often seen in nature.' }
    ],
    relatedTools: [
      { name: 'Palette Gallery', path: '/gallery' },
      { name: 'Mesh Gradient', path: '/tools/mesh-gradient' }
    ]
  },
  'mesh-gradient': {
    title: 'Mesh Gradient Generator',
    usage: [
      'Add up to 5 custom color stops to your mesh canvas.',
      'Drag the color points to position "blobs" of light and color.',
      'Adjust the blur and spread of each point to create soft or sharp transitions.',
      'Copy the generated CSS background code for your project.'
    ],
    features: [
      { title: 'Interactive Canvas', description: 'A fully interactive visual editor where you can drag and drop color points for organic, liquid transitions.' },
      { title: 'CSS Layering', description: 'Generates complex radial-gradient stacks that work in all modern browsers without the need for images.' },
      { title: 'Infinite Variety', description: 'Create atmospheric backgrounds, glassmorphism backdrops, or high-energy artistic gradients in seconds.' },
      { title: 'Responsive Output', description: 'The generated CSS uses percentages, ensuring your mesh gradient looks perfect on any screen size.' }
    ],
    faq: [
      { question: 'What is a mesh gradient?', answer: 'A mesh gradient is a complex, multi-point color transition that looks more organic and "liquid" than standard linear gradients.' },
      { question: 'Are mesh gradients performant?', answer: 'Yes. Because they are generated with CSS gradients, they have zero file size and render fast compared to large background images.' },
      { question: 'Can I use these for hero sections?', answer: 'Absolutely. Mesh gradients are a top design trend for hero sections as they provide depth and movement without distracting from text.' }
    ],
    relatedTools: [
      { name: 'Atmospheric Hero', path: '/' },
      { name: 'Color Interpolator', path: '/tools/color-interpolator' }
    ]
  },
  'color-interpolator': {
    title: 'Color Interpolator',
    usage: [
      'Select a "Start" color and an "End" color.',
      'Set the number of interpolation steps (e.g., 5 or 10).',
      'The tool calculates the mathematical midpoint colors between your selections.',
      'Copy any generated step HEX code or export the full sequence.'
    ],
    features: [
      { title: 'Linear Interpolation', description: 'Uses precise RGB midpoint math to calculate even steps between any two colors.' },
      { title: 'Palette Balancing', description: 'Perfect for creating cohesive gradients or bridge colors for complex interfaces.' },
      { title: 'Contrast Check Integration', description: 'Ensures that interpolated steps remain usable against standard black or white backgrounds.' },
      { title: 'CSS Ramp Export', description: 'Instantly generate CSS custom properties for a smoothly stepped color scale.' }
    ],
    faq: [
      { question: 'What is color interpolation?', answer: 'Interpolation is the mathematical process of finding new values between two known values. In color, it creates a progression from one hue to another.' },
      { question: 'Can I interpolate between HEX and RGB?', answer: 'Yes, our engine converts both to a shared coordinate space to ensure the math is 100% accurate.' },
      { question: 'How is this different from a gradient?', answer: 'A gradient is a continuous flow, while interpolation creates discrete, usable steps for UI elements.' }
    ],
    relatedTools: [
      { name: 'Tonal Stacker', path: '/tools/tonal-stacker' },
      { name: 'Mesh Gradient', path: '/tools/mesh-gradient' }
    ]
  },
  'token-exporter': {
    title: 'Design Token Exporter',
    usage: [
      'Build your palette using the picker or generator tools.',
      'Select your target output format: CSS, Tailwind, JSON, or Figma.',
      'Review the generated code in the live preview window.',
      'Click copy and paste the tokens directly into your project configuration.'
    ],
    features: [
      { title: 'Tailwind Support', description: 'Get a ready-to-copy `tailwind.config.js` snippet including primary, secondary, and neutral scales.' },
      { title: 'CSS Variables', description: 'Export tokens in the standard `--color-primary` format for modern CSS use.' },
      { title: 'JSON for Apps', description: 'Standard JSON export for cross-platform apps (Android, iOS, Flutter).' },
      { title: 'Figma Compliant', description: 'Naming conventions that map perfectly to Figma Styles or Variables.' }
    ],
    faq: [
      { question: 'What are design tokens?', answer: 'Design tokens are the visual atoms of a design system—named values like colors, spacing, and typography that ensure consistency across platforms.' },
      { question: 'Why use an exporter?', answer: 'To eliminate "magic numbers" in code and ensure that the developer\'s CSS perfectly matches the designer\'s intent.' },
      { question: 'Can I export alpha channels?', answer: 'Yes, our exporter handles RGBA and HEXA transparency formats automatically.' }
    ],
    relatedTools: [
      { name: 'Color Finder', path: '/tools/color-finder' },
      { name: 'Palette Gallery', path: '/gallery' }
    ]
  },
  'vision-simulator': {
    title: 'Vision Simulator',
    usage: [
      'Select a color palette or upload an image.',
      'Toggle between simulations like Protanopia, Deuteranopia, and Tritanopia.',
      'See how your colors appear to users with different forms of color blindness.',
      'Analyze if critical UI information remains distinguishable in all views.'
    ],
    features: [
      { title: 'Scientific Modeling', description: 'Uses industry-standard transformation matrices to simulate real-world color vision deficiencies.' },
      { title: 'Achromatopsia Mode', description: 'View your design in pure grayscale to check for "Contrast Only" usability.' },
      { title: 'Real-time Comparison', description: 'Side-by-side view of original vs. simulated colors for instant debugging.' },
      { title: 'Inclusive Design Tool', description: 'Ensure your app is accessible to the 300 million people worldwide with color vision issues.' }
    ],
    faq: [
      { question: 'Why test for color blindness?', answer: 'Roughly 8% of men have some form of color vision deficiency. If your UI relies solely on color to convey meaning (like red for error), they may miss it.' },
      { question: 'What is Protanopia?', answer: 'Protanopia is red-blindness. Affected individuals have difficulty distinguishing between red, blue, and green.' },
      { question: 'How can I fix bad vision scores?', answer: 'Use text labels, icons, or high contrast borders in addition to color to signal status changes.' }
    ],
    relatedTools: [
      { name: 'Contrast Checker', path: '/tools/contrast-checker' },
      { name: 'Accessibility Checker', path: '/tools/accessibility-checker' }
    ]
  },
  'image-extractor': {
    title: 'Image Color Extractor',
    usage: [
      'Upload an image file (JPG, PNG, or WebP).',
      'The tool analyzes the pixel data to find dominant color clusters.',
      'View the generated "Extracted Palette" at the bottom of the tool.',
      'Save the palette to your library or export individual HEX codes.'
    ],
    features: [
      { title: 'Dominant Color Logic', description: 'Advanced clustering algorithms that find the most impactful colors in your photography.' },
      { title: 'Palette Generation', description: 'Turns a single photo into a cohesive 5-color palette instantly.' },
      { title: 'High Performance', description: 'Processes high-resolution images locally in your browser for maximum speed and privacy.' },
      { title: 'Mood Board Ready', description: 'Perfect for creating color schemes based on nature, products, or interior design photos.' }
    ],
    faq: [
      { question: 'Can I extract colors from a URL?', answer: 'Yes, use our "Image URL Extractor" tool for online images without downloading them.' },
      { question: 'Is my data secure?', answer: 'Everything happens client-side. Your images are never uploaded to a server.' },
      { question: 'What format should I use?', answer: 'Any standard image format works, but high-contrast photos usually produce the most "brandable" palettes.' }
    ],
    relatedTools: [
      { name: 'Image URL Extractor', path: '/tools/image-url-extractor' },
      { name: 'Color Picker', path: '/picker' }
    ]
  },
  'readability-tester': {
    title: 'Readability Tester',
    usage: [
      'Paste your content into the text area.',
      'Adjust font size, weight, and line-height.',
      'Switch between different color themes to test legibility.',
      'Observe how your choice of typography and color affects the "Reading Flow".'
    ],
    features: [
      { title: 'Live Type Lab', description: 'Test different Google Fonts and system stacks in real-world paragraph contexts.' },
      { title: 'Scale Validation', description: 'Verify your type scale from 12px captions to 64px display headings.' },
      { title: 'Contrast Verification', description: 'Automatically alerts you if your text/background combination falls below WCAG standards.' },
      { title: 'Editorial focus', description: 'Designed for UX writers and designers who care about content density and legibility.' }
    ],
    faq: [
      { question: 'What makes text readable?', answer: 'A combination of high contrast (at least 4.5:1), generous line-height (1.4 - 1.6), and appropriate font-size (16px+ for body).' },
      { question: 'Should I use serif or sans-serif?', answer: 'Sans-serif is generally considered easier to read on digital screens, though modern high-DPI serifs are also excellent for long-form content.' },
      { question: 'Is pure black text bad?', answer: 'Pure black (#000) on pure white (#FFF) can cause "halidation" or eye strain. Many designers use a very dark gray (#121212) instead.' }
    ],
    relatedTools: [
      { name: 'Contrast Checker', path: '/tools/contrast-checker' },
      { name: 'CSS Color Names', path: '/tools/css-color-names' }
    ]
  },
  'accessibility-checker': {
    title: 'Accessibility Color Checker',
    usage: [
      'Enter your full color palette (up to 8 colors).',
      'The checker performs a matrix analysis of every foreground/background combination.',
      'Check the score grid for WCAG compliance marks.',
      'Adjust problematic pairs to ensure your design system is universally accessible.'
    ],
    features: [
      { title: 'Matrix Analysis', description: 'See how every color in your palette interacts with every other color in one comprehensive grid.' },
      { title: 'Blindness Scorecard', description: 'Combines contrast math with color blindness simulations for a 360° view of accessibility.' },
      { title: 'Dynamic Recommendations', description: 'If a pair fails, we suggest technical adjustments to the lightness or saturation to reach a passing score.' },
      { title: 'Audit Ready', description: 'Perfect for preparing design documentation for legal or corporate accessibility audits.' }
    ],
    faq: [
      { question: 'Why a matrix view?', answer: 'A matrix view helps you identify "Safe combinations" for your entire design system at a glance, rather than checking pairs one by one.' },
      { question: 'What is WCAG 2.1 level AA?', answer: 'AA is the most common legal standard for web accessibility. It requires a contrast ratio of at least 4.5:1 for most text.' },
      { question: 'Can bright colors be accessible?', answer: 'Yes, if paired with the right background. Highly saturated colors often require very dark or very light companions to meet contrast ratios.' }
    ],
    relatedTools: [
      { name: 'Contrast Checker', path: '/tools/contrast-checker' },
      { name: 'Vision Simulator', path: '/tools/vision-simulator' }
    ]
  },
  'image-url-extractor': {
    title: 'Image URL Color Extractor',
    usage: [
      'Paste any public image URL into the input field.',
      'Our proxy server safely fetches the image metadata and pixels.',
      'Browse the extracted palette and dominant hex codes.',
      'Directly export the results into your design token library.'
    ],
    features: [
      { title: 'CORS Proxy Support', description: 'Our custom proxy handles Cross-Origin issues, letting you extract colors from sites like Unsplash or Pinterest.' },
      { title: 'Visual Sampling', description: 'Displays the image alongside the palette for immediate context and mood verification.' },
      { title: 'Developer Friendly', description: 'Get the precise palette of any live asset for pixel-perfect implementation.' },
      { title: 'Speed Focused', description: 'Optimized for fast palette extraction even for large remote assets.' }
    ],
    faq: [
      { question: 'Why use a URL instead of upload?', answer: 'It\'s faster for working with external design assets, placeholder images, or inspiration found on the web.' },
      { question: 'Does this save my image?', answer: 'No. The image is processed in memory and never stored on our servers.' },
      { question: 'What if the URL is private?', answer: 'The extractor requires a public, reachable URL to fetch the pixel data.' }
    ],
    relatedTools: [
      { name: 'Image Extractor (Upload)', path: '/tools/image-extractor' },
      { name: 'Color Finder', path: '/tools/color-finder' }
    ]
  },
  'color-finder': {
    title: 'Similar Color Finder',
    usage: [
      'Enter a base color HEX code.',
      'Adjust the "Distance" threshold to see broader or narrower matches.',
      'Browse visually similar shades, tints, and analogous variations.',
      'Perfect for finding alternatives to colors that are "almost right" but not quite.'
    ],
    features: [
      { title: 'Perceptual Matching', description: 'Uses Delta-E (Lab space) algorithms that match colors based on how humans see them, not just code numbers.' },
      { title: 'Variation Engine', description: 'Generates 20+ similar colors in a single click, providing a broad range of options.' },
      { title: 'Mood preservation', description: 'Finds alternatives that maintain the same perceived temperature and saturation as your original.' },
      { title: 'Alternative Discovery', description: 'Excellent for resolving "off-brand" colors in legacy projects.' }
    ],
    faq: [
      { question: 'How is "Similarity" calculated?', answer: 'We use the CIELAB color space, which is designed to be perceptually uniform—meaning the numerical distance matches human visual distance.' },
      { question: 'When should I use this?', answer: 'When you have a color that you like but it doesn\'t quite meet contrast requirements or matches another brand too closely.' },
      { question: 'Can I find similar HSL colors?', answer: 'Yes, our finder performs multi-space analysis to give you the most accurate alternatives.' }
    ],
    relatedTools: [
      { name: 'Contrast Checker', path: '/tools/contrast-checker' },
      { name: 'Palette Generator', path: '/palette' }
    ]
  },
  'css-color-names': {
    title: 'CSS Color Names Finder',
    usage: [
      'Type any name (e.g., "SteelBlue") or HEX code into the search bar.',
      'Our engine filters all 147 official W3C CSS color keywords in real-time.',
      'Click on a card to see its full technical details and related colors.',
      'Copy the name or HEX code for use in your CSS files.'
    ],
    features: [
      { title: 'W3C Compliant', description: 'Contains the complete database of all 147 standard CSS color keywords used by modern browsers.' },
      { title: 'Reverse Lookup', description: 'Input a HEX code to find the closest official CSS name (e.g., #FF4500 = OrangeRed).' },
      { title: 'Visual Cards', description: 'Each color is displayed on a high-contrast card for immediate visual recognition.' },
      { title: 'Legacy Support', description: 'Includes colors from the X11 and SVG specifications that are now part of the central CSS standard.' }
    ],
    faq: [
      { question: 'Are CSS names better than HEX?', answer: 'Names are easier to read for humans, but HEX codes are more precise and support a much larger range (16.7 million colors vs 147 names).' },
      { question: 'Is "Grey" or "Gray" correct?', answer: 'In CSS, both are valid and mapped to the same HEX values. Our search finds both.' },
      { question: 'Who defined these names?', answer: 'Most are based on the original X11 windowing system colors adopted by early web browsers and now standardized by the W3C.' }
    ],
    relatedTools: [
      { name: 'Format Converter', path: '/tools/format-converter' },
      { name: 'Token Exporter', path: '/tools/token-exporter' }
    ]
  },
  'picker': {
    title: 'Advanced Color Picker',
    usage: [
      'Use the large visual spectrum to find your base hue.',
      'Adjust Saturation and Lightness using the precision sliders below the picker.',
      'Monitor the real-time conversion between HEX, RGB, and HSL formats.',
      'Save found colors to your "Quick Palette" for easy access later.'
    ],
    features: [
      { title: 'Precision Spectrum', description: 'A high-definition color field that allows for sub-pixel selection of over 16.7 million colors.' },
      { title: 'HSB/HSL Intelligence', description: 'Easily adjust the psychological properties of color like "Vibrancy" or "Brightness" with dedicated controls.' },
      { title: 'Responsive Canvas', description: 'Optimized for both mouse/keyboard and touch-screen devices for a seamless design experience.' },
      { title: 'Copy-on-Click', description: 'Efficiency focused interface that lets you copy multiple formats with single keystrokes.' }
    ],
    faq: [
      { question: 'What format should I use for React?', answer: 'HEX is standard for static components, but RGBA is often better for dynamic background styles or overlays.' },
      { question: 'Can I pick colors from my screen?', answer: 'Yes! Use the browser\'s native Eyedropper API (supported in modern Chrome and Edge) integrated into our interface.' },
      { question: 'Is this picker calibrated?', answer: 'We use the standard sRGB color space which is the default for 99% of web traffic.' }
    ],
    relatedTools: [
      { name: 'Format Converter', path: '/tools/format-converter' },
      { name: 'Contrast Checker', path: '/tools/contrast-checker' }
    ]
  },
  'palette': {
    title: 'Palette Generator',
    usage: [
      'Press the spacebar or click "Generate" to see a new randomized palette.',
      'Lock colors you like by clicking the "Lock" icon.',
      'Adjust individual colors to fine-tune the group harmony.',
      'Export the final result into CSS, SCSS, or direct image downloads.'
    ],
    features: [
      { title: 'Algorithmic Harmony', description: 'Uses mathematical rules (Analogous, Complementary) to ensure generated palettes are always balanced.' },
      { title: 'Infinite Iteration', description: 'Never run out of inspiration with billions of possible high-quality combinations.' },
      { title: 'Contrast Scorecards', description: 'Automatically shows the usability score of every color in the palette against black and white.' },
      { title: 'Visual Testing', description: 'See your palette applied to dummy UI components right inside the tool.' }
    ],
    faq: [
      { question: 'How do I save my palettes?', answer: 'Use the "Export" or "Save to Library" features (requires account) to keep your favorite combinations.' },
      { question: 'Can I generate from a brand color?', answer: 'Yes! Enter your brand HEX code and "Lock" it before hitting generate to find compatible companions.' },
      { question: 'What is a trending palette?', answer: 'Our generator favors palettes with specific saturation and lightness ranges favored in modern Minimalist and Material design.' }
    ],
    relatedTools: [
      { name: 'Color Harmony Wheel', path: '/tools/harmony-wheel' },
      { name: 'Gallery', path: '/gallery' }
    ]
  }
};
