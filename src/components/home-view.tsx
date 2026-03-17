"use client";

import { useState } from "react";
import { AnimeEntry, DayOfWeek } from "@/lib/types";
import { ScheduleGrid } from "@/components/schedule-grid";
import { RecentEpisodes } from "@/components/recent-episodes";

type Tab = "latest" | "schedule";

type Props = {
  animeByDay: Record<DayOfWeek, AnimeEntry[]>;
  animeList: AnimeEntry[];
};

export function HomeView({ animeByDay, animeList }: Props) {
  const [tab, setTab] = useState<Tab>("latest");

  return (
    <div>
      <div className="mb-6 flex items-center gap-4 border-b border-zinc-800">
        <button
          onClick={() => setTab("latest")}
          className={`pb-3 text-sm font-medium transition-colors ${
            tab === "latest"
              ? "border-b-2 border-zinc-100 text-zinc-100"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          Latest Episodes
        </button>
        <button
          onClick={() => setTab("schedule")}
          className={`pb-3 text-sm font-medium transition-colors ${
            tab === "schedule"
              ? "border-b-2 border-zinc-100 text-zinc-100"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          Weekly Schedule
        </button>
      </div>

      {tab === "latest" && <RecentEpisodes animeList={animeList} />}
      {tab === "schedule" && <ScheduleGrid animeByDay={animeByDay} />}
    </div>
  );
}
