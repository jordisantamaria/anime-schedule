import { getAnimeData } from "@/lib/data";
import { HomeContent } from "@/components/home-content";
import { getDroppedSlugs } from "@/actions/drops";

export const dynamic = "force-dynamic";

export default async function Home() {
  const animeList = getAnimeData();
  const droppedSlugs = await getDroppedSlugs();

  return (
    <div>
      <p className="mb-5 text-xs text-text-muted text-center">
        今期アニメ、いつ・どこで配信？パオパオでかんたん確認。
      </p>
      <HomeContent animeList={animeList} droppedSlugs={droppedSlugs} />
    </div>
  );
}
