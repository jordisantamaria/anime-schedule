import { getAnimeData } from "@/lib/data";
import { RecentEpisodes } from "@/components/recent-episodes";
import { LatestAnime } from "@/components/latest-anime";

export default function Home() {
  const animeList = getAnimeData();

  return (
    <div>
      <p className="mb-5 text-xs text-text-muted text-center">
        今期アニメ、いつ・どこで配信？パオパオでかんたん確認。
      </p>

      <h2 className="mb-4 text-xl font-bold">最新エピソード</h2>
      <RecentEpisodes animeList={animeList} />

      <h2 className="mt-10 mb-4 text-xl font-bold">最新追加アニメ</h2>
      <LatestAnime animeList={animeList} />
    </div>
  );
}
