import type { RoadmapStep, NiltoRawRoadmapStep } from "./types-roadmap";
import { normalizeRoadmapStep } from "./types-roadmap";
import { fetchNiltoContents } from "./nilto-client";

const MODEL = "roadmap_step";

const THEME_MAP: Record<string, string> = {
  "ai-general":    "汎用生成AI活用の基礎",
  "cursor":        "Cursor活用の基礎",
  "web-marketing": "ウェブマーケティング",
  "accounting":    "経理サポート",
  "sales":         "営業・提案活動",
  "legal":         "契約法務",
};

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

/**
 * slug でコンテンツを1件取得する。
 */
export async function getRoadmapStepBySlug(
  slug: string,
): Promise<RoadmapStep | null> {
  try {
    const raw = await fetchNiltoContents<NiltoRawRoadmapStep>(
      MODEL,
      { "slug[eq]": slug, limit: "1" },
      { revalidate: 60, tags: ["roadmap_step", `roadmap_step-${slug}`] },
    );

    if (!raw) return dummySteps.find((s) => s.slug === slug) ?? null;

    const first = raw[0];
    return first ? normalizeRoadmapStep(first) : null;
  } catch (err) {
    console.error(`[nilto-roadmap] getRoadmapStepBySlug(${slug}) error:`, err);
    return null;
  }
}

/**
 * テーマでフィルタしてコンテンツ一覧を取得する。
 * theme は英語キー（"accounting" など）を受け取り、日本語値に変換する。
 */
export async function getRoadmapSteps(
  theme?: string,
): Promise<RoadmapStep[]> {
  try {
    const extra: Record<string, string> = {
      order: "chapter_number",
      limit: "100",
    };

    if (theme) {
      const themeJa = THEME_MAP[theme];
      if (themeJa) extra["theme[eq]"] = themeJa;
    }

    const raw = await fetchNiltoContents<NiltoRawRoadmapStep>(
      MODEL,
      extra,
      { revalidate: 60, tags: ["roadmap_step"] },
    );

    if (!raw) {
      const themeJa = theme ? THEME_MAP[theme] : undefined;
      return themeJa
        ? dummySteps.filter((s) => s.theme === themeJa)
        : dummySteps;
    }

    return raw.map(normalizeRoadmapStep);
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
