import Image from "next/image";

export default function FormatsAboutSection() {
  return (
    <section className="bg-gray-50 py-12 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        {/* セクション見出し */}
        <div className="mb-8 text-center sm:mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
            About
          </span>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            法務/書式とは？
          </h2>
        </div>

        {/* 2カラムレイアウト */}
        <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="flex items-center justify-center">
            <Image
              src="/images/about/section-formats.png"
              alt="法務/書式 コンセプトイメージ"
              width={1024}
              height={576}
              className="h-auto w-full max-w-md lg:max-w-full"
              priority
            />
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold leading-snug text-gray-900 sm:text-xl">
              生成AI実装に必要な法的書面を
              <br />
              すぐに使えるサンプルで提供
            </h3>
            <div className="space-y-4 text-sm leading-relaxed text-gray-600 sm:text-base">
              <p>
                法務/書式は、tAiL.法律事務所が提供する生成AI導入に必要な法務解説・規程・契約書・書式のサンプル集です。
              </p>
              <p>
                「活用方法は分かった、では社内体制をどう整えるか」——そのフェーズで必要となるAI利用規程、契約書条項例、リスク評価チェックリストなどをダウンロード形式でご提供します。
              </p>
              <p>
                各書式はあくまでサンプルです。自社の事業内容・利用するAIサービス・組織体制に合わせてカスタマイズのうえご活用ください。個別の作成・レビューはtAiL.法律事務所までご相談ください。
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
