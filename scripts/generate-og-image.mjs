import sharp from "sharp";

// Brand-aligned OG images for Connexus.
//
// Design constraints driven by the medium:
// - Must read at 80×80 thumbnails (WhatsApp, iMessage, Signal)
// - Must survive double JPEG recompression (LinkedIn, FB re-encode on upload)
// - Must visually compete with feed clutter
//
// Solution: high-contrast ink-on-paper palette, massive wordmark filling
// 70%+ of canvas, accent stripe gives a recognizable silhouette even when
// text is illegible. Uses Georgia (universal Windows/macOS serif) as a
// Newsreader stand-in — at this scale the visual difference is invisible
// and Georgia was specifically designed for low-resolution rendering,
// which is exactly what survives social-platform recompression.

// Aligned with the live site tokens (tailwind.config.mjs) so the share
// card reads as the same brand as the page it links to.
const COLOR_BG = "#F4F1EA";
const COLOR_FG = "#181511";
const COLOR_ACCENT = "#F54A00";
const COLOR_MUTED = "#6E6859";

function landscapeSvg() {
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="${COLOR_BG}"/>

    <!-- Left accent stripe — gives a recognizable silhouette at thumbnail size -->
    <rect x="0" y="0" width="14" height="630" fill="${COLOR_ACCENT}"/>

    <!-- Wordmark: massive serif filling the canvas. This is the only thing
         that needs to read at small sizes. -->
    <text x="600" y="335"
      text-anchor="middle"
      font-family="Georgia,'Times New Roman',serif"
      font-size="240" font-weight="400"
      fill="${COLOR_FG}"
      letter-spacing="-6">Connexus</text>

    <!-- Accent rule under wordmark -->
    <rect x="540" y="395" width="120" height="3" fill="${COLOR_ACCENT}"/>

    <!-- Tagline: bold sans, accent color, reads as a confident strapline -->
    <text x="600" y="475"
      text-anchor="middle"
      font-family="Arial,'Helvetica Neue',sans-serif"
      font-size="34" font-weight="700"
      fill="${COLOR_FG}"
      letter-spacing="0.5">Weby, SEO a péče po spuštění</text>

    <!-- Bottom URL — small, doesn't need to read at thumbnail -->
    <text x="600" y="565"
      text-anchor="middle"
      font-family="Arial,'Helvetica Neue',sans-serif"
      font-size="22" font-weight="400"
      fill="${COLOR_MUTED}"
      letter-spacing="2">connexus.cz</text>
  </svg>`;
}

function squareSvg() {
  return `<svg width="1200" height="1200" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="1200" fill="${COLOR_BG}"/>

    <!-- Left accent stripe -->
    <rect x="0" y="0" width="14" height="1200" fill="${COLOR_ACCENT}"/>

    <!-- Wordmark, even larger since we have square real estate -->
    <text x="600" y="640"
      text-anchor="middle"
      font-family="Georgia,'Times New Roman',serif"
      font-size="260" font-weight="400"
      fill="${COLOR_FG}"
      letter-spacing="-7">Connexus</text>

    <!-- Accent rule -->
    <rect x="540" y="705" width="120" height="3" fill="${COLOR_ACCENT}"/>

    <!-- Tagline -->
    <text x="600" y="790"
      text-anchor="middle"
      font-family="Arial,'Helvetica Neue',sans-serif"
      font-size="38" font-weight="700"
      fill="${COLOR_FG}"
      letter-spacing="0.5">Weby, SEO a péče po spuštění</text>

    <!-- URL -->
    <text x="600" y="1100"
      text-anchor="middle"
      font-family="Arial,'Helvetica Neue',sans-serif"
      font-size="24" font-weight="400"
      fill="${COLOR_MUTED}"
      letter-spacing="2">connexus.cz</text>
  </svg>`;
}

const WEBP_OPTS = { quality: 92, effort: 6 };

// Render at 2x then downscale → sharper edges than rasterising directly at
// target resolution (sharp's SVG path uses librsvg, which benefits from the
// supersampling step). Output PNG to match the <meta og:image> references
// in Layout.astro (lossless → no recompression artefacts on thin serifs).
async function renderToFile(svgString, width, height, pngPath, webpPath) {
  const buf = Buffer.from(svgString);
  const supersampled = await sharp(buf, { density: 288 })
    .resize(width, height, { kernel: "lanczos3" })
    .png()
    .toBuffer();

  await sharp(supersampled).png().toFile(pngPath);
  await sharp(supersampled).webp(WEBP_OPTS).toFile(webpPath);
}

await renderToFile(
  landscapeSvg(),
  1200,
  630,
  "public/images/og-default.png",
  "public/images/og-default.webp",
);

await renderToFile(
  squareSvg(),
  1200,
  1200,
  "public/images/og-square.png",
  "public/images/og-square.webp",
);

console.log("Generated:");
console.log("  public/images/og-default.png (1200×630)");
console.log("  public/images/og-default.webp (1200×630)");
console.log("  public/images/og-square.png (1200×1200)");
console.log("  public/images/og-square.webp (1200×1200)");
