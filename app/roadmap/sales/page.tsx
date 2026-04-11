import type { Metadata } from "next";
import { getRoadmapSteps } from "@/app/lib/nilto-roadmap";
import RoadmapContent from "@/app/components/RoadmapContent";

export const revalidate = 60;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "営業・提案活動 ロードマップ | tAiL. Members",
  description:
    "提案資料の作成から商談フォローまで、営業活動を生成AIでまるごと支援するロードマップ。各チャプターの法務ポイント付き。",
};

const COVERAGE = [
  "顧客・市場情報のリサーチ",
  "提案書のドラフト作成",
  "営業メール・文書の生成",
  "商談メモ・議事録の要約",
  "CRMデータの整理・入力",
  "営業レポートの自動作成",
  "顧客フォローの自動化",
  "営業プロセス全体の最適化",
];

export default async function SalesRoadmapPage() {
  const steps = await getRoadmapSteps("sales");

  return (
    <div className="bg-gray-50">

      {/* ===== Hero ===== */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #5b21b6 0%, #7c3aed 40%, #a78bfa 100%)" }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(167,139,250,0.25) 0%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 pt-32 pb-16 sm:px-6 sm:pt-40 sm:pb-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
                03 · Sales &amp; Proposal
              </p>
              <h1 className="mb-5 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                営業・提案活動
              </h1>
              <p className="text-sm leading-relaxed text-white/70 sm:text-base">
                顧客情報の整理から提案書や営業メールの自動生成、商談メモの要約、
                CRMへの自動入力まで、営業チームの生産性を飛躍的に向上させるロードマップです。
              </p>
            </div>

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

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-12 sm:h-16"
          style={{
            background: "linear-gradient(160deg, #f5f3ff 0%, #ede9fe 45%, #eef2ff 100%)",
            clipPath: "polygon(0% 70%, 100% 0%, 100% 100%, 0% 100%)",
          }}
          aria-hidden
        />
      </section>

      {/* ===== チャプター一覧 ===== */}
      <section
        className="py-14 sm:py-20"
        style={{ background: "linear-gradient(160deg, #f5f3ff 0%, #ede9fe 45%, #eef2ff 100%)" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
              Chapters
            </span>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              チャプター一覧
            </h2>
            <div className="mt-4 h-px bg-violet-100" />
          </div>

          <RoadmapContent steps={steps} />
        </div>
      </section>

    </div>
  );
}
