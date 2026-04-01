import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ChevronRight, ArrowRight } from "lucide-react";
import { getRoadmapStepById, getRoadmapSteps } from "@/app/lib/microcms-roadmap";
import type { Level } from "@/app/lib/types-roadmap";

export const revalidate = 60;

const levelGradient: Record<Level, string> = {
  Beginner: "linear-gradient(135deg, #3b82f6, #06b6d4)",
  Standard: "linear-gradient(135deg, #10b981, #06b6d4)",
  Advanced: "linear-gradient(135deg, #f59e0b, #ef4444)",
};


const THEME_LABELS: Record<string, { label: string; href: string }> = {
  "ai-general":    { label: "汎用生成AI活用の基礎", href: "/roadmap/ai-general" },
  "cursor":        { label: "Cursor活用の基礎",     href: "/roadmap/cursor" },
  "web-marketing": { label: "ウェブマーケティング", href: "/roadmap/web-marketing" },
  "accounting":    { label: "経理サポート",         href: "/roadmap/accounting" },
  "sales":         { label: "営業・提案活動",        href: "/roadmap/sales" },
  "legal":         { label: "契約法務",              href: "/roadmap/legal" },
};

export async function generateStaticParams() {
  const steps = await getRoadmapSteps();
  return steps.map((s) => ({ id: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const step = await getRoadmapStepById(id);
  if (!step) return {};
  return {
    title: step.title,
    description: step.summary || step.title,
  };
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function RoadmapStepDetail({ params }: PageProps) {
  const { id } = await params;
  const step = await getRoadmapStepById(id);

  if (!step) notFound();

  const themeKey = Array.isArray(step.theme) ? step.theme[0] : step.theme;
  const themeInfo = themeKey ? THEME_LABELS[themeKey] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-cyan-50 pt-20">
      {/* 記事ヘッダー */}
      <div className="border-b border-gray-200/50 bg-white/80 shadow-sm backdrop-blur-sm">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">

          {/* パンくず */}
          <nav className="mb-6 flex flex-wrap items-center gap-1 text-xs text-slate-400 sm:gap-1.5 sm:text-sm">
            <Link href="/" className="transition-colors hover:text-cyan-600">
              ホーム
            </Link>
            <ChevronRight size={14} />
            <Link href="/roadmap" className="transition-colors hover:text-cyan-600">
              導入ロードマップ
            </Link>
            {themeInfo && (
              <>
                <ChevronRight size={14} />
                <Link href={themeInfo.href} className="transition-colors hover:text-cyan-600">
                  {themeInfo.label}
                </Link>
              </>
            )}
            <ChevronRight size={14} />
            <span className="line-clamp-1 text-gray-500">{step.title}</span>
          </nav>

          {/* チャプター番号 */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-extrabold text-white"
              style={{ background: levelGradient[step.level] }}
            >
              {String(step.chapterNumber).padStart(2, "0")}
            </div>
          </div>

          {/* タイトル */}
          <h1 className="mb-4 text-2xl font-bold leading-tight tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            {step.title}
          </h1>

          {/* 使用ツール */}
          {step.tools.length > 0 && (
            <div className="mb-4">
              <div className="mb-1.5 flex items-center gap-2">
                <div className="h-0.5 w-4 rounded-full" style={{ background: "linear-gradient(to right, #3b82f6, #06b6d4)" }} />
                <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                  Tools &amp; Services
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {step.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-[11px] font-medium text-blue-700"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 関連法令 */}
          {step.laws.length > 0 && (
            <div>
              <div className="mb-1.5 flex items-center gap-2">
                <div className="h-0.5 w-4 rounded-full" style={{ background: "linear-gradient(to right, #ec4899, #ef4444, #f59e0b)" }} />
                <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                  Legal Considerations
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {step.laws.map((law) => (
                  <span
                    key={law}
                    className="rounded-full border border-pink-200 bg-pink-50 px-2.5 py-0.5 text-[11px] font-medium text-pink-700"
                  >
                    {law}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 本文 */}
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        {/* アイキャッチ */}
        {step.eyecatch && (
          <div className="mb-8 overflow-hidden rounded-xl sm:mb-10 sm:rounded-2xl">
            <Image
              src={step.eyecatch.url}
              alt={step.title}
              width={step.eyecatch.width ?? 1200}
              height={step.eyecatch.height ?? 630}
              className="h-auto w-full"
              priority
            />
          </div>
        )}

        {/* 概要ボックス */}
        {step.summary && (
          <div className="mb-8 rounded-2xl border border-cyan-200 bg-gradient-to-r from-cyan-50 to-blue-50 p-5 sm:p-6">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-cyan-600">
              Summary
            </span>
            <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
              {step.summary}
            </p>
          </div>
        )}

        {/* コンテンツ本文 */}
        {step.contents && (
          <div
            className="markdown-content"
            dangerouslySetInnerHTML={{ __html: step.contents }}
          />
        )}

        {/* 法務ポイント */}
        {step.legalNote && (
          <div className="mt-10 rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-5 sm:p-6">
            <div className="mb-2 flex items-center gap-2">
              <svg className="h-4 w-4 shrink-0 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
              </svg>
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-600">
                Legal Point
              </span>
            </div>
            <p className="text-sm leading-relaxed text-amber-900 sm:text-base">
              {step.legalNote}
            </p>
          </div>
        )}

        {/* お問い合わせCTA */}
        <div className="mt-12 rounded-2xl border border-cyan-200 bg-gradient-to-r from-cyan-50 to-blue-50 p-6 text-center sm:p-8">
          <p className="mb-2 text-base font-bold text-gray-900 sm:text-lg">
            このステップについて相談する
          </p>
          <p className="mb-5 text-sm leading-relaxed text-gray-600">
            導入方法や法的リスクについて、お気軽にご相談ください。
          </p>
          <a
            href="https://outlook.office.com/book/tAiL@tail-legal.jp/s/3Ut2Czsg_kmSUYzmoJuiOw2?ismsaljsauthenabled"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg sm:text-base"
          >
            無料相談を予約する
            <ArrowRight size={16} />
          </a>
        </div>

        {/* 一覧に戻る */}
        <div className="mt-8 pt-6 text-center">
          {themeInfo ? (
            <Link
              href={themeInfo.href}
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-cyan-600"
            >
              ← {themeInfo.label}のロードマップに戻る
            </Link>
          ) : (
            <Link
              href="/roadmap"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-cyan-600"
            >
              ← ロードマップ一覧に戻る
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}
