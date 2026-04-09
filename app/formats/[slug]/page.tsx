import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Download, FileText, Calendar } from "lucide-react";
import { getLegalContentBySlug, getAllLegalSlugs } from "@/app/lib/nilto-legal";
import {
  LEGAL_CATEGORY_LABELS,
  LEGAL_CATEGORY_ICONS,
  LEGAL_CATEGORY_COLORS,
  LEGAL_CATEGORY_ACCENTS,
} from "@/app/lib/types-legal";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getAllLegalSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getLegalContentBySlug(slug);
  if (!item) return {};
  return {
    title: `${item.title} | 法務/書式 | tAiL. Members`,
    description: item.summary,
  };
}

export default async function LegalContentDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getLegalContentBySlug(slug);

  if (!item) notFound();

  const categoryLabel = LEGAL_CATEGORY_LABELS[item.category];
  const categoryIcon  = LEGAL_CATEGORY_ICONS[item.category];
  const categoryColor = LEGAL_CATEGORY_COLORS[item.category];
  const categoryAccent = LEGAL_CATEGORY_ACCENTS[item.category];

  const publishedDate = new Date(item.publishedAt).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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
          <div className="absolute right-0 top-0 h-96 w-96 -translate-y-1/3 translate-x-1/3 rounded-full bg-white/5" />
          <div className="absolute bottom-0 left-0 h-64 w-64 translate-y-1/2 -translate-x-1/3 rounded-full bg-white/5" />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 pt-28 pb-20 sm:px-6 sm:pt-40 sm:pb-28">
          {/* パンくず */}
          <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-white/60">
            <Link href="/" className="transition-colors hover:text-white/90">ホーム</Link>
            <span>/</span>
            <Link href="/formats" className="transition-colors hover:text-white/90">法務/書式</Link>
            <span>/</span>
            <span className="text-white/80">{categoryLabel}</span>
          </nav>

          {/* カテゴリバッジ */}
          <div className="mb-4 flex items-center gap-2">
            <span className="text-xl">{categoryIcon}</span>
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white/90 ring-1 ring-white/20">
              {categoryLabel}
            </span>
          </div>

          <h1 className="text-2xl font-bold leading-snug text-white sm:text-3xl md:text-4xl">
            {item.title}
          </h1>

          {item.summary && (
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
              {item.summary}
            </p>
          )}

          <div className="mt-5 flex items-center gap-1.5 text-xs text-white/50">
            <Calendar size={12} />
            {publishedDate}
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-white sm:h-20 md:h-28"
          style={{ clipPath: "polygon(0% 70%, 100% 30%, 100% 100%, 0% 100%)" }}
          aria-hidden
        />
      </div>

      {/* ===== コンテンツエリア ===== */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">

        {/* ファイルダウンロード */}
        {item.file && (
          <div className={`mb-10 rounded-2xl border border-gray-100 bg-gradient-to-br p-6 ${categoryColor}`}>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-600">
                <FileText size={20} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">書式ファイルのダウンロード</p>
                <p className="mt-0.5 truncate text-xs text-gray-500">
                  {item.file.alt ?? "書式サンプルファイル"}
                </p>
              </div>
              <a
                href={item.file.url}
                download
                className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-full bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 hover:shadow-md"
              >
                <Download size={12} />
                ダウンロード
              </a>
            </div>
          </div>
        )}

        {/* 本文 */}
        {item.body ? (
          <div
            className="markdown-content"
            dangerouslySetInnerHTML={{ __html: item.body }}
          />
        ) : (
          !item.file && (
            <div className="rounded-2xl border border-gray-100 bg-gray-50 py-20 text-center">
              <p className="text-sm text-gray-400">コンテンツを準備中です。</p>
            </div>
          )
        )}

        {/* ご利用にあたって */}
        <div className="mt-12 rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <div className="flex gap-3">
            <span className="flex-shrink-0 text-lg">⚠️</span>
            <p className="text-xs leading-relaxed text-amber-800 sm:text-sm">
              掲載のコンテンツ・書式はあくまでサンプル・参考資料です。個別の事情や最新の法令・ガイドラインに応じた修正が必要です。
              実際の契約や規程への適用にあたっては、必ず専門家（弁護士等）へご相談ください。
            </p>
          </div>
        </div>

        {/* 戻るボタン */}
        <div className="mt-10 border-t border-gray-100 pt-8">
          <Link
            href="/formats"
            className={`inline-flex items-center gap-2 rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 transition-all duration-200 hover:border-indigo-200 ${categoryAccent}`}
          >
            <ChevronLeft size={16} />
            法務/書式 一覧に戻る
          </Link>
        </div>
      </div>

      {/* ===== 個別相談CTA ===== */}
      <section className="bg-gradient-to-br from-blue-900 to-indigo-900 py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-300">
            tAiL. Legal Office
          </p>
          <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
            個別の法務相談・書式カスタマイズをご希望の方へ
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
          </a>
        </div>
      </section>
    </div>
  );
}
