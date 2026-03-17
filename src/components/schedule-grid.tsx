"use client";

import { useState } from "react";
import { AnimeEntry, DayOfWeek, PlatformId } from "@/lib/types";
import { DAYS, DAY_LABELS } from "@/lib/data";
import { platforms } from "@/lib/platforms";
import { AnimeCard } from "./anime-card";

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
          placeholder="Search anime..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 outline-none focus:border-zinc-500"
        />

        <select
          value={selectedPlatform}
          onChange={(e) =>
            setSelectedPlatform(e.target.value as PlatformId | "all")
          }
          className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-zinc-500"
        >
          <option value="all">All platforms</option>
          {allPlatformIds.map((pid) => (
            <option key={pid} value={pid}>
              {platforms[pid].name}
            </option>
          ))}
        </select>

        <div className="flex gap-1">
          <button
            onClick={() => setSelectedDay("all")}
            className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
              selectedDay === "all"
                ? "bg-zinc-100 text-zinc-900"
                : "bg-zinc-800 text-zinc-400 hover:text-zinc-200"
            }`}
          >
            All
          </button>
          {DAYS.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
                selectedDay === day
                  ? "bg-zinc-100 text-zinc-900"
                  : "bg-zinc-800 text-zinc-400 hover:text-zinc-200"
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
              <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-zinc-100">
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-zinc-800 text-sm">
                  {day}
                </span>
                <span className="text-zinc-500 text-sm font-normal">
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
