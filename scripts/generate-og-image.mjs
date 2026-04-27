import sharp from "sharp";

// Brand-aligned OG image (1200×630) for Connexus.
// Uses system serif/sans fallbacks since web fonts aren't reliably
// available in librsvg's font resolution path. The result is intentionally
// minimal — no Markéta photo, no logos to break, just typography on warm bg.

const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#FAF8F5"/>

  <!-- Subtle top accent bar -->
  <rect x="0" y="0" width="1200" height="6" fill="#B4542A"/>

  <!-- Eyebrow caption (mono, accent) -->
  <text x="80" y="130"
    font-family="'JetBrains Mono','Courier New',monospace"
    font-size="20" letter-spacing="2"
    fill="#B4542A">
    PRO POJIŠŤOVACÍ PORADCE · HYPOTEČNÍ MAKLÉŘE · INVESTIČNÍ PORADCE
  </text>

  <!-- Brand name (massive serif) -->
  <text x="80" y="290"
    font-family="Georgia,'Times New Roman',serif"
    font-size="140" font-weight="500"
    fill="#1A1A1A"
    letter-spacing="-4">
    Connexus
  </text>

  <!-- Headline (serif) -->
  <text x="80" y="395"
    font-family="Georgia,'Times New Roman',serif"
    font-size="56" font-weight="500"
    fill="#1A1A1A"
    letter-spacing="-1">
    Weby, které nezmizí po fakturaci.
  </text>

  <!-- Body (sans) -->
  <text x="80" y="455"
    font-family="'Helvetica Neue',Arial,sans-serif"
    font-size="26"
    fill="#4A4A4A">
    Vlastní design, texty, SEO a šest měsíců péče po spuštění.
  </text>

  <!-- Bottom accent line + URL -->
  <rect x="80" y="540" width="64" height="2" fill="#B4542A"/>
  <text x="80" y="585"
    font-family="'JetBrains Mono','Courier New',monospace"
    font-size="20"
    fill="#7A7A7A">
    connexus.cz
  </text>
</svg>`;

await sharp(Buffer.from(svg))
  .jpeg({ quality: 92, progressive: true, mozjpeg: true })
  .toFile("public/images/og-default.jpg");

// Also produce a webp variant for modern social platforms that prefer it
await sharp(Buffer.from(svg))
  .webp({ quality: 90 })
  .toFile("public/images/og-default.webp");

console.log("Generated public/images/og-default.jpg + og-default.webp");
