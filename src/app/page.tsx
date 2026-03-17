import { getAnimeByDay, getAnimeData } from "@/lib/data";
import { HomeView } from "@/components/home-view";

export default function Home() {
  const animeByDay = getAnimeByDay();
  const animeList = getAnimeData();

  return (
    <HomeView
      animeByDay={animeByDay}
      animeList={animeList}
    />
  );
}
