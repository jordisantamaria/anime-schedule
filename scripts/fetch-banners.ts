import fs from "fs";
import path from "path";

const DATA_FILE = path.join(__dirname, "..", "data", "winter-2026.json");
const ANILIST_URL = "https://graphql.anilist.co";

const QUERY = `
query ($id: Int) {
  Media(id: $id, type: ANIME) {
    id
    bannerImage
  }
}
`;

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));

  let fetched = 0;
  let found = 0;

  for (let i = 0; i < data.length; i++) {
    const entry = data[i];

    if (entry.banner) {
      console.log(`[${i + 1}] SKIP ${entry.title} (has banner)`);
      continue;
    }

    if (!entry.anilistId) {
      console.log(`[${i + 1}] SKIP ${entry.title} (no anilistId)`);
      continue;
    }

    const res = await fetch(ANILIST_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: QUERY, variables: { id: entry.anilistId } }),
    });

    if (!res.ok) {
      console.log(`[${i + 1}] ERROR ${entry.title}: ${res.status}`);
      await sleep(2000);
      continue;
    }

    const json = await res.json();
    const banner = json.data?.Media?.bannerImage;
    fetched++;

    if (banner) {
      entry.banner = banner;
      found++;
      console.log(`[${i + 1}] OK ${entry.title}`);
    } else {
      console.log(`[${i + 1}] NO BANNER ${entry.title}`);
    }

    await sleep(1500);
  }

  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
  console.log(`\nDone! Fetched ${fetched}, found banners: ${found}`);
}

main().catch(console.error);
