"use client";

import { useState } from "react";
import { AnimeEntry, DayOfWeek, PlatformId } from "@/lib/types";
import { DAYS, DAY_LABELS } from "@/lib/data";
import { platforms } from "@/lib/platforms";
import { AnimeCard } from "@/components/anime-card";

type Props = {
  animeByDay: Record<DayOfWeek, AnimeEntry[]>;
};

export function ScheduleGrid({ animeByDay }: Props) {
  const [search, setSearch] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformId | "all">(
    "all"
  );
  const [selectedDay, setSelectedDay] = useState<DayOfWeek | "all">("all");

  const allPlatformIds = [
    ...new Set(
      Object.values(animeByDay)
        .flat()
        .flatMap((a) => a.platforms)
    ),
  ];

  function filterAnime(list: AnimeEntry[]): AnimeEntry[] {
    return list.filter((anime) => {
      if (search) {
        const q = search.toLowerCase();
        const matchTitle = anime.title.toLowerCase().includes(q);
        const matchRomaji = anime.titleRomaji?.toLowerCase().includes(q);
        const matchEnglish = anime.titleEnglish?.toLowerCase().includes(q);
        if (!matchTitle && !matchRomaji && !matchEnglish) return false;
      }
      if (
        selectedPlatform !== "all" &&
        !anime.platforms.includes(selectedPlatform)
      ) {
        return false;
      }
      return true;
    });
  }

  const daysToShow =
    selectedDay === "all" ? DAYS : DAYS.filter((d) => d === selectedDay);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="text"
          placeholder="アニメを検索..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-full border border-purple-200 bg-white px-4 py-2 text-sm text-text-primary placeholder-text-muted shadow-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-200"
        />

        <select
          value={selectedPlatform}
          onChange={(e) =>
            setSelectedPlatform(e.target.value as PlatformId | "all")
          }
          className="rounded-full border border-purple-200 bg-white px-4 py-2 text-sm text-text-primary shadow-sm outline-none focus:border-pink-400"
        >
          <option value="all">全プラットフォーム</option>
          {allPlatformIds.map((pid) => (
            <option key={pid} value={pid}>
              {platforms[pid].name}
            </option>
          ))}
        </select>

        <div className="flex gap-1">
          <button
            onClick={() => setSelectedDay("all")}
            className={`rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
              selectedDay === "all"
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-sm"
                : "bg-white text-text-secondary border border-purple-200 hover:border-pink-300"
            }`}
          >
            全部
          </button>
          {DAYS.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
                selectedDay === day
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-sm"
                  : "bg-white text-text-secondary border border-purple-200 hover:border-pink-300"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        {daysToShow.map((day) => {
          const filtered = filterAnime(animeByDay[day]);
          if (filtered.length === 0) return null;

          return (
            <section key={day}>
              <h2 className="mb-3 flex items-center gap-2 text-lg font-extrabold">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-purple-500 text-sm text-white shadow-sm">
                  {day}
                </span>
                <span className="text-text-secondary text-sm font-normal">
                  {DAY_LABELS[day]}
                </span>
              </h2>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((anime) => (
                  <AnimeCard key={anime.slug} anime={anime} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
