const NILTO_API_BASE = "https://cms-api.nilto.com/v1" as const;

export interface NiltoListResponse<T> {
  total: number;
  limit: number;
  offset: number;
  data: T[];
}

export function getNiltoApiKey(): string | null {
  return process.env.NILTO_API_KEY ?? null;
}

/**
 * NILTO の GET /v1/contents を呼び出す汎用フェッチャー。
 * API キー未設定時は null を返すので、呼び出し側でダミーデータにフォールバックする。
 */
export async function fetchNiltoContents<TRaw>(
  model: string,
  extraParams?: Record<string, string>,
): Promise<TRaw[] | null> {
  const apiKey = getNiltoApiKey();
  if (!apiKey) {
    console.warn(`[nilto] NILTO_API_KEY is not set (model: ${model})`);
    return null;
  }

  const params = new URLSearchParams({ model, ...extraParams });

  const res = await fetch(`${NILTO_API_BASE}/contents?${params}`, {
    headers: { "X-NILTO-API-KEY": apiKey },
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error(
      `[nilto] fetch failed (model: ${model}): ${res.status} ${res.statusText}`,
      body,
    );
    return null;
  }

  const data: NiltoListResponse<TRaw> = await res.json();
  console.log(
    `[nilto] fetched ${data.data.length} items (model: ${model}):`,
    JSON.stringify(data.data.map((item) => {
      const raw = item as Record<string, unknown>;
      return { _id: raw._id, _title: raw._title, _status: raw._status };
    })),
  );
  return data.data;
}
