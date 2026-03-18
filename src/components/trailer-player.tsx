"use client";

import { useState } from "react";

type Props = {
  trailerId: string;
  title: string;
  variant?: "link" | "overlay";
};

export function TrailerLink({ trailerId, title, variant = "link" }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {variant === "overlay" ? (
        <button
          onClick={() => setOpen(true)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="h-7 w-7 ml-1">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-1.5 text-xs text-accent hover:text-accent-hover font-bold"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
            <path d="M8 5v14l11-7z" />
          </svg>
          PVを再生
        </button>
      )}

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-3xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setOpen(false)}
                className="text-white/70 hover:text-white text-sm font-bold"
              >
                閉じる ✕
              </button>
            </div>
            <div className="aspect-video w-full overflow-hidden rounded-lg">
              <iframe
                src={`https://www.youtube.com/embed/${trailerId}?autoplay=1`}
                title={`${title} PV`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
