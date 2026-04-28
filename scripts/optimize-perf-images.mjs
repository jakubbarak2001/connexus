import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";

// Read source files into buffers first (frees fs handle), then process
// via sharp, then write back. Avoids Windows file-lock issues when
// sharp's pipeline keeps an internal handle open.

const portraits = [
  { path: "public/images/jakub_foto.jpg", width: 800, quality: 86 },
];

const heroes = [
  {
    base: "public/images/marketa-hero",
    width: 1920,
    height: 765,
    jpegQuality: 92,
    webpQuality: 90,
  },
];

for (const t of portraits) {
  const source = readFileSync(t.path);
  const buffer = await sharp(source)
    .resize(t.width, t.width, { fit: "cover" })
    .jpeg({ quality: t.quality, progressive: true, mozjpeg: true })
    .toBuffer();
  writeFileSync(t.path, buffer);
  console.log(`Resized ${t.path} → ${t.width}×${t.width}`);
}

for (const t of heroes) {
  const sourceJpg = readFileSync(`${t.base}.jpg`);
  const sourceWebp = readFileSync(`${t.base}.webp`);
  const jpg = await sharp(sourceJpg)
    .resize(t.width, t.height, { fit: "cover" })
    .jpeg({ quality: t.jpegQuality ?? 86, progressive: true, mozjpeg: true })
    .toBuffer();
  const webp = await sharp(sourceWebp)
    .resize(t.width, t.height, { fit: "cover" })
    .webp({ quality: t.webpQuality ?? 84 })
    .toBuffer();
  writeFileSync(`${t.base}.jpg`, jpg);
  writeFileSync(`${t.base}.webp`, webp);
  console.log(`Resized ${t.base} → ${t.width}×${t.height} (jpg + webp)`);
}
