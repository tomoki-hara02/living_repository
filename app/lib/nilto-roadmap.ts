import type { RoadmapStep, NiltoRawRoadmapStep } from "./types-roadmap";
import { normalizeRoadmapStep } from "./types-roadmap";

// 公式ドキュメントで確認済みの正しい API ベース URL
const NILTO_API_BASE = "https://cms-api.nilto.com/v1" as const;
const MODEL_LUID = "roadmap_step";

/** テーマページのキー（英語）→ NILTO の theme フィールド選択肢（日本語）へのマッピング */
const THEME_MAP: Record<string, string> = {
  "ai-general":    "汎用生成AI活用の基礎",
  "cursor":        "Cursor活用の基礎",
  "web-marketing": "ウェブマーケティング",
  "accounting":    "経理サポート",
  "sales":         "営業・提案活動",
  "legal":         "契約法務",
};

/** GET /v1/contents のレスポンス形式 */
interface NiltoListResponse {
  total: number;
  offset: number;
  limit: number;
  data: NiltoRawRoadmapStep[];
}

function getApiKey(): string | null {
  return process.env.NILTO_API_KEY ?? null;
}

// ─────────────────────────────────────────────
// ダミーデータ（NILTO_API_KEY 未設定時の開発用）
// ─────────────────────────────────────────────
const dummySteps: RoadmapStep[] = [
  {
    id: "1",
    slug: "step-01",
    theme: "ウェブマーケティング",
    chapterNumber: 1,
    title: "競合・市場リサーチ",
    summary:
      "ChatGPT / Gemini（Web検索機能）などを使い、自社サイトの強みや競合他社の訴求ポイントを調査します。プロンプト一つで大量の情報を短時間で整理できます。",
    contents: "",
    level: "Beginner",
    tools: [],
    laws: [],
    legalNote:
      "競合サイトのテキストをAIに貼り付けて分析する際、そのまま社内資料に流用することは著作権侵害となる場合があります。",
  },
  {
    id: "2",
    slug: "step-02",
    theme: "ウェブマーケティング",
    chapterNumber: 2,
    title: "戦略・構成の立案",
    summary:
      "リサーチ結果をもとに、自社サイトのサイトマップ・各ページの構成・訴求軸をAIと対話しながら言語化します。",
    contents: "",
    level: "Beginner",
    tools: [],
    laws: [],
    legalNote:
      "AIが生成したキャッチコピーに「No.1」「業界最安値」などの表現が含まれる場合、根拠が必要です。",
  },
  {
    id: "3",
    slug: "step-03",
    theme: "ウェブマーケティング",
    chapterNumber: 3,
    title: "ビジュアル制作",
    summary:
      "Midjourney・Adobe FireflyなどでアイキャッチやSNS画像を生成し、自社ブランドに合わせた広告バナーを量産します。",
    contents: "",
    level: "Standard",
    tools: [],
    laws: [],
    legalNote:
      "AI生成画像の著作権帰属はツールの利用規約により異なります。実在する人物に酷似した画像の商用利用にはリスクがあります。",
  },
];

// ─────────────────────────────────────────────
// フェッチャー
// ─────────────────────────────────────────────

/**
 * slug をフィルタキーにしてコンテンツを1件取得する。
 * GET https://cms-api.nilto.com/v1/contents?model=roadmap_step&slug[eq]={slug}&limit=1
 */
export async function getRoadmapStepBySlug(
  slug: string
): Promise<RoadmapStep | null> {
  const apiKey = getApiKey();
  if (!apiKey) {
    return dummySteps.find((s) => s.slug === slug) ?? null;
  }

  try {
    const params = new URLSearchParams({
      model: MODEL_LUID,
      "slug[eq]": slug,
      limit: "1",
    });

    const res = await fetch(`${NILTO_API_BASE}/contents?${params}`, {
      headers: { "X-NILTO-API-KEY": apiKey },
      next: { revalidate: 60, tags: [MODEL_LUID, `${MODEL_LUID}-${slug}`] },
    });

    if (!res.ok) {
      console.error(
        `[nilto-roadmap] getRoadmapStepBySlug(${slug}) failed: ${res.status}`
      );
      return null;
    }

    const data: NiltoListResponse = await res.json();
    const raw = data.data[0];
    if (!raw) return null;
    return normalizeRoadmapStep(raw);
  } catch (err) {
    console.error(`[nilto-roadmap] getRoadmapStepBySlug(${slug}) error:`, err);
    return null;
  }
}

/**
 * テーマでフィルタしてコンテンツ一覧を取得する。
 * GET https://cms-api.nilto.com/v1/contents?model=roadmap_step&order=chapter_number&theme[eq]={themeJa}
 * theme は英語キー（"accounting" など）を受け取り、日本語値に変換する。
 */
export async function getRoadmapSteps(
  theme?: string
): Promise<RoadmapStep[]> {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn("[nilto-roadmap] NILTO_API_KEY is not set — using dummy data");
    const themeJa = theme ? THEME_MAP[theme] : undefined;
    return themeJa
      ? dummySteps.filter((s) => s.theme === themeJa)
      : dummySteps;
  }

  try {
    const params = new URLSearchParams({
      model: MODEL_LUID,
      order: "chapter_number",
      limit: "100",
    });

    if (theme) {
      const themeJa = THEME_MAP[theme];
      if (themeJa) params.set("theme[eq]", themeJa);
    }

    const res = await fetch(`${NILTO_API_BASE}/contents?${params}`, {
      headers: { "X-NILTO-API-KEY": apiKey },
      cache: "no-store",
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error(
        `[nilto-roadmap] getRoadmapSteps failed: ${res.status} ${res.statusText}`,
        body
      );
      return dummySteps;
    }

    const data: NiltoListResponse = await res.json();
    const all = data.data.map(normalizeRoadmapStep);
    console.log(
      `[nilto-roadmap] fetched ${all.length} steps (theme: ${theme ?? "all"})`
    );
    return all;
  } catch (err) {
    console.error("[nilto-roadmap] getRoadmapSteps error:", err);
    return dummySteps;
  }
}

/** generateStaticParams 用：全コンテンツの slug を返す */
export async function getAllRoadmapSlugs(): Promise<string[]> {
  const steps = await getRoadmapSteps();
  return steps.map((s) => s.slug);
}
