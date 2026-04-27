import sharp from "sharp";

const targets = [
  {
    src: "public/images/marketa-screenshot.png",
    base: "public/images/marketa-screenshot",
    width: 1920,
  },
  {
    src: "public/images/marketa_below_the_fold.png",
    base: "public/images/marketa_below_the_fold",
    width: 1920,
  },
];

for (const t of targets) {
  await sharp(t.src)
    .resize({ width: t.width, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(`${t.base}.webp`);

  await sharp(t.src)
    .resize({ width: t.width, withoutEnlargement: true })
    .jpeg({ quality: 86, progressive: true, mozjpeg: true })
    .toFile(`${t.base}.jpg`);

  console.log(`Optimized: ${t.base}.webp + ${t.base}.jpg`);
}
