import type { Metadata } from "next";
import { getRepositories } from "@/app/lib/microcms";
import RepositoryList from "@/app/components/RepositoryList";
import AboutSection from "@/app/components/AboutSection";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Living Repository | tAiL. Legal Office",
  description:
    "tAiL.法律事務所が提供する生成AI活用ユースケース集。法務・ビジネスにおけるAI活用の実践的なガイドを掲載しています。",
};

export default async function RepositoryPage() {
  const repositories = await getRepositories();

  return (
    <div className="bg-white">
      {/* ===== Hero ===== */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom right, #1d4ed8, #2563eb, #60a5fa)",
            }}
          />
          <div className="absolute inset-0 bg-black/25" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pt-28 pb-24 sm:px-6 sm:pt-40 sm:pb-36 md:pb-44">
          <div className="max-w-5xl text-white">
            <h1 className="text-lg font-bold leading-tight tracking-tight sm:text-2xl md:text-3xl lg:text-4xl">
              <span className="block mb-2">生成AI活用</span>
              <span
                className="inline-block align-baseline font-extrabold leading-none"
                style={{ fontSize: "clamp(1.6em, 5vw, 2.4em)" }}
              >
                Living
              </span>
              {" "}
              <span
                className="inline-block align-baseline font-extrabold leading-none"
                style={{ fontSize: "clamp(1.6em, 5vw, 2.4em)" }}
              >
                Repository
              </span>
            </h1>

            <p className="mt-4 text-[13px] leading-relaxed sm:mt-5 sm:text-sm md:text-base">
              「何から始めたらいいのかわからない」そんな企業の疑問を解消するために
            </p>
            <p className="mt-2 text-[13px] leading-relaxed sm:mt-3 sm:text-sm md:text-base">
              生成AIに注力するtAiL.法律事務所が、ビジネス現場で採用できる生成AIユースケースを
            </p>
            <p className="mt-2 text-[13px] leading-relaxed sm:mt-3 sm:text-sm md:text-base">
              主要関連法令やリスクと共に整理して掲載しています
            </p>
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 sm:h-20 md:h-28"
          style={{ background: "linear-gradient(160deg, #f0f9ff 0%, #e8f4fd 50%, #f0fdfa 100%)", clipPath: "polygon(0% 70%, 100% 30%, 100% 100%, 0% 100%)" }}
          aria-hidden
        />
      </div>

      {/* ===== About ===== */}
      <AboutSection />

      {/* ===== Repository List ===== */}
      <section id="repositories">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20">
          <div className="mb-8 flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              Use Cases
            </span>
            <h2 className="text-2xl font-bold text-navy-900 sm:text-3xl">
              ユースケース一覧
            </h2>
          </div>

          <RepositoryList repositories={repositories} />
        </div>
      </section>
    </div>
  );
}
