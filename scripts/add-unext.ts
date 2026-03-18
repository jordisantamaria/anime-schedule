import fs from "fs";
import path from "path";

const DATA_FILE = path.join(__dirname, "..", "data", "winter-2026.json");

const unextData = [
  {"title": "拷問バイトくんの日常", "day": "月", "time": "00:00", "startDate": "2026-01-05"},
  {"title": "エリスの聖杯", "day": "月", "time": "00:00", "startDate": "2026-01-12"},
  {"title": "魔都精兵のスレイブ２", "day": "月", "time": "00:30", "startDate": "2026-01-12"},
  {"title": "火喰鳥 羽州ぼろ鳶組", "day": "月", "time": "01:00", "startDate": "2026-01-12"},
  {"title": "北斗の拳 拳王軍ザコたちの挽歌", "day": "月", "time": "20:00", "startDate": "2026-01-12"},
  {"title": "魔王の娘は優しすぎる!!", "day": "月", "time": "22:00", "startDate": "2026-01-12"},
  {"title": "ヴィジランテ -僕のヒーローアカデミア ILLEGALS- 第2期", "day": "月", "time": "22:30", "startDate": "2026-01-05"},
  {"title": "ヘルモード ～やり込み好きのゲーマーは廃設定の異世界で無双する～", "day": "火", "time": "01:35", "startDate": "2026-01-13"},
  {"title": "最推しの義兄を愛でるため、長生きします!", "day": "火", "time": "22:00", "startDate": "2026-01-06"},
  {"title": "勇者パーティーにかわいい子がいたので、告白してみた。", "day": "火", "time": "23:30", "startDate": "2026-01-06"},
  {"title": "鎧真伝サムライトルーパー", "day": "水", "time": "00:00", "startDate": "2026-01-07"},
  {"title": "MFゴースト 3rd Season", "day": "水", "time": "00:00", "startDate": "2026-01-07"},
  {"title": "異世界の沙汰は社畜次第", "day": "水", "time": "00:30", "startDate": "2026-01-07"},
  {"title": "シャンピニオンの魔女", "day": "水", "time": "03:00", "startDate": "2026-01-14"},
  {"title": "正反対な君と僕", "day": "水", "time": "17:30", "startDate": "2026-01-14"},
  {"title": "死亡遊戯で飯を食う。", "day": "水", "time": "23:00", "startDate": "2026-01-07"},
  {"title": "多聞くん今どっち!?", "day": "木", "time": "00:00", "startDate": "2026-01-01"},
  {"title": "地獄先生ぬ～べ～ 第2クール", "day": "木", "time": "00:15", "startDate": "2026-01-08"},
  {"title": "ほっぺちゃん ～サン王国と黒ほっぺ団の秘密～", "day": "木", "time": "05:30", "startDate": "2026-01-15"},
  {"title": "お前はまだグンマを知らない～令和版～", "day": "木", "time": "22:00", "startDate": "2026-01-15"},
  {"title": "【推しの子】第3期", "day": "木", "time": "23:00", "startDate": "2026-01-15"},
  {"title": "透明男と人間女〜そのうち夫婦になるふたり〜", "day": "金", "time": "00:00", "startDate": "2026-01-09"},
  {"title": "綺麗にしてもらえますか。", "day": "金", "time": "00:00", "startDate": "2026-01-09"},
  {"title": "姫様\"拷問\"の時間です 第2期", "day": "金", "time": "00:00", "startDate": "2026-01-16"},
  {"title": "「お前ごときが魔王に勝てると思うな」と勇者パーティを追放されたので、王都で気ままに暮らしたい", "day": "金", "time": "01:00", "startDate": "2026-01-09"},
  {"title": "呪術廻戦 死滅回游 前編", "day": "金", "time": "01:30", "startDate": "2026-01-09"},
  {"title": "勇者のクズ", "day": "金", "time": "01:30", "startDate": "2026-01-16"},
  {"title": "どうせ、恋してしまうんだ。", "day": "金", "time": "02:00", "startDate": "2026-01-09"},
  {"title": "人外教室の人間嫌い教師", "day": "金", "time": "02:30", "startDate": "2026-01-16"},
  {"title": "カヤちゃんはコワくない", "day": "金", "time": "18:00", "startDate": "2026-01-16"},
  {"title": "葬送のフリーレン 第2期", "day": "土", "time": "00:00", "startDate": "2026-01-17"},
  {"title": "幼馴染とはラブコメにならない", "day": "土", "time": "00:30", "startDate": "2026-01-10"},
  {"title": "違国日記", "day": "土", "time": "01:00", "startDate": "2026-01-10"},
  {"title": "ハイスクール!奇面組", "day": "土", "time": "12:00", "startDate": "2026-01-10"},
  {"title": "青のミブロ 第2期 芹沢暗殺編", "day": "土", "time": "18:00", "startDate": "2025-12-20"},
  {"title": "お気楽領主の楽しい領地防衛～生産系魔術で名もなき村を最強の城塞都市に～", "day": "土", "time": "22:30", "startDate": "2026-01-10"},
  {"title": "Fate/strange Fake", "day": "土", "time": "00:30", "startDate": "2026-01-04"},
  {"title": "TRIGUN STARGAZE", "day": "土", "time": "23:30", "startDate": "2026-01-10"},
  {"title": "デッドアカウント", "day": "日", "time": "00:00", "startDate": "2026-01-11"},
  {"title": "29歳独身中堅冒険者の日常", "day": "日", "time": "00:00", "startDate": "2026-01-11"},
  {"title": "貴族転生～恵まれた生まれから最強の力を得る～", "day": "日", "time": "00:00", "startDate": "2026-01-11"},
  {"title": "うるわしの宵の月", "day": "日", "time": "17:00", "startDate": "2026-01-11"},
  {"title": "花ざかりの君たちへ", "day": "日", "time": "22:00", "startDate": "2026-01-04"},
  {"title": "勇者刑に処す 懲罰勇者9004隊刑務記録", "day": "日", "time": "22:00", "startDate": "2026-01-06"},
  {"title": "勇者パーティを追い出された器用貧乏", "day": "日", "time": "23:00", "startDate": "2026-01-04"},
  {"title": "悪役令嬢は隣国の王太子に溺愛される", "day": "日", "time": "23:30", "startDate": "2026-01-11"},
];

// Normalize title for matching
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

function main() {
  const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));

  // Migrate: convert old "platforms" array to new "streams" format
  for (const entry of data) {
    if (!entry.streams) {
      entry.streams = entry.platforms.map((pid: string) => ({
        platform: pid,
        day: entry.day,
        time: entry.time,
      }));
    }
  }

  // Build normalized title index
  const titleIndex = new Map<string, number>();
  for (let i = 0; i < data.length; i++) {
    titleIndex.set(normalize(data[i].title), i);
    if (data[i].titleRomaji) {
      titleIndex.set(normalize(data[i].titleRomaji), i);
    }
  }

  let matched = 0;
  let added = 0;

  for (const unext of unextData) {
    const norm = normalize(unext.title);

    // Try to find matching anime in existing data
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
      // Check if unext already added
      const hasUnext = entry.streams.some((s: { platform: string }) => s.platform === "unext");
      if (!hasUnext) {
        entry.streams.push({
          platform: "unext",
          day: unext.day,
          time: unext.time,
        });
        // Also add to platforms array for backward compat
        if (!entry.platforms.includes("unext")) {
          entry.platforms.push("unext");
        }
        matched++;
        console.log(`MATCHED: ${unext.title} → ${entry.title}`);
      }
    } else {
      console.log(`NO MATCH: ${unext.title}`);
      added++;
    }
  }

  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
  console.log(`\nDone! Matched: ${matched}, No match: ${added}`);
}

main();
