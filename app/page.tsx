import TopAboutCarousel from "@/app/components/TopAboutCarousel";
import NewsSection from "@/app/components/NewsSection";
import { getNewsItems } from "@/app/lib/nilto-news";

export const revalidate = 0;

export default async function TopPage() {
  const news = await getNewsItems();
  return (
    <div className="bg-white">
      {/* ===== Hero ===== */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom left, #0891b2, #1e40af, #1e3a8a)",
            }}
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/4 translate-x-1/4 rounded-full bg-white/5" />
          <div className="absolute bottom-0 left-0 h-80 w-80 translate-y-1/3 -translate-x-1/4 rounded-full bg-white/5" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pt-28 pb-24 sm:px-6 sm:pt-40 sm:pb-36 md:pb-44">
          <div className="max-w-4xl text-white">
            <h1 className="text-lg font-bold leading-tight tracking-tight sm:text-2xl md:text-3xl lg:text-4xl">
              <span
                className="inline-block align-baseline font-extrabold leading-none"
                style={{ fontSize: "clamp(1.6em, 5vw, 2.4em)" }}
              >
                tAiL. Members
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-[13px] leading-relaxed text-white/90 sm:text-sm md:text-base">
              生成AI活用に必要な実践ユースケース、段階的な導入ロードマップ、
              <br className="hidden sm:block" />
              そして組織体制の整備に必要な法的書類まで——
            </p>
            <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-white/90 sm:text-sm md:text-base">
              企業の生成AI導入を「知る」「実装する」「整える」の3ステップで
              <br className="hidden sm:block" />
              一元的にサポートするメンバー向けポータルです。
            </p>
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 sm:h-20 md:h-28"
          style={{ background: "linear-gradient(160deg, #f0f9ff 0%, #e8f4fd 50%, #f0fdfa 100%)", clipPath: "polygon(0% 70%, 100% 30%, 100% 100%, 0% 100%)" }}
          aria-hidden
        />
      </div>

      {/* ===== お知らせ ===== */}
      <NewsSection news={news} />

      {/* ===== About カルーセル ===== */}
      <TopAboutCarousel />
    </div>
  );
}
