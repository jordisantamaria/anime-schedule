"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimeEntry, PlatformId } from "@/lib/types";
import { RecentEpisode, getRecentEpisodes } from "@/lib/episodes";
import { PlatformFilter } from "@/components/platform-filter";
import { FORMAT_LABELS } from "@/lib/constants";

const NON_WEEKLY_FORMATS = new Set(["MOVIE", "OVA", "SPECIAL", "MUSIC"]);

export function HomeContent({ animeList }: { animeList: AnimeEntry[] }) {
  const [episodes, setEpisodes] = useState<RecentEpisode[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<PlatformId[]>([]);

  useEffect(() => {
    setEpisodes(getRecentEpisodes(animeList));
  }, [animeList]);

  const allPlatforms = [
    ...new Set(animeList.flatMap((a) => a.platforms)),
  ] as PlatformId[];

  function filterByPlatform(anime: AnimeEntry): boolean {
    if (selectedPlatforms.length === 0) return true;
    return anime.platforms.some((p) => selectedPlatforms.includes(p as PlatformId));
  }

  // Recent episodes
  const filteredEpisodes = episodes.filter((ep) => filterByPlatform(ep.anime));
  const seen = new Set<string>();
  const deduplicatedEpisodes = filteredEpisodes
    .filter((ep) => {
      if (seen.has(ep.anime.slug)) return false;
      seen.add(ep.anime.slug);
      return true;
    })
    .slice(0, 20);

  // Latest anime
  const now = new Date();
  const latestAnime = animeList
    .filter((a) => {
      const start = new Date(a.startDate + "T00:00:00+09:00");
      return start <= now && filterByPlatform(a);
    })
    .sort((a, b) => b.startDate.localeCompare(a.startDate))
    .slice(0, 20);

  return (
    <div>
      <div className="mb-4">
        <PlatformFilter
          available={allPlatforms}
          selected={selectedPlatforms}
          onChange={setSelectedPlatforms}
        />
      </div>

      <h2 className="mb-4 text-xl font-bold">最新エピソード</h2>
      <div className="grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {deduplicatedEpisodes.map((ep) => (
          <Link
            key={ep.anime.slug}
            href={`/anime/${ep.anime.slug}`}
            className="group"
          >
            <div className="relative overflow-hidden rounded border border-border">
              {ep.anime.image ? (
                <img
                  src={ep.anime.image}
                  alt={ep.anime.title}
                  className="aspect-[3/4] w-full object-cover transition-transform group-hover:scale-105"
                />
              ) : (
                <div className="flex aspect-[3/4] w-full items-center justify-center bg-bg-card text-xs text-text-muted">
                  画像なし
                </div>
              )}
              <span className="absolute top-1.5 left-1.5 rounded-sm bg-accent px-1 py-px text-xs font-bold text-white">
                {ep.anime.batchRelease ? `全${ep.episode}話` : `第${ep.episode}話`}
              </span>
            </div>
            <div className="mt-1.5">
              <h3 className="line-clamp-1 text-sm font-bold text-text-primary group-hover:text-accent">
                {ep.anime.title}
              </h3>
              <p className="text-xs text-text-muted">
                {formatRelativeTime(ep.airedAt)}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 mb-4 border-t border-border pt-8">
        <h2 className="text-xl font-bold">最新追加アニメ</h2>
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {latestAnime.map((anime) => {
          const formatLabel =
            anime.format && anime.format !== "TV" && anime.format !== "TV_SHORT"
              ? FORMAT_LABELS[anime.format]
              : null;

          return (
            <Link
              key={anime.slug}
              href={`/anime/${anime.slug}`}
              className="group"
            >
              <div className="relative overflow-hidden rounded border border-border">
                {anime.image ? (
                  <img
                    src={anime.image}
                    alt={anime.title}
                    className="aspect-[3/4] w-full object-cover transition-transform group-hover:scale-105"
                  />
                ) : (
                  <div className="flex aspect-[3/4] w-full items-center justify-center bg-bg-card text-xs text-text-muted">
                    画像なし
                  </div>
                )}
                {formatLabel && (
                  <span className="absolute top-1.5 left-1.5 rounded bg-yellow-500 px-1.5 py-0.5 text-[10px] font-bold text-black">
                    {formatLabel}
                  </span>
                )}
              </div>
              <div className="mt-1.5">
                <h3 className="line-clamp-1 text-sm font-bold text-text-primary group-hover:text-accent">
                  {anime.title}
                </h3>
                <p className="text-xs text-text-muted">{anime.startDate}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) return `${diffDays}日前`;
  if (diffHours > 0) return `${diffHours}時間前`;
  return "配信中";
}
