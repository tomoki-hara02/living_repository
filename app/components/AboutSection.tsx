import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="py-12 sm:py-20" style={{ background: "linear-gradient(160deg, #f0f9ff 0%, #e8f4fd 50%, #f0fdfa 100%)" }}>
      <div className="container mx-auto px-4 sm:px-6">

        {/* ===== 各ユースケースの読み方 ===== */}
        <div>
          <h3 className="mb-6 text-center text-lg font-bold text-gray-900 sm:mb-10 sm:text-xl">
            各ユースケースの読み方
          </h3>

          <div className="mx-auto max-w-4xl space-y-8 sm:space-y-12">
            {/* 使用モデル */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <div className="h-1" style={{ background: "linear-gradient(to right, #3b82f6, #06b6d4)" }} />
              <div className="p-4 sm:p-6 md:p-8">
                <div className="mb-3 flex items-center gap-3">
                  <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" />
                  </svg>
                  <div>
                    <h4 className="bg-clip-text text-base font-bold text-transparent" style={{ backgroundImage: "linear-gradient(to right, #3b82f6, #06b6d4)" }}>使用モデル / サービス</h4>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Models &amp; Services</span>
                  </div>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                  <div className="flex-1">
                    <p className="mb-3 text-sm leading-relaxed text-gray-600">
                      このユースケースを実践するのに適した生成AIモデル・サービスを示しています。色付きで表示されているモデルが推奨、灰色は今回の用途では不使用です。複数のモデルが色付きの場合、いずれでも実践可能です。
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-[11px] font-medium text-blue-700">ChatGPT</span>
                      <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-[11px] font-medium text-blue-700">Claude</span>
                      <span className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-[11px] font-medium text-gray-400">Gemini</span>
                      <span className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-[11px] font-medium text-gray-400">Cursor</span>
                      <span className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-[11px] font-medium text-gray-400">NotebookLM</span>
                      <span className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-[11px] font-medium text-gray-400">Midjourney</span>
                      <span className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-[11px] font-medium text-gray-400">ローカルLLM</span>
                    </div>
                  </div>
                  <div className="w-full shrink-0 overflow-hidden rounded-lg sm:w-48">
                    <Image src="/images/about/section-models-services.png" alt="使用モデルの表示例" width={400} height={250} className="h-auto w-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* 関連法令 */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <div className="h-1" style={{ background: "linear-gradient(to right, #ec4899, #ef4444, #f59e0b)" }} />
              <div className="p-4 sm:p-6 md:p-8">
                <div className="mb-3 flex items-center gap-3">
                  <svg className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                  </svg>
                  <div>
                    <h4 className="bg-clip-text text-base font-bold text-transparent" style={{ backgroundImage: "linear-gradient(to right, #ec4899, #ef4444, #f59e0b)" }}>関連法令</h4>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Legal Considerations</span>
                  </div>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                  <div className="flex-1">
                    <p className="mb-3 text-sm leading-relaxed text-gray-600">
                      このユースケースを実践する際に留意すべき法令・リスク領域を示しています。色付きの項目が該当する法令です。実際の適用範囲は業種・利用形態によって異なりますので、詳細はご相談ください。
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="rounded-full border border-pink-200 bg-pink-50 px-2.5 py-0.5 text-[11px] font-medium text-pink-700">個人情報保護法</span>
                      <span className="rounded-full border border-pink-200 bg-pink-50 px-2.5 py-0.5 text-[11px] font-medium text-pink-700">著作権法</span>
                      <span className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-[11px] font-medium text-gray-400">不正競争防止法</span>
                      <span className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-[11px] font-medium text-gray-400">守秘義務</span>
                      <span className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-[11px] font-medium text-gray-400">その他</span>
                    </div>
                  </div>
                  <div className="w-full shrink-0 overflow-hidden rounded-lg sm:w-48">
                    <Image src="/images/about/section-legal-considerations.png" alt="関連法令の表示例" width={400} height={250} className="h-auto w-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* レベル */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <div className="h-1" style={{ background: "linear-gradient(to right, #10b981, #06b6d4, #3b82f6)" }} />
              <div className="p-4 sm:p-6 md:p-8">
                <div className="mb-3 flex items-center gap-3">
                  <svg className="h-5 w-5 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                  </svg>
                  <div>
                    <h4 className="bg-clip-text text-base font-bold text-transparent" style={{ backgroundImage: "linear-gradient(to right, #10b981, #06b6d4, #3b82f6)" }}>レベル</h4>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Difficulty</span>
                  </div>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                  <div className="flex-1">
                    <p className="mb-3 text-sm leading-relaxed text-gray-600">
                      このユースケースの実施に必要な技術的ハードルの目安です。
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 rounded-lg border border-blue-100 bg-blue-50/30 px-3 py-2">
                        <span className="shrink-0 rounded-md px-2.5 py-0.5 text-[11px] font-bold text-white" style={{ background: "linear-gradient(135deg, #3b82f6, #06b6d4)" }}>
                          Beginner
                        </span>
                        <p className="text-xs leading-relaxed text-gray-600">
                          1つのサービスにプロンプトを入力するだけ。初心者でもすぐに始められます。
                        </p>
                      </div>
                      <div className="flex items-center gap-3 rounded-lg border border-emerald-100 bg-emerald-50/30 px-3 py-2">
                        <span className="shrink-0 rounded-md px-2.5 py-0.5 text-[11px] font-bold text-white" style={{ background: "linear-gradient(135deg, #10b981, #06b6d4)" }}>
                          Standard
                        </span>
                        <p className="text-xs leading-relaxed text-gray-600">
                          基本的な生成AIの機能/組み合わせにより、ビジネスで役立つ工夫を加えます。
                        </p>
                      </div>
                      <div className="flex items-center gap-3 rounded-lg border border-orange-100 bg-orange-50/30 px-3 py-2">
                        <span className="shrink-0 rounded-md px-2.5 py-0.5 text-[11px] font-bold text-white" style={{ background: "linear-gradient(135deg, #f59e0b, #ef4444)" }}>
                          Advanced
                        </span>
                        <p className="text-xs leading-relaxed text-gray-600">
                          MCP連携やエージェント機能、複数ツールの組み合わせによりビジネスを飛躍させます。
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full shrink-0 overflow-hidden rounded-lg sm:w-48">
                    <Image src="/images/about/section-difficulty-steps.png" alt="レベルの表示例" width={400} height={250} className="h-auto w-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 免責事項 */}
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 sm:mt-6 sm:p-6 md:p-8">
          <div className="mb-4 flex items-center gap-2">
            <svg className="h-5 w-5 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
            <h4 className="text-sm font-bold text-red-600">ユースケース参照にあたっての注意事項</h4>
          </div>
          <ul className="space-y-2.5 text-xs leading-relaxed text-slate-500 sm:text-sm">
            <li className="flex gap-2">
              <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" />
              本ユースケースの内容は、すべての環境で同じ結果が得られることを保証するものではありません。お使いのツール・プラン・社内体制などによって、実現できる範囲は異なります。
            </li>
            <li className="flex gap-2">
              <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" />
              各ユースケースに記載している「関連法令」や「リスク」は主要なものを示したものであり、実際のご利用にあたっては、ここに記載のないリスクが生じる可能性があります。
            </li>
            <li className="flex gap-2">
              <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" />
              本ユースケースの内容を参考に実践された結果について、tAiL.法律事務所は一切の責任を負いかねます。導入・運用にあたっては、必要に応じて専門家にご相談ください。
            </li>
            <li className="flex gap-2">
              <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" />
              生成AI技術は急速に進化しており、本ユースケースの内容が将来的に古くなったり、新たなリスクが生じる可能性があります。掲載日時をご確認のうえ、最新の情報と合わせてご活用ください。
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
