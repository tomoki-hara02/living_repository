import type { Metadata } from "next";
import { getRoadmapSteps } from "@/app/lib/microcms-roadmap";
import RoadmapContent from "@/app/components/RoadmapContent";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Cursor活用の基礎 ロードマップ | Living Repository",
  description:
    "AIコードエディタCursorの基本操作からチャット・Composer・MCP活用まで、ノンエンジニアでも実践できるCursor活用の基礎を学ぶロードマップ。",
};

const COVERAGE = [
  "Cursorの基本操作・環境構築",
  "コードベースの理解とナビゲーション",
  "AIインライン補完・編集",
  "チャット機能の活用",
  "Composerによる大規模編集",
  "MCPサーバーの活用",
  "プロジェクト管理とGit連携",
  "実践：Webサイト・ツール制作",
];

export default async function CursorRoadmapPage() {
  const steps = await getRoadmapSteps("cursor");

  return (
    <div className="bg-gray-50">

      {/* ===== Hero ===== */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #334155 100%)" }}
      >
        {/* 光彩オーバーレイ */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(56,189,248,0.15) 0%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 pt-32 pb-16 sm:px-6 sm:pt-40 sm:pb-20">

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">

            {/* 左：タイトル */}
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
                02 · Cursor
              </p>
              <h1 className="mb-5 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Cursor活用の基礎
              </h1>
              <p className="text-sm leading-relaxed text-white/70 sm:text-base">
                AIコードエディタCursorの基本操作から、チャット・Composer・MCPサーバー活用まで、
                ノンエンジニアでも実践できる形でCursorの使いこなし方を体系的に学ぶロードマップです。
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
            background: "linear-gradient(160deg, #f0f9ff 0%, #e0f2fe 45%, #f8fafc 100%)",
            clipPath: "polygon(0% 70%, 100% 0%, 100% 100%, 0% 100%)",
          }}
          aria-hidden
        />
      </section>

      {/* ===== チャプター一覧 ===== */}
      <section
        className="py-14 sm:py-20"
        style={{ background: "linear-gradient(160deg, #f0f9ff 0%, #e0f2fe 45%, #f8fafc 100%)" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">
              Chapters
            </span>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              チャプター一覧
            </h2>
            <div className="mt-4 h-px bg-sky-100" />
          </div>

          <RoadmapContent steps={steps} />
        </div>
      </section>

    </div>
  );
}
