import type { Metadata } from "next";
import { getRoadmapSteps } from "@/app/lib/nilto-roadmap";
import RoadmapContent from "@/app/components/RoadmapContent";

export const revalidate = 60;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "汎用生成AI活用の基礎 ロードマップ | tAiL. Members",
  description:
    "ChatGPT・Claude・Geminiなどの主要生成AIツールの特徴を理解し、プロンプト設計から業務フローへの組み込み・社内ルール整備まで、AI活用の基礎を体系的に学ぶロードマップ。",
};

const COVERAGE = [
  "生成AIとは何か（基礎知識）",
  "主要ツールの比較（ChatGPT / Claude / Gemini）",
  "効果的なプロンプト設計",
  "情報収集・要約への活用",
  "文書作成・翻訳への活用",
  "業務フローへの組み込み方",
  "セキュリティ・情報漏洩対策",
  "社内AI活用ルール整備",
];

export default async function AiGeneralRoadmapPage() {
  const steps = await getRoadmapSteps("ai-general");

  return (
    <div className="bg-gray-50">

      {/* ===== Hero ===== */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 40%, #a855f7 100%)" }}
      >
        {/* 光彩オーバーレイ */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(168,85,247,0.25) 0%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 pt-32 pb-16 sm:px-6 sm:pt-40 sm:pb-20">

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">

            {/* 左：タイトル */}
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">
                01 · AI General
              </p>
              <h1 className="mb-5 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                汎用生成AI活用の基礎
              </h1>
              <p className="text-sm leading-relaxed text-white/70 sm:text-base">
                ChatGPT・Claude・Geminiなど主要ツールの特徴を理解し、
                効果的なプロンプト設計から業務フローへの組み込み・
                社内ルール整備まで、AI活用の土台を体系的に構築するロードマップです。
              </p>
            </div>

            {/* 右：取扱テーマ一覧 */}
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">
                Coverage
              </p>
              <ol className="space-y-2">
                {COVERAGE.map((label, i) => (
                  <li key={label} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-[11px] font-bold text-white/50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-sm font-medium text-white/85">{label}</span>
                  </li>
                ))}
              </ol>
            </div>

          </div>
        </div>

        {/* 斜めディバイダー */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-12 sm:h-16"
          style={{
            background: "linear-gradient(160deg, #faf5ff 0%, #f3e8ff 45%, #fdf4ff 100%)",
            clipPath: "polygon(0% 70%, 100% 0%, 100% 100%, 0% 100%)",
          }}
          aria-hidden
        />
      </section>

      {/* ===== チャプター一覧 ===== */}
      <section
        className="py-14 sm:py-20"
        style={{ background: "linear-gradient(160deg, #faf5ff 0%, #f3e8ff 45%, #fdf4ff 100%)" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-600">
              Chapters
            </span>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              チャプター一覧
            </h2>
            <div className="mt-4 h-px bg-purple-100" />
          </div>

          <RoadmapContent steps={steps} />
        </div>
      </section>

    </div>
  );
}
