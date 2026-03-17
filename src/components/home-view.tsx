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
      <div className="mb-6 flex items-center gap-1 rounded-lg bg-bg-secondary p-1">
        <button
          onClick={() => setTab("latest")}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            tab === "latest"
              ? "bg-accent text-white"
              : "text-text-secondary hover:text-text-primary hover:bg-bg-card"
          }`}
        >
          Latest Episodes
        </button>
        <button
          onClick={() => setTab("schedule")}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            tab === "schedule"
              ? "bg-accent text-white"
              : "text-text-secondary hover:text-text-primary hover:bg-bg-card"
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
