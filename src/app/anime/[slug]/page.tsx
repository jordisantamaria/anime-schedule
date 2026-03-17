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
        className="mb-6 inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-300"
      >
        &larr; Back to schedule
      </Link>

      <div className="flex flex-col gap-6 sm:flex-row">
        {anime.image ? (
          <img
            src={anime.image}
            alt={anime.title}
            className="h-64 w-44 rounded-lg object-cover"
          />
        ) : (
          <div className="flex h-64 w-44 items-center justify-center rounded-lg bg-zinc-800 text-zinc-500">
            No image
          </div>
        )}

        <div className="flex-1">
          <h1 className="text-2xl font-bold">{anime.title}</h1>
          {anime.titleRomaji && (
            <p className="mt-1 text-zinc-400">{anime.titleRomaji}</p>
          )}
          {anime.titleEnglish && (
            <p className="text-sm text-zinc-500">{anime.titleEnglish}</p>
          )}

          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <div>
              <span className="text-zinc-500">Day</span>
              <p className="font-medium">
                {anime.day} ({DAY_LABELS[anime.day]})
              </p>
            </div>
            <div>
              <span className="text-zinc-500">Time (JST)</span>
              <p className="font-medium font-mono">{anime.time ?? "TBD"}</p>
            </div>
            <div>
              <span className="text-zinc-500">Start date</span>
              <p className="font-medium">{anime.startDate}</p>
            </div>
            <div>
              <span className="text-zinc-500">Type</span>
              <p className="font-medium">{anime.type}</p>
            </div>
            {anime.episodes && (
              <div>
                <span className="text-zinc-500">Episodes</span>
                <p className="font-medium">{anime.episodes}</p>
              </div>
            )}
            {anime.studio && (
              <div>
                <span className="text-zinc-500">Studio</span>
                <p className="font-medium">{anime.studio}</p>
              </div>
            )}
          </div>

          {anime.genres && anime.genres.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1">
              {anime.genres.map((g) => (
                <span
                  key={g}
                  className="rounded-full bg-zinc-800 px-2.5 py-0.5 text-xs text-zinc-400"
                >
                  {g}
                </span>
              ))}
            </div>
          )}

          <div className="mt-6">
            <h2 className="mb-2 text-sm font-medium text-zinc-500">
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
                    className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 px-3 py-2 text-sm transition-colors hover:border-zinc-500"
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
        <div className="mt-8">
          <h2 className="mb-2 text-sm font-medium text-zinc-500">Synopsis</h2>
          <p className="text-sm leading-relaxed text-zinc-300">
            {anime.synopsis}
          </p>
        </div>
      )}
    </div>
  );
}
