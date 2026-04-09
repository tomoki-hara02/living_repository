import { fetchNiltoContents } from "./nilto-client";
import {
  normalizeLegalContent,
  type LegalContent,
  type NiltoRawLegalContent,
} from "./types-legal";

const MODEL = "legal_content";

/**
 * legal_content 一覧を取得する。
 * category を指定するとフィルタリングする。
 * API キー未設定・通信エラー時は空配列を返し、呼び出し側でハードコードフォールバックに切り替える。
 */
export async function getLegalContents(
  category?: string,
): Promise<LegalContent[]> {
  try {
    const extra: Record<string, string> = {
      lang: "ja",
      limit: "100",
      status: "published",
      order: "-published_at",
    };

    if (category) {
      extra["category[eq]"] = category;
    }

    const raw = await fetchNiltoContents<NiltoRawLegalContent>(MODEL, extra);
    if (!raw) return [];

    return raw.map(normalizeLegalContent);
  } catch (err) {
    console.error("[nilto-legal] getLegalContents error:", err);
    return [];
  }
}

/**
 * slug で legal_content を1件取得する。
 * 見つからない場合は null を返す。
 */
export async function getLegalContentBySlug(
  slug: string,
): Promise<LegalContent | null> {
  try {
    const raw = await fetchNiltoContents<NiltoRawLegalContent>(MODEL, {
      lang: "ja",
      "slug[eq]": slug,
      limit: "1",
      status: "published",
    });

    if (!raw || raw.length === 0) return null;
    return normalizeLegalContent(raw[0]);
  } catch (err) {
    console.error(`[nilto-legal] getLegalContentBySlug(${slug}) error:`, err);
    return null;
  }
}

/** generateStaticParams 用：全コンテンツの slug を返す */
export async function getAllLegalSlugs(): Promise<string[]> {
  const items = await getLegalContents();
  return items.map((item) => item.slug);
}
