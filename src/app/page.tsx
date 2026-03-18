import { getAnimeData } from "@/lib/data";
import { RecentEpisodes } from "@/components/recent-episodes";

export default function Home() {
  const animeList = getAnimeData();

  return (
    <div>
      <div className="mb-5 py-3 text-center border-b border-border">
        <p className="text-sm text-text-secondary">
          <span className="font-bold text-text-primary">PaoPaoAnime</span> 今期アニメの配信スケジュールをまとめて確認
        </p>
      </div>

      <h2 className="mb-4 text-xl font-bold">最新エピソード</h2>
      <RecentEpisodes animeList={animeList} />
    </div>
  );
}
