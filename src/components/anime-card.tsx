import Link from "next/link";
import { AnimeEntry } from "@/lib/types";
import { platforms } from "@/lib/platforms";

export function AnimeCard({ anime }: { anime: AnimeEntry }) {
  return (
    <Link
      href={`/anime/${anime.slug}`}
      className="group flex items-center gap-3 rounded-lg border border-border bg-bg-card p-3 transition-all hover:border-border-hover hover:bg-bg-card-hover"
    >
      {anime.image ? (
        <img
          src={anime.image}
          alt={anime.title}
          className="h-16 w-12 rounded object-cover"
        />
      ) : (
        <div className="flex h-16 w-12 items-center justify-center rounded bg-bg-secondary text-xs text-text-muted">
          N/A
        </div>
      )}

      <div className="flex-1 min-w-0">
        <h3 className="truncate text-sm font-semibold text-text-primary group-hover:text-white">
          {anime.title}
        </h3>
        {anime.titleRomaji && (
          <p className="truncate text-xs text-text-muted">{anime.titleRomaji}</p>
        )}
        <div className="mt-1 flex items-center gap-2">
          <span className="text-xs font-mono text-text-secondary">
            {anime.time ?? "未定"}
          </span>
          <div className="flex gap-1">
            {anime.platforms.map((pid) => {
              const p = platforms[pid];
              return (
                <span
                  key={pid}
                  className="rounded px-1.5 py-0.5 text-[10px] font-medium"
                  style={{ backgroundColor: p.color + "22", color: p.color }}
                >
                  {p.name}
                </span>
              );
            })}
          </div>
          {anime.type === "レンタル" && (
            <span className="rounded bg-yellow-900/30 px-1.5 py-0.5 text-[10px] text-yellow-400">
              レンタル
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
