"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { droppedAnime } from "@/lib/schema";
import { eq, and } from "drizzle-orm";

async function getUserId(): Promise<string | null> {
  const session = await auth();
  return session?.user?.id ?? null;
}

export async function getDroppedSlugs(): Promise<string[]> {
  const userId = await getUserId();
  if (!userId) return [];

  const rows = await db
    .select({ slug: droppedAnime.animeSlug })
    .from(droppedAnime)
    .where(eq(droppedAnime.userId, userId));

  return rows.map((r) => r.slug);
}

export async function toggleDrop(slug: string): Promise<{ dropped: boolean }> {
  const userId = await getUserId();
  if (!userId) throw new Error("Not authenticated");

  const existing = await db
    .select()
    .from(droppedAnime)
    .where(and(eq(droppedAnime.userId, userId), eq(droppedAnime.animeSlug, slug)))
    .limit(1);

  if (existing.length > 0) {
    await db
      .delete(droppedAnime)
      .where(and(eq(droppedAnime.userId, userId), eq(droppedAnime.animeSlug, slug)));
    return { dropped: false };
  } else {
    await db.insert(droppedAnime).values({ userId, animeSlug: slug });
    return { dropped: true };
  }
}

export async function getDroppedAnimeList(): Promise<{ slug: string; createdAt: Date }[]> {
  const userId = await getUserId();
  if (!userId) return [];

  return db
    .select({ slug: droppedAnime.animeSlug, createdAt: droppedAnime.createdAt })
    .from(droppedAnime)
    .where(eq(droppedAnime.userId, userId));
}
