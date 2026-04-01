import type { MicroCMSResponse } from "./types";

const MICROCMS_SERVICE_DOMAIN = "tail-members";
const MICROCMS_API_BASE =
  `https://${MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1` as const;
const ENDPOINT = "news";

function getApiKey(): string | null {
  return process.env.MICROCMS_ROADMAP_API_KEY ?? null;
}

export interface NewsItem {
  id: string;
  date: string;
  title: string;
  createdAt?: string;
}

interface MicroCMSRawNewsItem {
  id: string;
  date?: string;
  title: string;
  createdAt?: string;
}

const dummyNews: NewsItem[] = [
  {
    id: "news-01",
    date: new Date().toISOString(),
    title: "tAiL. Members をリリースしました",
  },
];

export async function getNewsItems(): Promise<NewsItem[]> {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn("[microcms-news] MICROCMS_ROADMAP_API_KEY is not set — using dummy data");
    return dummyNews;
  }

  try {
    const res = await fetch(
      `${MICROCMS_API_BASE}/${ENDPOINT}?limit=10&orders=-date`,
      {
        headers: { "X-MICROCMS-API-KEY": apiKey },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error(`[microcms-news] getNewsItems failed: ${res.status} ${res.statusText}`);
      return dummyNews;
    }

    const data: MicroCMSResponse<MicroCMSRawNewsItem> = await res.json();
    return data.contents.map((item) => ({
      id: item.id,
      date: item.date ?? item.createdAt ?? "",
      title: item.title,
      createdAt: item.createdAt,
    }));
  } catch (err) {
    console.error("[microcms-news] getNewsItems error:", err);
    return dummyNews;
  }
}
