import type { Metadata } from "next";
import { getRoadmapSteps } from "@/app/lib/microcms-roadmap";
import RoadmapContent from "@/app/components/RoadmapContent";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "契約法務 ロードマップ | Living Repository",
  description:
    "契約書レビューから社内規程整備まで、法務業務を生成AIでサポートするロードマップ。各チャプターの法務ポイント付き。",
};

const COVERAGE = [
  "法令・判例のリサーチ",
  "契約書のドラフト作成",
  "契約書のリスクチェック",
  "社内規程の整備",
  "法務相談対応の効率化",
  "コンプライアンス監査支援",
  "契約管理のデジタル化",
  "法務ワークフローの自動化",
];

export default async function LegalRoadmapPage() {
  const steps = await getRoadmapSteps("legal");

  return (
    <div className="bg-gray-50">

      {/* ===== Hero ===== */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1e293b 0%, #475569 40%, #94a3b8 100%)" }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(148,163,184,0.25) 0%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 pt-32 pb-16 sm:px-6 sm:pt-40 sm:pb-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                04 · Contract &amp; Legal
              </p>
              <h1 className="mb-5 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                契約法務
              </h1>
              <p className="text-sm leading-relaxed text-white/70 sm:text-base">
                契約書のリスク抽出・条項の自動チェックから社内規程のドラフト生成、
                法令調査の補助まで、法務担当者の負荷を下げながらコンプライアンスを強化するロードマップです。
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
            background: "linear-gradient(160deg, #f8fafc 0%, #e2e8f0 45%, #f0f9ff 100%)",
            clipPath: "polygon(0% 70%, 100% 0%, 100% 100%, 0% 100%)",
          }}
          aria-hidden
        />
      </section>

      {/* ===== チャプター一覧 ===== */}
      <section
        className="py-14 sm:py-20"
        style={{ background: "linear-gradient(160deg, #f8fafc 0%, #e2e8f0 45%, #f0f9ff 100%)" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
              Chapters
            </span>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              チャプター一覧
            </h2>
            <div className="mt-4 h-px bg-slate-200" />
          </div>

          <RoadmapContent steps={steps} />
        </div>
      </section>

    </div>
  );
}
