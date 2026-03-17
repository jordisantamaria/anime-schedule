import { notFound } from "next/navigation";
import Link from "next/link";
import { getAnimeBySlug, getAnimeData, DAY_LABELS } from "@/lib/data";
import { platforms } from "@/lib/platforms";

export function generateStaticParams() {
  return getAnimeData().map((anime) => ({ slug: anime.slug }));
}

export default async function AnimeDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const anime = getAnimeBySlug(slug);

  if (!anime) notFound();

  return (
    <div>
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary"
      >
        &larr; Back to schedule
      </Link>

      <div className="flex flex-col gap-6 sm:flex-row">
        {anime.image ? (
          <img
            src={anime.image}
            alt={anime.title}
            className="h-64 w-44 rounded-lg object-cover shadow-lg"
          />
        ) : (
          <div className="flex h-64 w-44 items-center justify-center rounded-lg bg-bg-card text-text-muted">
            No image
          </div>
        )}

        <div className="flex-1">
          <h1 className="text-2xl font-bold">{anime.title}</h1>
          {anime.titleRomaji && (
            <p className="mt-1 text-text-secondary">{anime.titleRomaji}</p>
          )}
          {anime.titleEnglish && (
            <p className="text-sm text-text-muted">{anime.titleEnglish}</p>
          )}

          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <div>
              <span className="text-text-muted">Day</span>
              <p className="font-medium">
                {anime.day} ({DAY_LABELS[anime.day]})
              </p>
            </div>
            <div>
              <span className="text-text-muted">Time (JST)</span>
              <p className="font-medium font-mono">{anime.time ?? "TBD"}</p>
            </div>
            <div>
              <span className="text-text-muted">Start date</span>
              <p className="font-medium">{anime.startDate}</p>
            </div>
            <div>
              <span className="text-text-muted">Type</span>
              <p className="font-medium">{anime.type}</p>
            </div>
            {anime.episodes && (
              <div>
                <span className="text-text-muted">Episodes</span>
                <p className="font-medium">{anime.episodes}</p>
              </div>
            )}
            {anime.studio && (
              <div>
                <span className="text-text-muted">Studio</span>
                <p className="font-medium">{anime.studio}</p>
              </div>
            )}
          </div>

          {anime.genres && anime.genres.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1">
              {anime.genres.map((g) => (
                <span
                  key={g}
                  className="rounded-full bg-bg-card px-2.5 py-0.5 text-xs text-text-secondary"
                >
                  {g}
                </span>
              ))}
            </div>
          )}

          <div className="mt-6">
            <h2 className="mb-2 text-sm font-medium text-text-muted">
              Where to watch
            </h2>
            <div className="flex flex-wrap gap-2">
              {anime.platforms.map((pid) => {
                const p = platforms[pid];
                return (
                  <a
                    key={pid}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm transition-colors hover:border-border-hover hover:bg-bg-card"
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: p.color }}
                    />
                    {p.name}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {anime.synopsis && (
        <div className="mt-8 rounded-lg bg-bg-secondary p-4">
          <h2 className="mb-2 text-sm font-medium text-text-muted">Synopsis</h2>
          <p className="text-sm leading-relaxed text-text-secondary">
            {anime.synopsis}
          </p>
        </div>
      )}
    </div>
  );
}
