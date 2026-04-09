import type { Metadata } from "next";
import { Download, Lock, ChevronRight, FileText } from "lucide-react";
import Link from "next/link";
import FormatsAboutSection from "@/app/components/FormatsAboutSection";
import { getLegalContents } from "@/app/lib/nilto-legal";
import {
  LEGAL_CATEGORY_LABELS,
  LEGAL_CATEGORY_ICONS,
  LEGAL_CATEGORY_COLORS,
  LEGAL_CATEGORY_ACCENTS,
  LEGAL_CATEGORY_ORDER,
  type LegalContent,
} from "@/app/lib/types-legal";

export const metadata: Metadata = {
  title: "法務/書式 | tAiL. Members",
  description:
    "生成AIの企業導入に必要なサンプル書式・契約書条項例・利用規程テンプレートをダウンロードできます。組織体制整備の参考にご活用ください。",
};

type DocStatus = "available" | "coming_soon";

interface FormatDoc {
  title: string;
  description: string;
  fileType?: string;
  status: DocStatus;
  href?: string;
}

interface FormatCategory {
  id: string;
  label: string;
  icon: string;
  color: string;
  accent: string;
  description: string;
  docs: FormatDoc[];
}

const categories: FormatCategory[] = [
  {
    id: "policy",
    label: "AI利用規程・ポリシー",
    icon: "📋",
    color: "from-blue-50 to-indigo-50",
    accent: "bg-blue-600",
    description:
      "社内での生成AI利用ルールを明文化するための規程・ポリシーのサンプルです。",
    docs: [
      {
        title: "生成AI利用規程（基本版）",
        description:
          "社内向けの生成AI利用に関する基本的なルールをまとめた規程のサンプルです。禁止事項・遵守事項・違反時の対応などを網羅しています。",
        fileType: "DOCX",
        status: "coming_soon",
      },
      {
        title: "ChatGPT等外部サービス利用ガイドライン",
        description:
          "ChatGPT・Gemini・Claudeなど外部生成AIサービスを業務利用する際のガイドラインテンプレートです。",
        fileType: "DOCX",
        status: "coming_soon",
      },
      {
        title: "生成AI利用に関する同意書（従業員向け）",
        description:
          "従業員が生成AIを業務利用するにあたって、会社のポリシーを理解・同意したことを示す書式です。",
        fileType: "DOCX",
        status: "coming_soon",
      },
    ],
  },
  {
    id: "contract",
    label: "契約書条項例",
    icon: "📝",
    color: "from-emerald-50 to-teal-50",
    accent: "bg-emerald-600",
    description:
      "AIを活用したサービスや業務委託に関する契約書に盛り込む条項のサンプルです。",
    docs: [
      {
        title: "生成AI利用に関する業務委託契約条項例",
        description:
          "業務委託先が生成AIを活用する場合の取り決め条項のサンプルです。成果物の著作権・機密情報の取扱いなどをカバーします。",
        fileType: "DOCX",
        status: "coming_soon",
      },
      {
        title: "AIシステム開発委託契約条項例",
        description:
          "生成AIを組み込んだシステムの開発を委託する際の条項サンプルです。データの権利・精度保証・瑕疵担保などを含みます。",
        fileType: "DOCX",
        status: "coming_soon",
      },
      {
        title: "生成AI活用サービス利用規約条項例",
        description:
          "自社サービスに生成AIを活用している場合にサービス利用規約へ追加する条項例です。免責・禁止事項・知的財産などをカバーします。",
        fileType: "DOCX",
        status: "coming_soon",
      },
      {
        title: "個人情報・機密情報に関する特約条項例（AI版）",
        description:
          "生成AIへの入力を前提とした個人情報・機密情報の取扱いに特化した特約条項のサンプルです。",
        fileType: "DOCX",
        status: "coming_soon",
      },
    ],
  },
  {
    id: "organization",
    label: "組織体制・内部規程",
    icon: "🏢",
    color: "from-violet-50 to-purple-50",
    accent: "bg-violet-600",
    description:
      "生成AI活用推進体制の整備に必要な社内規程・体制文書のサンプルです。",
    docs: [
      {
        title: "生成AI推進委員会 設置規程サンプル",
        description:
          "社内でAI活用を推進・管理する委員会の設置・運営に関する規程のサンプルです。",
        fileType: "DOCX",
        status: "coming_soon",
      },
      {
        title: "AI利用インシデント対応フロー",
        description:
          "生成AIの利用に関する情報漏洩・誤情報生成などのインシデントが発生した場合の対応手順書です。",
        fileType: "DOCX",
        status: "coming_soon",
      },
      {
        title: "生成AI活用 リスク評価チェックリスト",
        description:
          "業務への生成AI導入前に実施するリスク評価のためのチェックリストです。法的・セキュリティ・倫理観点を網羅します。",
        fileType: "XLSX",
        status: "coming_soon",
      },
    ],
  },
  {
    id: "privacy",
    label: "個人情報・プライバシー",
    icon: "🔒",
    color: "from-orange-50 to-amber-50",
    accent: "bg-orange-600",
    description:
      "生成AI利用に伴う個人情報・プライバシー対応に必要な書式のサンプルです。",
    docs: [
      {
        title: "プライバシーポリシー AI利用追記条項例",
        description:
          "既存のプライバシーポリシーへ生成AI活用に関する説明を追記するための条項サンプルです。",
        fileType: "DOCX",
        status: "coming_soon",
      },
      {
        title: "個人データ 生成AI入力禁止リスト（社内周知用）",
        description:
          "生成AIへの入力が禁止される個人データの類型を社内向けにわかりやすく整理した周知文書サンプルです。",
        fileType: "DOCX",
        status: "coming_soon",
      },
    ],
  },
];

const fileTypeBadge: Record<string, string> = {
  DOCX: "bg-blue-100 text-blue-700",
  XLSX: "bg-emerald-100 text-emerald-700",
  PDF: "bg-red-100 text-red-700",
};

function CmsContentSection({ contents }: { contents: LegalContent[] }) {
  const grouped = LEGAL_CATEGORY_ORDER.map((cat) => ({
    category: cat,
    label: LEGAL_CATEGORY_LABELS[cat],
    icon: LEGAL_CATEGORY_ICONS[cat],
    color: LEGAL_CATEGORY_COLORS[cat],
    accent: LEGAL_CATEGORY_ACCENTS[cat],
    items: contents.filter((c) => c.category === cat),
  })).filter((g) => g.items.length > 0);

  return (
    <section id="formats" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
      <div className="space-y-16">
        {grouped.map((group) => (
          <div key={group.category}>
            <div className="mb-6 flex items-center gap-3">
              <span className="text-3xl">{group.icon}</span>
              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                {group.label}
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((item) => (
                <Link
                  key={item.id}
                  href={`/formats/${item.slug}`}
                  className={`group flex flex-col rounded-2xl border border-gray-100 bg-gradient-to-br p-5 transition-all duration-200 hover:border-gray-300 hover:shadow-md ${group.color}`}
                >
                  <div className="mb-3 flex items-center gap-2">
                    <span
                      className={`rounded-full bg-white/70 px-2.5 py-0.5 text-[10px] font-semibold ring-1 ring-gray-200 ${group.accent}`}
                    >
                      {group.label}
                    </span>
                    {item.file && (
                      <span className="inline-flex items-center gap-0.5 rounded bg-blue-100 px-2 py-0.5 text-[10px] font-bold tracking-wider text-blue-700">
                        <FileText size={9} />
                        DL可
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-semibold leading-snug text-gray-900 transition-colors sm:text-base group-hover:text-indigo-700">
                    {item.title}
                  </h3>
                  <p className="mt-2 flex-1 line-clamp-3 text-xs leading-relaxed text-gray-500 sm:text-sm">
                    {item.summary}
                  </p>

                  <div className={`mt-4 flex items-center gap-1 text-xs font-semibold ${group.accent}`}>
                    詳細を見る
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default async function FormatsPage() {
  const cmsContents = await getLegalContents();

  return (
    <div className="bg-white">
      {/* ===== Hero ===== */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom right, #1e1b4b, #312e81, #4338ca)",
            }}
          />
          <div className="absolute inset-0 bg-black/20" />
          {/* 装飾 */}
          <div className="absolute right-0 top-0 h-96 w-96 -translate-y-1/3 translate-x-1/3 rounded-full bg-white/5" />
          <div className="absolute bottom-0 left-0 h-64 w-64 translate-y-1/2 -translate-x-1/3 rounded-full bg-white/5" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pt-28 pb-24 sm:px-6 sm:pt-40 sm:pb-36 md:pb-44">
          <div className="max-w-3xl text-white">
            <h1 className="text-lg font-bold leading-tight tracking-tight sm:text-2xl md:text-3xl lg:text-4xl">
              <span className="block mb-2">生成AI活用</span>
                <span
                className="inline-block align-baseline font-extrabold leading-none"
                style={{ fontSize: "clamp(1.6em, 5vw, 2.4em)" }}
              >
                法務/書式
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-[13px] leading-relaxed text-white/85 sm:text-sm md:text-base">
              生成AI実装や活用に不可欠な法的書面や
              <br className="hidden sm:block" />
              組織体制として必要となる規程・契約条項・書式のサンプルをここにまとめています。
            </p>

          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-white sm:h-20 md:h-28"
          style={{ clipPath: "polygon(0% 70%, 100% 30%, 100% 100%, 0% 100%)" }}
          aria-hidden
        />
      </div>

      {/* ===== About ===== */}
      <FormatsAboutSection />

      {/* ===== ご利用について ===== */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
          <div className="flex gap-4">
            <div className="mt-0.5 flex-shrink-0 text-2xl">⚠️</div>
            <div>
              <h2 className="text-sm font-semibold text-amber-900 sm:text-base">
                ご利用にあたって
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-amber-800 sm:text-sm">
                掲載の書式はあくまでサンプル・参考資料です。個別の事情や最新の法令・ガイドラインに応じた修正が必要です。
                実際の契約や規程への適用にあたっては、必ず専門家（弁護士等）へご相談ください。
              </p>
              <p className="mt-2 text-xs leading-relaxed text-amber-800 sm:text-sm">
                なお、現在準備中の書式については、順次公開予定です。公開をご希望の書式がある場合は
                <a
                  href="https://tail-legal.jp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 underline underline-offset-2 hover:text-amber-900"
                >
                  本体サイト
                </a>
                よりお問い合わせください。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== カテゴリ別法務/書式 ===== */}
      {cmsContents.length > 0 ? (
        <CmsContentSection contents={cmsContents} />
      ) : (
        <section id="formats" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
          <div className="space-y-16">
            {categories.map((cat) => (
              <div key={cat.id}>
                {/* カテゴリヘッダー */}
                <div className="mb-6 flex items-center gap-3">
                  <span className="text-3xl">{cat.icon}</span>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                      {cat.label}
                    </h2>
                    <p className="mt-0.5 text-sm text-gray-500">{cat.description}</p>
                  </div>
                </div>

                {/* ドキュメントカード */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {cat.docs.map((doc, i) => (
                    <div
                      key={i}
                      className={`group relative flex flex-col rounded-2xl border bg-gradient-to-br p-5 transition-all duration-200 ${cat.color} ${
                        doc.status === "available"
                          ? "cursor-pointer border-gray-200 hover:border-gray-300 hover:shadow-md"
                          : "border-gray-100"
                      }`}
                    >
                      {/* ファイルタイプ＆ステータスバッジ */}
                      <div className="mb-3 flex items-center gap-2">
                        {doc.fileType && (
                          <span
                            className={`rounded px-2 py-0.5 text-[10px] font-bold tracking-wider ${
                              fileTypeBadge[doc.fileType] ?? "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {doc.fileType}
                          </span>
                        )}
                        {doc.status === "available" ? (
                          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 ring-1 ring-emerald-200">
                            ダウンロード可
                          </span>
                        ) : (
                          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-400 ring-1 ring-gray-200">
                            準備中
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm font-semibold leading-snug text-gray-900 sm:text-base">
                        {doc.title}
                      </h3>
                      <p className="mt-2 flex-1 text-xs leading-relaxed text-gray-500 sm:text-sm">
                        {doc.description}
                      </p>

                      {/* ダウンロードボタン */}
                      <div className="mt-4">
                        {doc.status === "available" && doc.href ? (
                          <a
                            href={doc.href}
                            download
                            className={`inline-flex items-center gap-1.5 rounded-full ${cat.accent} px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:opacity-90`}
                          >
                            <Download size={12} />
                            ダウンロード
                          </a>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-4 py-2 text-xs font-medium text-gray-400">
                            <Lock size={12} />
                            準備中
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===== 個別相談CTA ===== */}
      <section className="bg-gradient-to-br from-blue-900 to-indigo-900 py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-300">
            tAiL. Legal Office
          </p>
          <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
            個別の書式作成・カスタマイズをご希望の方へ
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">
            自社の事業内容・利用サービスに合わせた規程・契約書のドラフト作成や
            既存書類のレビューは、tAiL. Legal Officeまでお気軽にご相談ください。
          </p>
          <a
            href="https://tail-legal.jp"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-blue-900 shadow-lg transition-all duration-300 hover:bg-blue-50 hover:shadow-xl"
          >
            tAiL. Legal Officeへ相談する
            <ChevronRight size={16} />
          </a>
        </div>
      </section>
    </div>
  );
}
