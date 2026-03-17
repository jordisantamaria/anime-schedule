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
      <h2 className="mb-4 text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
        最新エピソード
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {episodes.map((ep) => (
          <Link
            key={`${ep.anime.slug}-${ep.episode}`}
            href={`/anime/${ep.anime.slug}`}
            className="group relative overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-xl hover:shadow-pink-200/40 hover:-translate-y-1"
          >
            {ep.anime.image ? (
              <img
                src={ep.anime.image}
                alt={ep.anime.title}
                className="aspect-[3/4] w-full object-cover transition-transform group-hover:scale-105"
              />
            ) : (
              <div className="flex aspect-[3/4] w-full items-center justify-center bg-purple-50 text-xs text-text-muted">
                画像なし
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-purple-950/90 via-purple-900/20 to-transparent" />

            {/* Platform badge - top right */}
            <div className="absolute top-2 right-2 flex gap-1">
              {ep.anime.platforms.map((pid) => {
                const p = platforms[pid];
                return (
                  <span
                    key={pid}
                    className="rounded-full px-2 py-0.5 text-[10px] font-bold shadow-sm"
                    style={{
                      backgroundColor: p.color,
                      color: "#fff",
                    }}
                  >
                    {p.name}
                  </span>
                );
              })}
            </div>

            {/* Title + episode + time - bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <span className="mb-1.5 inline-block rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-2.5 py-0.5 text-xs font-bold text-white shadow-sm">
                第{ep.episode}話
              </span>
              <h3 className="line-clamp-2 text-sm font-bold leading-snug text-white drop-shadow-lg">
                {ep.anime.title}
              </h3>
              <p className="mt-1 text-xs text-pink-200">
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

  if (diffDays > 0) return `${diffDays}日前`;
  if (diffHours > 0) return `${diffHours}時間前`;
  return "配信中";
}
