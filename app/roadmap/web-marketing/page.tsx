import type { Metadata } from "next";
import { getRoadmapSteps } from "@/app/lib/microcms-roadmap";
import RoadmapContent from "@/app/components/RoadmapContent";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ウェブマーケティング ロードマップ | Living Repository",
  description:
    "自社ウェブマーケにおける情報収集から、内製化・分析・コンテンツ自動更新まで、生成AIで丸ごと自動化するロードマップ。各チャプターの法務ポイント付き。",
};

const COVERAGE = [
  "競合・市場リサーチ",
  "戦略・構成の立案",
  "ビジュアル制作",
  "ウェブサイト制作",
  "デプロイ",
  "データ分析（初級）",
  "データ連携・深掘り分析",
  "自動化",
];

export default async function WebMarketingRoadmapPage() {
  const steps = await getRoadmapSteps("web-marketing");

  return (
    <div className="bg-gray-50">

      {/* ===== Hero ===== */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0e7490 0%, #0891b2 40%, #38bdf8 100%)" }}
      >
        {/* 光彩オーバーレイ */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(56,189,248,0.25) 0%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 pt-32 pb-16 sm:px-6 sm:pt-40 sm:pb-20">

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">

            {/* 左：タイトル */}
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                01 · Web Marketing
              </p>
              <h1 className="mb-5 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                ウェブマーケティング
              </h1>
              <p className="text-sm leading-relaxed text-white/70 sm:text-base">
                自社ウェブマーケにおける基本的な情報収集から、最新の自社ウェブサイトの内製化、
                サイトの分析からコンテンツの自動更新まで、営業戦略に貢献するロードマップです。
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
            background: "linear-gradient(160deg, #f0f9ff 0%, #e0f2fe 45%, #f0fdfa 100%)",
            clipPath: "polygon(0% 70%, 100% 0%, 100% 100%, 0% 100%)",
          }}
          aria-hidden
        />
      </section>

      {/* ===== チャプター一覧 ===== */}
      <section
        className="py-14 sm:py-20"
        style={{ background: "linear-gradient(160deg, #f0f9ff 0%, #e0f2fe 45%, #f0fdfa 100%)" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600">
              Chapters
            </span>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              チャプター一覧
            </h2>
            <div className="mt-4 h-px bg-cyan-100" />
          </div>

          <RoadmapContent steps={steps} />
        </div>
      </section>

    </div>
  );
}
