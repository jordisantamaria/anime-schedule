"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimeEntry } from "@/lib/types";
import { RecentEpisode, getRecentEpisodes } from "@/lib/episodes";
import { platforms } from "@/lib/platforms";

export function RecentEpisodes({ animeList }: { animeList: AnimeEntry[] }) {
  const [episodes, setEpisodes] = useState<RecentEpisode[]>([]);

  useEffect(() => {
    setEpisodes(getRecentEpisodes(animeList).slice(0, 20));
  }, [animeList]);

  if (episodes.length === 0) return null;

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Latest Episodes</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {episodes.map((ep) => (
          <Link
            key={`${ep.anime.slug}-${ep.episode}`}
            href={`/anime/${ep.anime.slug}`}
            className="group relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 transition-colors hover:border-zinc-600"
          >
            {ep.anime.image ? (
              <img
                src={ep.anime.image}
                alt={ep.anime.title}
                className="aspect-[3/4] w-full object-cover transition-transform group-hover:scale-105"
              />
            ) : (
              <div className="flex aspect-[3/4] w-full items-center justify-center bg-zinc-800 text-xs text-zinc-500">
                No image
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

            {/* Platform badge - top right */}
            <div className="absolute top-2 right-2 flex gap-1">
              {ep.anime.platforms.map((pid) => {
                const p = platforms[pid];
                return (
                  <span
                    key={pid}
                    className="rounded-md px-1.5 py-0.5 text-[10px] font-semibold backdrop-blur-sm"
                    style={{
                      backgroundColor: p.color + "cc",
                      color: "#fff",
                    }}
                  >
                    {p.name}
                  </span>
                );
              })}
            </div>

            {/* Episode badge - top left */}
            <span className="absolute top-2 left-2 rounded-md bg-blue-600 px-2 py-0.5 text-xs font-bold backdrop-blur-sm">
              EP {ep.episode}
            </span>

            {/* Title + time - bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <h3 className="line-clamp-2 text-sm font-bold leading-snug text-white drop-shadow-lg">
                {ep.anime.title}
              </h3>
              <p className="mt-1 text-xs text-zinc-300">
                {formatRelativeTime(ep.airedAt)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) return `${diffDays}d ago`;
  if (diffHours > 0) return `${diffHours}h ago`;
  return "Just aired";
}
