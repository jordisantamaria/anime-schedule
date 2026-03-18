import { getAnimeData } from "@/lib/data";
import { RecentEpisodes } from "@/components/recent-episodes";
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
          今期のアニメがどのプラットフォームで何曜日の何時に配信されるかをまとめて確認できます。DMM TV・U-NEXT・dアニメストア・ABEMAなど{platformCount}サービス、{animeCount}作品を網羅。
        </p>
      </div>

      <h2 className="mb-4 text-xl font-bold">最新エピソード</h2>
      <RecentEpisodes animeList={animeList} />
    </div>
  );
}
