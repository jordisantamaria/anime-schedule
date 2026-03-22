"use client";

import { useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { AnimeEntry } from "@/lib/types";
import { toggleDrop } from "@/actions/drops";

type DroppedItem = { slug: string; anime: AnimeEntry | null };

export function DropsContent({ items }: { items: DroppedItem[] }) {
  const { data: session } = useSession();
  const [list, setList] = useState(items);
  const [pending, startTransition] = useTransition();

  if (!session?.user) {
    return <p className="text-text-muted text-sm">ログインしてください。</p>;
  }

  if (list.length === 0) {
    return <p className="text-text-muted text-sm">切り捨てた作品はありません。</p>;
  }

  function handleRestore(slug: string) {
    setList((prev) => prev.filter((i) => i.slug !== slug));
    startTransition(async () => {
      await toggleDrop(slug);
    });
  }

  return (
    <div className="space-y-2">
      {list.map(({ slug, anime }) => (
        <div
          key={slug}
          className="flex items-center gap-3 rounded bg-bg-card border border-border p-2.5"
        >
          {anime?.image ? (
            <img src={anime.image} alt={anime.title} className="h-14 w-10 rounded-sm object-cover" />
          ) : (
            <div className="flex h-14 w-10 items-center justify-center rounded-sm bg-bg-card-hover text-[10px] text-text-muted">
              N/A
            </div>
          )}
          <div className="flex-1 min-w-0">
            <Link href={`/anime/${slug}`} className="text-sm font-bold hover:text-accent">
              {anime?.title ?? slug}
            </Link>
          </div>
          <button
            onClick={() => handleRestore(slug)}
            disabled={pending}
            className="shrink-0 rounded border border-border px-2 py-1 text-xs font-bold text-text-secondary hover:text-accent hover:border-accent transition-colors cursor-pointer"
          >
            元に戻す
          </button>
        </div>
      ))}
    </div>
  );
}
