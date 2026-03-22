import { pgTable, text, timestamp, primaryKey } from "drizzle-orm/pg-core";

export const droppedAnime = pgTable(
  "dropped_anime",
  {
    userId: text("user_id").notNull(),
    animeSlug: text("anime_slug").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.userId, table.animeSlug] })],
);
