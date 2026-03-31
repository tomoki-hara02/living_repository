import type {
  RoadmapStep,
  MicroCMSRawRoadmapStep,
} from "./types-roadmap";
import { normalizeRoadmapStep } from "./types-roadmap";
import type { MicroCMSResponse } from "./types";

const MICROCMS_SERVICE_DOMAIN = "tail-members";
const MICROCMS_API_BASE =
  `https://${MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1` as const;
const ENDPOINT = "roadmap";

function getApiKey(): string | null {
  return process.env.MICROCMS_ROADMAP_API_KEY ?? null;
}

// ─────────────────────────────────────────────
// ダミーデータ（microCMS 設定前の開発用）
// ─────────────────────────────────────────────
const dummySteps: RoadmapStep[] = [
  {
    id: "step-01",
    chapterNumber: 1,
    title: "競合・市場リサーチ",
    summary:
      "ChatGPT / Gemini（Web検索機能）などを使い、自社サイトの強みや競合他社の訴求ポイントを調査します。プロンプト一つで大量の情報を短時間で整理できます。",
    contents: "",
    level: "Beginner",
    tools: ["ChatGPT", "Gemini（Web検索）", "Perplexity"],
    laws: ["著作権法（引用・転載）", "不正競争防止法"],
    legalNote:
      "競合サイトのテキストをAIに貼り付けて分析する際、そのまま社内資料に流用することは著作権侵害となる場合があります。",
  },
  {
    id: "step-02",
    chapterNumber: 2,
    title: "戦略・構成の立案",
    summary:
      "リサーチ結果をもとに、自社サイトのサイトマップ・各ページの構成・訴求軸をAIと対話しながら言語化します。ライティング補助や構成案の叩き台作成にも活用できます。",
    contents: "",
    level: "Beginner",
    tools: ["ChatGPT", "Claude", "Gemini"],
    laws: ["景品表示法（誇大広告）", "薬機法（業種による）"],
    legalNote:
      "AIが生成したキャッチコピーに「No.1」「業界最安値」などの表現が含まれる場合、根拠が必要です。",
  },
  {
    id: "step-03",
    chapterNumber: 3,
    title: "ビジュアル制作",
    summary:
      "Midjourney・Adobe FireflyなどでアイキャッチやSNS画像を生成し、nanobananaなどのAIバナーツールで自社ブランドに合わせた広告バナーを量産します。",
    contents: "",
    level: "Standard",
    tools: ["Midjourney", "Adobe Firefly", "nanobanana", "Canva AI"],
    laws: ["著作権法（AI生成物）", "肖像権・パブリシティ権"],
    legalNote:
      "AI生成画像の著作権帰属はツールの利用規約により異なります。実在する人物・キャラクターに酷似した画像の商用利用にはリスクがあります。",
  },
  {
    id: "step-04",
    chapterNumber: 4,
    title: "ウェブサイト制作",
    summary:
      "AIコーディングツール「Cursor」を使い、HTMLやReact/Next.jsによる簡易的なウェブサイトを作成します。プログラミング未経験でもAIとの対話でページ構造を組み立てられます。",
    contents: "",
    level: "Standard",
    tools: ["Cursor", "VS Code + GitHub Copilot", "v0.dev"],
    laws: ["ライセンス（OSS利用）", "著作権法（コード生成物）"],
    legalNote:
      "AIが生成したコードに既存OSSのコードが含まれる可能性があります。ライセンス（MIT・GPLなど）を確認し商用利用条件を守りましょう。",
  },
  {
    id: "step-05",
    chapterNumber: 5,
    title: "デプロイ",
    summary:
      "作成したサイトをVercel・Netlifyなどのホスティングサービスに公開します。GitHubと連携するだけで自動デプロイが完成し、独自ドメイン設定もスムーズに進められます。",
    contents: "",
    level: "Standard",
    tools: ["Vercel", "Netlify", "GitHub Pages", "Cloudflare Pages"],
    laws: ["利用規約（ホスティング）", "特定商取引法（ECの場合）"],
    legalNote:
      "公開サイトがECや問い合わせフォームを持つ場合、特定商取引法に基づく表記やプライバシーポリシーの掲載が必要になります。",
  },
  {
    id: "step-06",
    chapterNumber: 6,
    title: "データ分析（初級）",
    summary:
      "GA4・GSCの画面をChatGPT・ClaudeなどのブラウザAI機能に渡し、「どのページが伸びているか」「どのキーワードで来ているか」を自然言語で質問します。",
    contents: "",
    level: "Standard",
    tools: ["ChatGPT（スクリーンショット解析）", "Claude", "Gemini Advanced"],
    laws: ["個人情報保護法", "Googleサービス利用規約"],
    legalNote:
      "外部AIサービスへのデータ送信は利用規約と社内ポリシーを確認してから行いましょう。",
  },
  {
    id: "step-07",
    chapterNumber: 7,
    title: "データ連携・深掘り分析",
    summary:
      "GA4・GSCのデータをBigQuery等に保存し、MCPサーバーやLooker Studioのコネクタを通じてAIに継続的に分析させます。より高精度なインサイトと改善提案が得られます。",
    contents: "",
    level: "Advanced",
    tools: ["MCP（GA4 / GSC）", "BigQuery", "Looker Studio", "Claude + MCP"],
    laws: ["個人情報保護法", "データ保管・管理規程", "Googleサービス利用規約"],
    legalNote:
      "外部ストレージへのデータ転送・保管にあたっては、個人情報の第三者提供・委託に該当しないか確認が必要です。",
  },
  {
    id: "step-08",
    chapterNumber: 8,
    title: "自動化",
    summary:
      "MCPサーバーやn8n・Zapierを使い、GA4・GSCデータの定期取得・保存・レポート生成を全自動で行います。PDCAサイクルを高速で回せる環境を構築します。",
    contents: "",
    level: "Advanced",
    tools: ["MCP（自動化）", "n8n", "Zapier", "Google Apps Script"],
    laws: ["個人情報保護法", "セキュリティ・アクセス管理", "不正アクセス禁止法"],
    legalNote:
      "APIキーやOAuthトークンの安全な管理が必須です。アクセスログの保管と定期的な権限見直しも推奨します。",
  },
];

// ─────────────────────────────────────────────
// フェッチャー
// ─────────────────────────────────────────────
export async function getRoadmapSteps(theme?: string): Promise<RoadmapStep[]> {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn("[microcms-roadmap] MICROCMS_API_KEY is not set — using dummy data");
    return theme ? dummySteps.filter((s) => !theme || s.theme === theme) : dummySteps;
  }

  try {
    const query = theme
      ? `limit=100&orders=chapterNumber&filters=theme[contains]${theme}`
      : "limit=100&orders=chapterNumber";

    const res = await fetch(
      `${MICROCMS_API_BASE}/${ENDPOINT}?${query}`,
      {
        headers: {
          "X-MICROCMS-API-KEY": apiKey,
          "Cache-Control": "no-store, no-cache",
        },
        cache: "no-store",
        next: { revalidate: 0 },
      }
    );

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error(
        `[microcms-roadmap] getRoadmapSteps failed: ${res.status} ${res.statusText}`,
        body
      );
      return dummySteps;
    }

    const data: MicroCMSResponse<MicroCMSRawRoadmapStep> = await res.json();
    console.log(`[microcms-roadmap] fetched ${data.contents.length} steps`);
    return data.contents.map(normalizeRoadmapStep);
  } catch (err) {
    console.error("[microcms-roadmap] getRoadmapSteps error:", err);
    return dummySteps;
  }
}
