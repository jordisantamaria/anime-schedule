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
        className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-purple-500 hover:text-pink-500"
      >
        &larr; スケジュールに戻る
      </Link>

      <div className="rounded-2xl bg-white p-6 shadow-md">
        <div className="flex flex-col gap-6 sm:flex-row">
          {anime.image ? (
            <img
              src={anime.image}
              alt={anime.title}
              className="h-64 w-44 rounded-xl object-cover shadow-lg"
            />
          ) : (
            <div className="flex h-64 w-44 items-center justify-center rounded-xl bg-purple-50 text-text-muted">
              画像なし
            </div>
          )}

          <div className="flex-1">
            <h1 className="text-2xl font-extrabold text-text-primary">{anime.title}</h1>
            {anime.titleRomaji && (
              <p className="mt-1 text-text-secondary">{anime.titleRomaji}</p>
            )}
            {anime.titleEnglish && (
              <p className="text-sm text-text-muted">{anime.titleEnglish}</p>
            )}

            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              <div className="rounded-xl bg-purple-50 px-3 py-2">
                <span className="text-xs text-text-muted">曜日</span>
                <p className="font-bold text-purple-600">
                  {anime.day} ({DAY_LABELS[anime.day]})
                </p>
              </div>
              <div className="rounded-xl bg-pink-50 px-3 py-2">
                <span className="text-xs text-text-muted">配信時間</span>
                <p className="font-bold font-mono text-pink-600">{anime.time ?? "未定"}</p>
              </div>
              <div className="rounded-xl bg-orange-50 px-3 py-2">
                <span className="text-xs text-text-muted">配信開始</span>
                <p className="font-bold text-orange-600">{anime.startDate}</p>
              </div>
              <div className="rounded-xl bg-cyan-50 px-3 py-2">
                <span className="text-xs text-text-muted">タイプ</span>
                <p className="font-bold text-cyan-600">{anime.type}</p>
              </div>
              {anime.episodes && (
                <div className="rounded-xl bg-green-50 px-3 py-2">
                  <span className="text-xs text-text-muted">話数</span>
                  <p className="font-bold text-green-600">{anime.episodes}話</p>
                </div>
              )}
              {anime.studio && (
                <div className="rounded-xl bg-violet-50 px-3 py-2">
                  <span className="text-xs text-text-muted">制作会社</span>
                  <p className="font-bold text-violet-600">{anime.studio}</p>
                </div>
              )}
            </div>

            {anime.genres && anime.genres.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {anime.genres.map((g) => (
                  <span
                    key={g}
                    className="rounded-full bg-gradient-to-r from-purple-100 to-pink-100 px-3 py-0.5 text-xs font-medium text-purple-700"
                  >
                    {g}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-6">
              <h2 className="mb-2 text-sm font-bold text-text-muted">
                視聴可能
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
                      className="inline-flex items-center gap-1.5 rounded-full border-2 px-4 py-2 text-sm font-bold transition-all hover:shadow-md hover:-translate-y-0.5"
                      style={{ borderColor: p.color, color: p.color }}
                    >
                      <span
                        className="h-2.5 w-2.5 rounded-full"
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
          <div className="mt-6 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 p-4">
            <h2 className="mb-2 text-sm font-bold text-purple-600">あらすじ</h2>
            <p className="text-sm leading-relaxed text-text-secondary">
              {anime.synopsis}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
