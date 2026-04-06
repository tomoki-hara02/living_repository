import Image from "next/image";
import Link from "next/link";

const items = [
  {
    index: "01",
    step: "知る",
    category: "実践ユースケース集",
    title: "実践ユースケース集",
    benefit: "生成AIの活用事例を法令・リスクと共に整理した実務ガイド",
    description:
      "生成AIの具体的なユースケースを、推奨ツール・プロンプト例・関連法令・リスクとともに整理した実務ガイド集。「何から始めるか」を明確にします。",
    image: "/images/about/section-repository.png",
    imageClass: "object-cover",
    accentColor: "text-blue-600",
    gradient: "from-blue-100 via-blue-50 to-indigo-100",
    href: "/repository",
    linkLabel: "ユースケースを見る",
    topBar: "linear-gradient(to right, #1d4ed8, #3b82f6, #06b6d4)",
    imageRight: false,
  },
  {
    index: "02",
    step: "実装する",
    category: "導入ロードマップ",
    title: "段階的な導入ロードマップ",
    benefit: "テーマ別で企業での生成AI活用をマッピング",
    description:
      "テーマごとに段階的なステップを設定し、法務ポイントとともに実装プロセスを解説。情報収集から自動化まで、実践的なロードマップを提供します。",
    image: "/images/about/section-roadmap.png",
    imageClass: "object-cover object-center scale-[1.12]",
    accentColor: "text-cyan-600",
    gradient: "from-cyan-100 via-sky-50 to-teal-100",
    href: "/roadmap",
    linkLabel: "ロードマップを見る",
    topBar: "linear-gradient(to right, #0e7490, #06b6d4, #22d3ee)",
    imageRight: true,
  },
  {
    index: "03",
    step: "整える",
    category: "書式一覧",
    title: "法的書式・規程のサンプル集",
    benefit: "組織体制の整備に必要な法的書類をダウンロード形式で提供",
    description:
      "AI利用規程・契約書条項例・リスク評価チェックリストなど、組織体制の整備に必要な法的書類のサンプルをダウンロード形式で提供します。",
    image: "/images/about/section-formats.png",
    imageClass: "object-cover",
    accentColor: "text-indigo-600",
    gradient: "from-indigo-100 via-violet-50 to-purple-100",
    href: "/formats",
    linkLabel: "書式を見る",
    topBar: "linear-gradient(to right, #1e1b4b, #4338ca, #818cf8)",
    imageRight: false,
  },
];

export default function TopAboutSection() {
  return (
    <section className="py-16 sm:py-24" style={{ background: "linear-gradient(160deg, #f0f9ff 0%, #e8f4fd 50%, #f0fdfa 100%)" }}>
      <div className="container mx-auto px-4 sm:px-6">

        {/* セクション見出し */}
        <div className="mb-14">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
            About
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            tAiL. Members について
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-500 sm:text-base">
            企業の生成AI導入を「知る」「実装する」「整える」の3フェーズで
            <br />
            一元的にサポートするメンバー向けポータルです。
          </p>
          <div className="mt-5 h-px bg-gray-100" />
        </div>

        {/* 縦並び3枚 */}
        <div className="space-y-16 sm:space-y-20">
          {items.map((item) => (
            <div
              key={item.index}
              className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm"
            >
              <div className="h-1" style={{ background: item.topBar }} />
              <div className={`grid min-h-[360px] lg:grid-cols-2 ${item.imageRight ? "" : "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1"}`}>

                {/* テキスト側 */}
                <div className="flex flex-col justify-between p-8 sm:p-10 lg:p-12">
                  <div>
                    <div className="mb-5 flex items-center gap-2">
                      <span className="text-xs font-bold tracking-widest text-gray-300">
                        {item.index}
                      </span>
                      <span className="h-px w-6 bg-gray-200" />
                      <span className={`text-xs font-semibold uppercase tracking-widest ${item.accentColor}`}>
                        {item.step}
                      </span>
                      <span className="ml-auto rounded-full bg-gray-50 px-2.5 py-0.5 text-[11px] font-medium text-gray-500 ring-1 ring-gray-200">
                        {item.category}
                      </span>
                    </div>

                    <h3 className="mb-3 text-xl font-bold leading-snug tracking-tight text-gray-900 sm:text-2xl">
                      {item.title}
                    </h3>

                    <p className={`mb-4 text-sm font-semibold leading-snug sm:text-base ${item.accentColor}`}>
                      {item.benefit}
                    </p>

                    <p className="text-sm leading-relaxed text-gray-500 sm:text-base">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-8">
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-6 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-200 hover:border-blue-300 hover:text-blue-600"
                    >
                      {item.linkLabel}
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* 画像側 */}
                <div className={`relative min-h-[240px] overflow-hidden bg-gradient-to-br ${item.gradient} lg:min-h-0`}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className={item.imageClass}
                  />
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
