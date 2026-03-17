import { Platform } from "./types";

export const platforms: Record<string, Platform> = {
  dmmtv: {
    id: "dmmtv",
    name: "DMM TV",
    color: "#ff6b6b",
    url: "https://tv.dmm.com",
  },
  netflix: {
    id: "netflix",
    name: "Netflix",
    color: "#e50914",
    url: "https://www.netflix.com",
  },
  abema: {
    id: "abema",
    name: "ABEMA",
    color: "#00c95c",
    url: "https://abema.tv",
  },
  crunchyroll: {
    id: "crunchyroll",
    name: "Crunchyroll",
    color: "#f47521",
    url: "https://www.crunchyroll.com",
  },
  amazon: {
    id: "amazon",
    name: "Prime Video",
    color: "#00a8e1",
    url: "https://www.amazon.co.jp/gp/video",
  },
  danime: {
    id: "danime",
    name: "dアニメストア",
    color: "#ff4081",
    url: "https://animestore.docomo.ne.jp",
  },
  disney: {
    id: "disney",
    name: "Disney+",
    color: "#113ccf",
    url: "https://www.disneyplus.com",
  },
  hulu: {
    id: "hulu",
    name: "Hulu",
    color: "#1ce783",
    url: "https://www.hulu.jp",
  },
};
