export type DayOfWeek = "月" | "火" | "水" | "木" | "金" | "土" | "日";

export type PlatformId = "dmmtv" | "netflix" | "abema" | "crunchyroll" | "amazon" | "danime" | "disney" | "hulu";

export type AnimeEntry = {
  title: string;
  slug: string;
  day: DayOfWeek;
  time: string | null;
  startDate: string;
  type: "見放題" | "レンタル";
  platforms: PlatformId[];
  anilistId?: number;
  image?: string;
  synopsis?: string;
  synopsisJa?: string;
  genres?: string[];
  episodes?: number;
  studio?: string;
  titleEnglish?: string;
  titleRomaji?: string;
  banner?: string;
};

export type Platform = {
  id: PlatformId;
  name: string;
  color: string;
  url: string;
  searchUrl?: string;
};

export type Season = "winter" | "spring" | "summer" | "fall";
