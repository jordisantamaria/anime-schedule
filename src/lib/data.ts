import { AnimeEntry, DayOfWeek } from "./types";

function toSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\u3000-\u9fff\uff00-\uffef]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getAnimeData(): AnimeEntry[] {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const raw = require("../../data/winter-2026.json");
  return raw.map((entry: Omit<AnimeEntry, "slug">) => ({
    ...entry,
    slug: toSlug(entry.title),
  }));
}

export const DAYS: DayOfWeek[] = ["月", "火", "水", "木", "金", "土", "日"];

export const DAY_LABELS: Record<DayOfWeek, string> = {
  月: "Monday",
  火: "Tuesday",
  水: "Wednesday",
  木: "Thursday",
  金: "Friday",
  土: "Saturday",
  日: "Sunday",
};

export function getAnimeByDay(): Record<DayOfWeek, AnimeEntry[]> {
  const data = getAnimeData();
  const byDay = Object.fromEntries(
    DAYS.map((day) => [day, [] as AnimeEntry[]])
  ) as Record<DayOfWeek, AnimeEntry[]>;

  for (const anime of data) {
    byDay[anime.day].push(anime);
  }

  for (const day of DAYS) {
    byDay[day].sort((a, b) => {
      if (!a.time) return 1;
      if (!b.time) return -1;
      return a.time.localeCompare(b.time);
    });
  }

  return byDay;
}

export function getAnimeBySlug(slug: string): AnimeEntry | undefined {
  return getAnimeData().find((a) => a.slug === slug);
}
