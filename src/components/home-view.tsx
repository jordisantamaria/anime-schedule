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
      <div className="mb-6 flex items-center gap-2">
        <button
          onClick={() => setTab("latest")}
          className={`rounded-full px-5 py-2 text-sm font-bold transition-all ${
            tab === "latest"
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md shadow-purple-300/40"
              : "bg-white text-text-secondary border border-border hover:border-pink-300 hover:text-pink-500"
          }`}
        >
          最新エピソード
        </button>
        <button
          onClick={() => setTab("schedule")}
          className={`rounded-full px-5 py-2 text-sm font-bold transition-all ${
            tab === "schedule"
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md shadow-purple-300/40"
              : "bg-white text-text-secondary border border-border hover:border-pink-300 hover:text-pink-500"
          }`}
        >
          週間スケジュール
        </button>
      </div>

      {tab === "latest" && <RecentEpisodes animeList={animeList} />}
      {tab === "schedule" && <ScheduleGrid animeByDay={animeByDay} />}
    </div>
  );
}
