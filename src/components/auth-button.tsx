"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export function AuthButton() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (status === "loading") {
    return <div className="h-7 w-7 rounded-full bg-white/20 animate-pulse" />;
  }

  if (!session?.user) {
    return (
      <button
        onClick={() => signIn("google")}
        className="rounded bg-white/10 px-3 py-1 text-xs font-bold text-white hover:bg-white/20 transition-colors cursor-pointer"
      >
        ログイン
      </button>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 cursor-pointer"
      >
        {session.user.image ? (
          <img
            src={session.user.image}
            alt=""
            className="h-7 w-7 rounded-full"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
            {session.user.name?.[0] ?? "?"}
          </div>
        )}
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-40 rounded border border-border bg-bg-card text-text-primary shadow-lg z-50">
          <Link
            href="/drops"
            onClick={() => setOpen(false)}
            className="block px-3 py-2 text-sm hover:bg-bg-card-hover"
          >
            切り捨てリスト
          </Link>
          <button
            onClick={() => signOut()}
            className="block w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-bg-card-hover cursor-pointer"
          >
            ログアウト
          </button>
        </div>
      )}
    </div>
  );
}
