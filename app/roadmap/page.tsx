import type { Metadata } from "next";
import RoadmapAboutSection from "@/app/components/RoadmapAboutSection";
import RoadmapThemeCards from "@/app/components/RoadmapThemeCards";

export const metadata: Metadata = {
  title: "生成AI企業導入ロードマップ | tAiL. Members",
  description:
    "ウェブマーケティングをテーマに、生成AIの活用を段階的にステップアップさせていくロードマップ。リサーチから自動化まで、法務面も含めて整理しています。",
};

export default function RoadmapPage() {
  return (
    <div className="bg-white">
      {/* ===== Hero ===== */}
      <div className="relative w-full overflow-hidden">
        {/* 背景 */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom right, #0891b2, #06b6d4, #22d3ee)",
            }}
          />
          <div className="absolute inset-0 bg-black/25" />
        </div>

        {/* コンテンツ */}
        <div className="relative mx-auto max-w-7xl px-4 pt-28 pb-24 sm:px-6 sm:pt-40 sm:pb-36 md:pb-44">
          <div className="max-w-5xl text-white">
            {/* h1 タイトル */}
            <h1 className="text-lg font-bold leading-tight tracking-tight sm:text-2xl md:text-3xl lg:text-4xl">
              <span className="block mb-2">生成AI活用</span>
              <span
                className="inline-block align-baseline font-extrabold leading-none"
                style={{ fontSize: "clamp(1.6em, 5vw, 2.4em)" }}
              >
                企業導入
              </span>
              {" "}
              <span
                className="inline-block align-baseline font-extrabold leading-none"
                style={{ fontSize: "clamp(1.6em, 5vw, 2.4em)" }}
              >
                ロードマップ
              </span>
            </h1>

            {/* 本文 */}
            <p className="mt-4 text-[13px] leading-relaxed sm:mt-5 sm:text-sm md:text-base">
              「何から始めたらいいのかわからない」そんな企業のために
            </p>
            <p className="mt-2 text-[13px] leading-relaxed sm:mt-3 sm:text-sm md:text-base">
              テーマを決め、生成AIの使い方を段階的にステップアップできるロードマップを
            </p>
            <p className="mt-2 text-[13px] leading-relaxed sm:mt-3 sm:text-sm md:text-base">
              各ステップの法務ポイントとあわせて整理しています
            </p>

          </div>
        </div>

        {/* 斜めディバイダー */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-white sm:h-20 md:h-28"
          style={{ clipPath: "polygon(0% 70%, 100% 30%, 100% 100%, 0% 100%)" }}
          aria-hidden
        />
      </div>

      {/* ===== About ===== */}
      <RoadmapAboutSection />

      {/* ===== Theme Cards ===== */}
      <div id="roadmap">
        <RoadmapThemeCards />
      </div>
    </div>
  );
}
