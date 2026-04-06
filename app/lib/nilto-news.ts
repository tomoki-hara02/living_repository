const NILTO_API_BASE = "https://cms-api.nilto.com/v1" as const;
const MODEL_LUID = "news";

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

interface NiltoListResponse {
  total: number;
  limit: number;
  offset: number;
  data: NiltoRawNewsItem[];
}

function getApiKey(): string | null {
  return process.env.NILTO_API_KEY ?? null;
}

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
  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn("[nilto-news] NILTO_API_KEY is not set — using dummy data");
    return dummyNews;
  }

  try {
    const params = new URLSearchParams({
      model: MODEL_LUID,
      lang: "ja",
      limit: "20",
      status: "published",
    });

    const res = await fetch(`${NILTO_API_BASE}/contents?${params}`, {
      headers: { "X-NILTO-API-KEY": apiKey },
      next: { revalidate: 0, tags: [MODEL_LUID] },
    });

    if (!res.ok) {
      console.error(
        `[nilto-news] getNewsItems failed: ${res.status} ${res.statusText}`
      );
      return dummyNews;
    }

    const data: NiltoListResponse = await res.json();

    const items = data.data
      .map(normalizeNewsItem)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    console.log(`[nilto-news] fetched ${items.length} news items`);
    return items;
  } catch (err) {
    console.error("[nilto-news] getNewsItems error:", err);
    return dummyNews;
  }
}
