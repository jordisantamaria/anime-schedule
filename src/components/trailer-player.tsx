"use client";

import { useState } from "react";

export function TrailerPlayer({ trailerId, title }: { trailerId: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded">
        <iframe
          src={`https://www.youtube.com/embed/${trailerId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    );
  }

  return (
    <button
      onClick={() => setPlaying(true)}
      className="relative aspect-video w-full overflow-hidden rounded group cursor-pointer"
    >
      <img
        src={`https://img.youtube.com/vi/${trailerId}/hqdefault.jpg`}
        alt={`${title} PV`}
        className="h-full w-full object-cover"
      />
      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/90 group-hover:bg-accent transition-colors shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="h-7 w-7 ml-1">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
      <span className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-0.5 text-xs font-bold text-white">
        PV
      </span>
    </button>
  );
}
