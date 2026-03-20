import fs from "fs";
import path from "path";

/**
 * Translates English synopses to Japanese using OpenAI API.
 *
 * Usage: OPENAI_API_KEY=... npx tsx scripts/translate-synopsis.ts [filename]
 */

const DATA_DIR = path.join(__dirname, "..", "data");
const API_URL = "https://api.openai.com/v1/chat/completions";

function isEnglish(text: string): boolean {
  const clean = text.replace(/[\n\s]/g, "");
  const ascii = clean.split("").filter((c) => c.charCodeAt(0) < 128).length;
  return clean.length > 0 && ascii / clean.length > 0.7;
}

async function translate(apiKey: string, texts: { title: string; synopsis: string }[]): Promise<string[]> {
  const prompt = texts
    .map((t, i) => `[${i}] Title: ${t.title}\nSynopsis: ${t.synopsis}`)
    .join("\n\n---\n\n");

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "あなたはアニメの公式サイトで使われるような自然な日本語であらすじを書く翻訳者です。",
        },
        {
          role: "user",
          content: `以下のアニメのあらすじを英語から自然な日本語に翻訳してください。アニメの説明文にふさわしいトーンで。JSON配列（文字列の配列）のみを返してください。他のテキストは不要です。

${prompt}`,
        },
      ],
      temperature: 0.3,
    }),
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${await res.text()}`);
  }

  const json = await res.json();
  const text = json.choices?.[0]?.message?.content ?? "";
  const match = text.match(/\[[\s\S]*\]/);
  if (!match) throw new Error("No JSON array in response");
  return JSON.parse(match[0]);
}

async function main() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("Set OPENAI_API_KEY environment variable");
    process.exit(1);
  }

  const file = process.argv[2] ?? "winter-2026";
  const filepath = path.join(DATA_DIR, `${file}.json`);
  const data = JSON.parse(fs.readFileSync(filepath, "utf-8"));

  const needsTranslation = data.filter(
    (e: any) => e.synopsis && isEnglish(e.synopsis)
  );

  console.log(`${needsTranslation.length} entries need translation\n`);
  if (needsTranslation.length === 0) return;

  for (let i = 0; i < needsTranslation.length; i += 10) {
    const batch = needsTranslation.slice(i, i + 10);
    const batchNum = Math.floor(i / 10) + 1;
    const totalBatches = Math.ceil(needsTranslation.length / 10);

    console.log(`Batch ${batchNum}/${totalBatches} (${batch.length} entries)...`);

    try {
      const translations = await translate(
        apiKey,
        batch.map((e: any) => ({ title: e.title, synopsis: e.synopsis }))
      );

      for (let j = 0; j < batch.length; j++) {
        if (translations[j]) {
          batch[j].synopsis = translations[j];
          console.log(`  ✓ ${batch[j].title}`);
        }
      }
    } catch (e: any) {
      console.log(`  ✗ Batch failed: ${e.message}`);
    }
  }

  fs.writeFileSync(filepath, JSON.stringify(data, null, 2), "utf-8");
  console.log(`\nDone! Updated ${filepath}`);
}

main().catch(console.error);
