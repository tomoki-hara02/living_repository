import { fetchNiltoContents } from "./nilto-client";

const MODEL = "news";

export type NewsItem = {
  id: string;
  date: string;
  title: string;
  /** content_1 が公開済み roadmap_step を参照している場合のslug */
  roadmapSlug?: string;
  createdAt?: string;
};

type NiltoRawNewsItem = {
  _id: number;
  _model: string;
  _status: "published" | "draft";
  _title: string;
  _created_at: string;
  _updated_at: string;
  _published_at: string;
  date_time_1: string;
  single_line_1: string;
  content_1?: {
    _id: number;
    _model: string;
    _status: string;
    _title: string;
    [key: string]: unknown;
  };
};

const dummyNews: NewsItem[] = [
  {
    id: "news-01",
    date: new Date().toISOString(),
    title: "tAiL. Members をリリースしました",
  },
];

function normalizeNewsItem(raw: NiltoRawNewsItem): NewsItem {
  const isLinkedStep =
    raw.content_1?._model === "roadmap_step" &&
    raw.content_1?._status === "published";

  return {
    id: String(raw._id),
    date: raw.date_time_1,
    title: raw.single_line_1,
    roadmapSlug: isLinkedStep ? raw.content_1!._title : undefined,
    createdAt: raw._created_at,
  };
}

export async function getNewsItems(): Promise<NewsItem[]> {
  try {
    const raw = await fetchNiltoContents<NiltoRawNewsItem>(MODEL, {
      lang: "ja",
      limit: "20",
      status: "published",
    });

    if (!raw) return dummyNews;

    return raw
      .map(normalizeNewsItem)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (err) {
    console.error("[nilto-news] getNewsItems error:", err);
    return dummyNews;
  }
}
