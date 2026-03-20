import fs from "fs";
import path from "path";

/**
 * Downloads all external images (covers + banners) to public/img/ and
 * updates the JSON URLs to local paths.
 *
 * Usage: npx tsx scripts/download-images.ts [filename]
 * Example: npx tsx scripts/download-images.ts winter-2026
 */

const DATA_DIR = path.join(__dirname, "..", "data");
const PUBLIC_DIR = path.join(__dirname, "..", "public", "img");

async function downloadImage(url: string, filepath: string): Promise<boolean> {
  try {
    const res = await fetch(url);
    if (!res.ok) return false;
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(filepath, buf);
    return true;
  } catch {
    return false;
  }
}

function getExt(url: string): string {
  return url.endsWith(".png") ? "png" : "jpg";
}

async function main() {
  const file = process.argv[2] ?? "winter-2026";
  const filepath = path.join(DATA_DIR, `${file}.json`);
  const data = JSON.parse(fs.readFileSync(filepath, "utf-8"));

  const coverDir = path.join(PUBLIC_DIR, "cover");
  const bannerDir = path.join(PUBLIC_DIR, "banner");
  fs.mkdirSync(coverDir, { recursive: true });
  fs.mkdirSync(bannerDir, { recursive: true });

  let downloaded = 0;
  let failed = 0;

  for (const entry of data) {
    const id = entry.anilistId || entry.slug;
    if (!id) continue;

    // Cover image
    if (entry.image && entry.image.startsWith("http")) {
      const ext = getExt(entry.image);
      const filename = `${id}.${ext}`;
      const dest = path.join(coverDir, filename);

      if (!fs.existsSync(dest)) {
        if (await downloadImage(entry.image, dest)) {
          downloaded++;
        } else {
          console.log(`FAIL cover: ${entry.title}`);
          failed++;
          continue;
        }
      }
      entry.image = `/img/cover/${filename}`;
    }

    // Banner
    if (entry.banner && entry.banner.startsWith("http")) {
      const ext = getExt(entry.banner);
      const filename = `${id}.${ext}`;
      const dest = path.join(bannerDir, filename);

      if (!fs.existsSync(dest)) {
        if (await downloadImage(entry.banner, dest)) {
          downloaded++;
        } else {
          console.log(`FAIL banner: ${entry.title}`);
          failed++;
          continue;
        }
      }
      entry.banner = `/img/banner/${filename}`;
    }
  }

  fs.writeFileSync(filepath, JSON.stringify(data, null, 2), "utf-8");
  console.log(`Done! Downloaded: ${downloaded}, Failed: ${failed}`);
}

main().catch(console.error);
