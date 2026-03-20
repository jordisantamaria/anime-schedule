import { getAnimeData } from "@/lib/data";
import { HomeContent } from "@/components/home-content";

export default function Home() {
  const animeList = getAnimeData();

  return (
    <div>
      <p className="mb-5 text-xs text-text-muted text-center">
        今期アニメ、いつ・どこで配信？パオパオでかんたん確認。
      </p>
      <HomeContent animeList={animeList} />
    </div>
  );
}
