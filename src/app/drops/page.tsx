import { getDroppedAnimeList } from "@/actions/drops";
import { getAnimeBySlug } from "@/lib/data";
import { DropsContent } from "@/components/drops-content";

export const dynamic = "force-dynamic";

export default async function DropsPage() {
  const dropped = await getDroppedAnimeList();

  const items = dropped.map((d) => ({
    slug: d.slug,
    anime: getAnimeBySlug(d.slug) ?? null,
  }));

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">切り捨てリスト</h1>
      <p className="mb-6 text-xs text-text-muted">
        ホーム画面から非表示にした作品の一覧です。
      </p>
      <DropsContent items={items} />
    </div>
  );
}
