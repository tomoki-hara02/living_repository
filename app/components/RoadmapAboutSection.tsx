import Image from "next/image";

export default function RoadmapAboutSection() {
  return (
    <section className="bg-gray-50 py-12 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        {/* ===== セクション見出し ===== */}
        <div className="mb-8 text-center sm:mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">
            About
          </span>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            このロードマップについて
          </h2>
        </div>

        {/* ===== 導入説明 2カラム ===== */}
        <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-2 lg:gap-16">
          {/* 左：ビジュアル */}
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-md overflow-hidden rounded-2xl lg:max-w-full" style={{ aspectRatio: "16/9" }}>
              <Image
                src="/images/about/section-roadmap.png"
                alt="導入ロードマップ コンセプトイメージ"
                fill
                className="object-cover object-center scale-[1.12]"
                priority
              />
            </div>
          </div>

          {/* 右：テキスト */}
          <div>
            <h3 className="mb-4 text-lg font-bold leading-snug text-gray-900 sm:text-xl">
              テーマ別で企業での生成AI活用をマッピング
            </h3>
            <div className="space-y-4 text-sm leading-relaxed text-gray-600 sm:text-base">
              <p>
                実際の活用事例をもとに、初心者からでも企業で意味のある使い方に進むまでの生成AI活用をロードマップ化しました。
              </p>
              <p>
                段階的にステップが記載されており、どんなレベルからでも自分のペースで進められるようになっています。
              </p>
              <p>
                併せて各段階の<strong className="font-semibold text-gray-800">企業法務事項</strong>を押さえることで、技術面だけでなく、法務やコンプライアンス面でもリスクマネジメントをしながら導入を進めることが可能です。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
