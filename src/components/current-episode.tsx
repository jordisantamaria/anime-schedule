"use client";

import { useEffect, useState } from "react";
import { AnimeEntry } from "@/lib/types";
import { getRecentEpisodes } from "@/lib/episodes";

export function CurrentEpisode({ anime }: { anime: AnimeEntry }) {
  const [episode, setEpisode] = useState<number | null>(null);

  useEffect(() => {
    const episodes = getRecentEpisodes([anime]);
    if (episodes.length > 0) {
      setEpisode(episodes[0].episode);
    }
  }, [anime]);

  if (episode === null) return null;

  return (
    <tr>
      <td>最新話</td>
      <td className="text-accent">第{episode}話</td>
    </tr>
  );
}
