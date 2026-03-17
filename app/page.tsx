import { getRepositories } from "@/app/lib/microcms";
import RepositoryList from "@/app/components/RepositoryList";
import AboutSection from "@/app/components/AboutSection";
export default async function Home() {
  const repositories = await getRepositories();

  return (
    <div className="bg-white">
      {/* ===== Hero — 本体サイトと同一構造 ===== */}
      <div className="relative w-full overflow-hidden">
        {/* 背景 */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom right, #2563eb, #1d4ed8, #0891b2)",
            }}
          />
          <div className="absolute inset-0 bg-black/30" />
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

            {/* 本文（3行を独立した p 要素で、行間 mt-2 sm:mt-3） */}
            <p className="mt-4 text-[13px] leading-relaxed sm:mt-5 sm:text-sm md:text-base">
              「何から始めたらいいのかわからない」そんな企業の疑問を解消するために
            </p>
            <p className="mt-2 text-[13px] leading-relaxed sm:mt-3 sm:text-sm md:text-base">
              生成AIに注力するtAiL.法律事務所が、ビジネス現場で採用できる生成AIユースケースを
            </p>
            <p className="mt-2 text-[13px] leading-relaxed sm:mt-3 sm:text-sm md:text-base">
              主要関連法令やリスクと共に整理して掲載しています
            </p>

            {/* CTA ボタン */}
            <div className="mt-6 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
              <a
                href="#repositories"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 shadow-lg transition-all duration-300 hover:bg-blue-50 hover:shadow-xl sm:px-8 sm:py-4 sm:text-base"
              >
                Case Study
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </a>
              <a
                href="https://tail-legal.jp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/20 sm:px-8 sm:py-4 sm:text-base"
              >
                tAiL. website
              </a>
            </div>
          </div>
        </div>

        {/* 斜めディバイダー — 本体サイトと完全同一 */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-white sm:h-20 md:h-28"
          style={{ clipPath: "polygon(0% 70%, 100% 30%, 100% 100%, 0% 100%)" }}
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
