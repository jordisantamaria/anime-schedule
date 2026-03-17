import Link from "next/link";
import { AnimeEntry } from "@/lib/types";
import { platforms } from "@/lib/platforms";

export function AnimeCard({ anime }: { anime: AnimeEntry }) {
  return (
    <Link
      href={`/anime/${anime.slug}`}
      className="group flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm transition-all hover:shadow-md hover:shadow-pink-200/30 hover:-translate-y-0.5"
    >
      {anime.image ? (
        <img
          src={anime.image}
          alt={anime.title}
          className="h-16 w-12 rounded-lg object-cover shadow-sm"
        />
      ) : (
        <div className="flex h-16 w-12 items-center justify-center rounded-lg bg-purple-50 text-xs text-text-muted">
          N/A
        </div>
      )}

      <div className="flex-1 min-w-0">
        <h3 className="truncate text-sm font-bold text-text-primary group-hover:text-purple-600">
          {anime.title}
        </h3>
        {anime.titleRomaji && (
          <p className="truncate text-xs text-text-muted">{anime.titleRomaji}</p>
        )}
        <div className="mt-1 flex items-center gap-2">
          <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-mono font-bold text-purple-600">
            {anime.time ?? "未定"}
          </span>
          <div className="flex gap-1">
            {anime.platforms.map((pid) => {
              const p = platforms[pid];
              return (
                <span
                  key={pid}
                  className="rounded-full px-1.5 py-0.5 text-[10px] font-bold"
                  style={{ backgroundColor: p.color + "20", color: p.color }}
                >
                  {p.name}
                </span>
              );
            })}
          </div>
          {anime.type === "レンタル" && (
            <span className="rounded-full bg-orange-100 px-1.5 py-0.5 text-[10px] font-bold text-orange-500">
              レンタル
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
