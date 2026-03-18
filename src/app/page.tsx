import { getAnimeData } from "@/lib/data";
import { RecentEpisodes } from "@/components/recent-episodes";
import Link from "next/link";

export default function Home() {
  const animeList = getAnimeData();
  const platformCount = new Set(animeList.flatMap((a) => a.platforms)).size;
  const animeCount = animeList.length;

  return (
    <div>
      <div className="mb-6 rounded border border-border bg-bg-card p-4">
        <h1 className="text-lg font-bold">
          日本のアニメ配信スケジュールをひとまとめに
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          DMM TV・U-NEXT・dアニメストア・ABEMAなど{platformCount}つのプラットフォームの配信時間を一覧で確認。
          今期{animeCount}作品を網羅。
        </p>
        <div className="mt-3 flex gap-3">
          <Link
            href="/schedule"
            className="rounded bg-accent px-3 py-1.5 text-xs font-bold text-white hover:bg-accent-hover"
          >
            週間スケジュールを見る
          </Link>
        </div>
      </div>

      <h2 className="mb-4 text-xl font-bold">最新エピソード</h2>
      <RecentEpisodes animeList={animeList} />
    </div>
  );
}
