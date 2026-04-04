import type { Metadata } from "next";
import { getRoadmapSteps } from "@/app/lib/nilto-roadmap";
import RoadmapContent from "@/app/components/RoadmapContent";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "経理サポート ロードマップ | tAiL. Members",
  description:
    "見積書・請求書の自動生成から経費管理・月次レポートの自動化まで、経理業務を生成AIで効率化するロードマップ。各チャプターの法務ポイント付き。",
};

const COVERAGE = [
  "経費・請求データの整理",
  "見積書・請求書の自動生成",
  "仕訳・記帳の補助",
  "経費レポートの作成",
  "会計ソフトへのデータ連携",
  "月次レポートの自動化",
  "予実管理・分析",
  "経理ワークフローの自動化",
];

export default async function AccountingRoadmapPage() {
  const steps = await getRoadmapSteps("accounting");

  return (
    <div className="bg-gray-50">

      {/* ===== Hero ===== */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #92400e 0%, #d97706 40%, #fbbf24 100%)" }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(251,191,36,0.25) 0%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 pt-32 pb-16 sm:px-6 sm:pt-40 sm:pb-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                02 · Estimate &amp; Accounting
              </p>
              <h1 className="mb-5 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                経理サポート
              </h1>
              <p className="text-sm leading-relaxed text-white/70 sm:text-base">
                見積書・請求書の自動生成から経費レポート作成、会計ソフトへのデータ連携、
                月次レポートの自動化まで、管理部門の定型業務を大幅に削減するロードマップです。
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
            background: "linear-gradient(160deg, #fffbeb 0%, #fef3c7 45%, #fff7ed 100%)",
            clipPath: "polygon(0% 70%, 100% 0%, 100% 100%, 0% 100%)",
          }}
          aria-hidden
        />
      </section>

      {/* ===== チャプター一覧 ===== */}
      <section
        className="py-14 sm:py-20"
        style={{ background: "linear-gradient(160deg, #fffbeb 0%, #fef3c7 45%, #fff7ed 100%)" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
              Chapters
            </span>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              チャプター一覧
            </h2>
            <div className="mt-4 h-px bg-amber-100" />
          </div>

          <RoadmapContent steps={steps} />
        </div>
      </section>

    </div>
  );
}
