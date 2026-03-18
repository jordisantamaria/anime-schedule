import fs from "fs";
import path from "path";

const DATA_FILE = path.join(__dirname, "..", "data", "winter-2026.json");

// Normalize title for matching (same as add-unext.ts)
function normalize(t: string): string {
  return t
    .replace(/\s+/g, "")
    .replace(/[～〜~]/g, "")
    .replace(/[！!？?。、・「」『』【】（）()]/g, "")
    .replace(/TVアニメ/g, "")
    .replace(/第\d+期/g, "")
    .replace(/第\d+クール/g, "")
    .replace(/Season\d+/g, "")
    .replace(/シーズン\d+/g, "")
    .replace(/２/g, "2")
    .toLowerCase();
}

const danimeData = [
  {"title": "#神奈川に住んでるエルフ", "day": null, "time": null},
  {"title": "シンデレラ・シェフ ～萌妻食神～ シーズン2", "day": "水", "time": "18:00"},
  {"title": "アンデッドアンラック Winter編", "day": "金", "time": "01:10"},
  {"title": "勇者パーティを追い出された器用貧乏", "day": "木", "time": "00:00"},
  {"title": "Fate/strange Fake", "day": "日", "time": "00:30"},
  {"title": "多聞くん今どっち!?", "day": "日", "time": "01:00"},
  {"title": "花ざかりの君たちへ", "day": "日", "time": "22:00"},
  {"title": "貴族転生 ～恵まれた生まれから最強の力を得る～", "day": "月", "time": "00:00"},
  {"title": "ヴィジランテ -僕のヒーローアカデミア ILLEGALS- 第2期", "day": "月", "time": "22:30"},
  {"title": "綺麗にしてもらえますか。", "day": "月", "time": "22:30"},
  {"title": "MFゴースト 3rd Season", "day": "火", "time": "00:00"},
  {"title": "幼馴染とはラブコメにならない", "day": "火", "time": "00:30"},
  {"title": "最推しの義兄を愛でるため、長生きします！", "day": "火", "time": "22:00"},
  {"title": "勇者刑に処す 懲罰勇者9004隊刑務記録", "day": "火", "time": "22:00"},
  {"title": "勇者パーティーにかわいい子がいたので、告白してみた。", "day": "火", "time": "23:30"},
  {"title": "真夜中ハートチューン", "day": "火", "time": "23:30"},
  {"title": "鎧真伝サムライトルーパー", "day": "水", "time": "00:00"},
  {"title": "アルネの事件簿", "day": "水", "time": "02:00"},
  {"title": "mofusand animation", "day": "水", "time": "08:00"},
  {"title": "死亡遊戯で飯を食う。", "day": "水", "time": "23:00"},
  {"title": "有栖川煉ってホントは女なんだよね。", "day": "水", "time": null},
  {"title": "29歳独身中堅冒険者の日常", "day": "木", "time": "00:00"},
  {"title": "イチゴ哀歌 ～雑で生イキな妹と割り切れない兄～", "day": "木", "time": null},
  {"title": "透明男と人間女〜そのうち夫婦になるふたり〜", "day": "金", "time": "00:00"},
  {"title": "エリスの聖杯", "day": "金", "time": "00:00"},
  {"title": "「お前ごときが魔王に勝てると思うな」と勇者パーティを追放されたので、王都で気ままに暮らしたい", "day": "金", "time": "01:00"},
  {"title": "呪術廻戦 死滅回游 前編", "day": "金", "time": "01:30"},
  {"title": "魔王の娘は優しすぎる!!", "day": "金", "time": "22:00"},
  {"title": "拷問バイトくんの日常", "day": "土", "time": "00:00"},
  {"title": "違国日記", "day": "土", "time": "01:00"},
  {"title": "ヘルモード ～やり込み好きのゲーマーは廃設定の異世界で無双する～", "day": "土", "time": "01:35"},
  {"title": "ほっぺちゃん ～サン王国と黒ほっぺ団の秘密～", "day": "土", "time": "05:30"},
  {"title": "カードファイト!! ヴァンガード Divinez 幻真星戦編", "day": "土", "time": "08:30"},
  {"title": "ハイスクール！奇面組（2026年）", "day": "土", "time": "12:00"},
  {"title": "お前はまだグンマを知らない ～令和版～", "day": "土", "time": "22:00"},
  {"title": "お気楽領主の楽しい領地防衛～生産系魔術で名もなき村を最強の城塞都市に～", "day": "土", "time": "22:30"},
  {"title": "TRIGUN STARGAZE", "day": "土", "time": "23:30"},
  {"title": "勇者のクズ", "day": "日", "time": "01:30"},
  {"title": "人外教室の人間嫌い教師", "day": "日", "time": "02:30"},
  {"title": "カヤちゃんはコワくない", "day": "日", "time": "18:00"},
  {"title": "悪役令嬢は隣国の王太子に溺愛される", "day": "日", "time": "23:30"},
  {"title": "アンドロイドは経験人数に入りますか？？", "day": "月", "time": "00:00"},
  {"title": "魔都精兵のスレイブ2", "day": "月", "time": "00:30"},
  {"title": "異世界の沙汰は社畜次第", "day": "月", "time": "00:30"},
  {"title": "北斗の拳 拳王軍ザコたちの挽歌", "day": "月", "time": "20:00"},
  {"title": "地獄先生ぬ〜べ〜 第2クール（2025）", "day": "月", "time": null},
  {"title": "魔都精兵のスレイブ2 ご褒美Ver.", "day": "火", "time": "00:30"},
  {"title": "聖女なのに国を追い出されたので、崩壊寸前の隣国へ来ました シーズン2", "day": "火", "time": "01:30"},
  {"title": "DARK MOON -黒の月: 月の祭壇-", "day": "火", "time": "12:00"},
  {"title": "デッドアカウント", "day": "水", "time": "00:00"},
  {"title": "火喰鳥 羽州ぼろ鳶組", "day": "木", "time": "00:00"},
  {"title": "穏やか貴族の休暇のすすめ。", "day": "木", "time": "00:30"},
  {"title": "正反対な君と僕", "day": "木", "time": "17:30"},
  {"title": "転生したらドラゴンの卵だった～最強以外目指さねぇ～", "day": "木", "time": "22:00"},
  {"title": "【推しの子】第3期", "day": "木", "time": "23:00"},
  {"title": "姫様\"拷問\"の時間です 第2期", "day": "金", "time": "00:00"},
  {"title": "うるわしの宵の月", "day": "金", "time": "17:00"},
  {"title": "葬送のフリーレン 第2期", "day": "土", "time": "00:00"},
  {"title": "メダリスト 第2期", "day": "日", "time": "02:00"},
  {"title": "名探偵プリキュア！", "day": "水", "time": "00:00"},
  {"title": "時光代理人 -LINK CLICK- 英都篇", "day": "木", "time": "01:45"},
  {"title": "天穂のサクナヒメ ココロワ稲作日誌", "day": "日", "time": "17:15"},
  {"title": "闇芝居 十六期", "day": null, "time": null},
  {"title": "青のミブロ —芹沢暗殺編—（第2期）", "day": null, "time": null},
  {"title": "どうせ、恋してしまうんだ。Season2", "day": null, "time": null},
  {"title": "シャンピニオンの魔女", "day": null, "time": null},
];

const abemaData = [
  {"title": "#神奈川に住んでるエルフ", "day": null, "time": null},
  {"title": "シンデレラ・シェフ ～萌妻食神～ シーズン2", "day": "水", "time": "18:00"},
  {"title": "アンデッドアンラック Winter編", "day": "金", "time": "01:10"},
  {"title": "勇者パーティを追い出された器用貧乏", "day": "木", "time": "00:00"},
  {"title": "Fate/strange Fake", "day": "日", "time": "00:30"},
  {"title": "多聞くん今どっち!?", "day": "日", "time": "01:00"},
  {"title": "花ざかりの君たちへ", "day": "日", "time": "22:00"},
  {"title": "拷問バイトくんの日常", "day": "月", "time": "00:00"},
  {"title": "貴族転生 ～恵まれた生まれから最強の力を得る～", "day": "月", "time": "00:00"},
  {"title": "ヴィジランテ -僕のヒーローアカデミア ILLEGALS- 第2期", "day": "月", "time": "22:30"},
  {"title": "最推しの義兄を愛でるため、長生きします！", "day": "火", "time": "22:00"},
  {"title": "勇者刑に処す 懲罰勇者9004隊刑務記録", "day": "火", "time": "22:00"},
  {"title": "MFゴースト 3rd Season", "day": "水", "time": "00:00"},
  {"title": "アルネの事件簿", "day": "水", "time": "02:00"},
  {"title": "mofusand animation", "day": "水", "time": "08:00"},
  {"title": "死亡遊戯で飯を食う。", "day": "水", "time": "23:00"},
  {"title": "有栖川煉ってホントは女なんだよね。", "day": "水", "time": null},
  {"title": "29歳独身中堅冒険者の日常", "day": "木", "time": "00:00"},
  {"title": "イチゴ哀歌 ～雑で生イキな妹と割り切れない兄～", "day": "木", "time": null},
  {"title": "綺麗にしてもらえますか。", "day": "金", "time": "00:00"},
  {"title": "透明男と人間女〜そのうち夫婦になるふたり〜", "day": "金", "time": "00:00"},
  {"title": "エリスの聖杯", "day": "金", "time": "00:00"},
  {"title": "魔都精兵のスレイブ2", "day": "金", "time": "00:30"},
  {"title": "呪術廻戦 死滅回游 前編 (第3期)", "day": "金", "time": "01:30"},
  {"title": "どうせ、恋してしまうんだ。Season2", "day": "金", "time": "02:00"},
  {"title": "鎧真伝サムライトルーパー", "day": "土", "time": "00:00"},
  {"title": "DARK MOON -黒の月: 月の祭壇-", "day": "土", "time": "00:00"},
  {"title": "幼馴染とはラブコメにならない", "day": "土", "time": "00:30"},
  {"title": "違国日記", "day": "土", "time": "01:00"},
  {"title": "ヘルモード ～やり込み好きのゲーマーは廃設定の異世界で無双する～", "day": "土", "time": "01:35"},
  {"title": "カードファイト!! ヴァンガード Divinez 幻真星戦編", "day": "土", "time": "08:30"},
  {"title": "ハイスクール！奇面組（2026年）", "day": "土", "time": "12:00"},
  {"title": "お気楽領主の楽しい領地防衛～生産系魔術で名もなき村を最強の城塞都市に～", "day": "土", "time": "22:30"},
  {"title": "TRIGUN STARGAZE", "day": "土", "time": "23:30"},
  {"title": "人外教室の人間嫌い教師", "day": "日", "time": "02:30"},
  {"title": "うるわしの宵の月", "day": "日", "time": "17:00"},
  {"title": "正反対な君と僕", "day": "日", "time": "17:30"},
  {"title": "カヤちゃんはコワくない", "day": "日", "time": "18:00"},
  {"title": "悪役令嬢は隣国の王太子に溺愛される", "day": "日", "time": "23:30"},
  {"title": "勇者パーティーにかわいい子がいたので、告白してみた。", "day": "日", "time": "23:30"},
  {"title": "真夜中ハートチューン", "day": "日", "time": "23:30"},
  {"title": "地獄先生ぬ〜べ〜 第2クール（2025）", "day": "日", "time": null},
  {"title": "アンドロイドは経験人数に入りますか？？", "day": "月", "time": "00:00"},
  {"title": "異世界の沙汰は社畜次第", "day": "月", "time": "00:30"},
  {"title": "「お前ごときが魔王に勝てると思うな」と勇者パーティを追放されたので、王都で気ままに暮らしたい", "day": "月", "time": "01:00"},
  {"title": "闇芝居 十六期", "day": "月", "time": "12:00"},
  {"title": "北斗の拳 拳王軍ザコたちの挽歌", "day": "月", "time": "20:00"},
  {"title": "魔王の娘は優しすぎる!!", "day": "月", "time": "22:00"},
  {"title": "姫様\"拷問\"の時間です 第2期", "day": "月", "time": "23:00"},
  {"title": "聖女なのに国を追い出されたので、崩壊寸前の隣国へ来ました シーズン2", "day": "火", "time": "01:30"},
  {"title": "デッドアカウント", "day": "水", "time": "00:00"},
  {"title": "シャンピニオンの魔女", "day": "水", "time": "03:00"},
  {"title": "【推しの子】第3期", "day": "水", "time": "23:00"},
  {"title": "火喰鳥 羽州ぼろ鳶組", "day": "木", "time": "00:00"},
  {"title": "転生したらドラゴンの卵だった～最強以外目指さねぇ～", "day": "木", "time": "22:00"},
  {"title": "勇者のクズ", "day": "金", "time": "01:30"},
  {"title": "ほっぺちゃん ～サン王国と黒ほっぺ団の秘密～", "day": "金", "time": "18:00"},
  {"title": "葬送のフリーレン 第2期", "day": "土", "time": "00:00"},
  {"title": "名探偵プリキュア！", "day": "水", "time": "00:00"},
  {"title": "時光代理人 -LINK CLICK- 英都篇", "day": "木", "time": "01:45"},
  {"title": "天穂のサクナヒメ ココロワ稲作日誌", "day": "日", "time": "17:15"},
  {"title": "青のミブロ —芹沢暗殺編—（第2期）", "day": null, "time": null},
];

const netflixData = [
  {"title": "超かぐや姫！", "day": null, "time": null},
  {"title": "BEASTARS FINAL SEASON Part2", "day": null, "time": null},
  {"title": "スティール・ボール・ラン ジョジョの奇妙な冒険", "day": null, "time": null},
];

type PlatformEntry = { title: string; day: string | null; time: string | null };

function addPlatformData(
  data: any[],
  titleIndex: Map<string, number>,
  platformId: string,
  platformData: PlatformEntry[]
) {
  let matched = 0;
  let noMatch = 0;
  let skipped = 0;

  for (const item of platformData) {
    const norm = normalize(item.title);

    // Try exact normalized match
    let idx = titleIndex.get(norm);

    // Try partial match if exact fails
    if (idx === undefined) {
      for (const [key, i] of titleIndex) {
        if (key.includes(norm) || norm.includes(key)) {
          idx = i;
          break;
        }
      }
    }

    if (idx !== undefined) {
      const entry = data[idx];
      const hasPlatform = entry.streams.some(
        (s: { platform: string }) => s.platform === platformId
      );
      if (!hasPlatform) {
        entry.streams.push({
          platform: platformId,
          day: item.day,
          time: item.time,
        });
        if (!entry.platforms.includes(platformId)) {
          entry.platforms.push(platformId);
        }
        matched++;
        console.log(`  MATCHED: ${item.title} -> ${entry.title}`);
      } else {
        skipped++;
        console.log(`  SKIPPED (already exists): ${item.title}`);
      }
    } else {
      noMatch++;
      console.log(`  NO MATCH: ${item.title}`);
    }
  }

  console.log(
    `  => Matched: ${matched}, Skipped: ${skipped}, No match: ${noMatch}\n`
  );
}

function main() {
  const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));

  // Build normalized title index
  const titleIndex = new Map<string, number>();
  for (let i = 0; i < data.length; i++) {
    titleIndex.set(normalize(data[i].title), i);
    if (data[i].titleRomaji) {
      titleIndex.set(normalize(data[i].titleRomaji), i);
    }
  }

  console.log(`Loaded ${data.length} entries from winter-2026.json\n`);

  console.log("=== Adding dアニメストア (danime) ===");
  addPlatformData(data, titleIndex, "danime", danimeData);

  console.log("=== Adding ABEMA (abema) ===");
  addPlatformData(data, titleIndex, "abema", abemaData);

  console.log("=== Adding Netflix (netflix) ===");
  addPlatformData(data, titleIndex, "netflix", netflixData);

  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");

  // Summary stats
  console.log("=== Summary ===");
  const platformCounts: Record<string, number> = {};
  for (const entry of data) {
    for (const pid of entry.platforms) {
      platformCounts[pid] = (platformCounts[pid] || 0) + 1;
    }
  }
  console.log("Platform distribution:");
  for (const [pid, count] of Object.entries(platformCounts).sort(
    (a, b) => b[1] - a[1]
  )) {
    console.log(`  ${pid}: ${count} anime`);
  }

  const streamCountDist: Record<number, number> = {};
  for (const entry of data) {
    const n = entry.platforms.length;
    streamCountDist[n] = (streamCountDist[n] || 0) + 1;
  }
  console.log("\nPlatform count per anime:");
  for (const [n, count] of Object.entries(streamCountDist).sort(
    (a, b) => Number(a[0]) - Number(b[0])
  )) {
    console.log(`  ${n} platform(s): ${count} anime`);
  }
}

main();
