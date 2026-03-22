"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect, useTransition } from "react";
import { getDroppedSlugs, toggleDrop } from "@/actions/drops";

export function DropButtonWrapper({ slug }: { slug: string }) {
  const { data: session } = useSession();
  const [dropped, setDropped] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (!session?.user) return;
    getDroppedSlugs().then((slugs) => {
      setDropped(slugs.includes(slug));
      setLoaded(true);
    });
  }, [session, slug]);

  if (!session?.user || !loaded) return null;

  function handleClick() {
    setDropped((d) => !d);
    startTransition(async () => {
      const result = await toggleDrop(slug);
      setDropped(result.dropped);
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={pending}
      className={`mt-4 rounded px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
        dropped
          ? "bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500/30"
          : "bg-bg-card-hover border border-border text-text-secondary hover:text-red-400 hover:border-red-500/40"
      }`}
    >
      {dropped ? "切り捨て済み - 元に戻す" : "この作品を切り捨てる"}
    </button>
  );
}
