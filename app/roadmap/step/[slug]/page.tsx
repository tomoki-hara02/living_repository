import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight, ArrowRight, Download } from "lucide-react";
import {
  getRoadmapStepBySlug,
  getAllRoadmapSlugs,
} from "@/app/lib/nilto-roadmap";
import type { RoadmapStep } from "@/app/lib/types-roadmap";

export const revalidate = 60;

/** NILTO theme フィールドの日本語値 → 一覧ページへのマッピング */
const THEME_LABELS: Record<string, { label: string; href: string }> = {
  "汎用生成AI活用の基礎": { label: "汎用生成AI活用の基礎", href: "/roadmap/ai-general" },
  "Cursor活用の基礎":     { label: "Cursor活用の基礎",     href: "/roadmap/cursor" },
  "ウェブマーケティング": { label: "ウェブマーケティング", href: "/roadmap/web-marketing" },
  "経理サポート":         { label: "経理サポート",         href: "/roadmap/accounting" },
  "営業・提案活動":        { label: "営業・提案活動",        href: "/roadmap/sales" },
  "契約法務":              { label: "契約法務",              href: "/roadmap/legal" },
};

// ─────────────────────────────────────────────
// YouTube URL → embed URL 変換
// ─────────────────────────────────────────────
function extractYouTubeId(url: string): string | null {
  const patterns = [
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

// ─────────────────────────────────────────────
// 音声プレイヤー（優先順位: audio media → audio_url → 非表示）
// ─────────────────────────────────────────────
function AudioPlayer({ step }: { step: RoadmapStep }) {
  const src = step.audio?.url ?? step.audioUrl ?? null;
  if (!src) return null;

  return (
    <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-6">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
        Audio
      </p>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio controls className="w-full" src={src} />
    </div>
  );
}

// ─────────────────────────────────────────────
// 動画プレイヤー（YouTube → embed / その他 → video タグ or リンク）
// ─────────────────────────────────────────────
function VideoPlayer({ videoUrl }: { videoUrl: string }) {
  const youtubeId = extractYouTubeId(videoUrl);

  if (youtubeId) {
    return (
      <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200">
        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title="動画"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-5">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
        Video
      </p>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video controls className="w-full rounded-lg" src={videoUrl} />
    </div>
  );
}

// ─────────────────────────────────────────────
// 法的注意事項（空でも必ず表示）
// ─────────────────────────────────────────────
function LegalNote({ note }: { note: string }) {
  return (
    <div className="mt-10 rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-5 sm:p-6">
      <div className="mb-2 flex items-center gap-2">
        <svg
          className="h-4 w-4 shrink-0 text-amber-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
          />
        </svg>
        <span className="text-xs font-semibold uppercase tracking-widest text-amber-600">
          Legal Note
        </span>
      </div>
      {note ? (
        <p className="whitespace-pre-line text-sm leading-relaxed text-amber-900 sm:text-base">
          {note}
        </p>
      ) : (
        <p className="text-sm text-amber-800/50">
          法的注意事項は現在ありません。
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// generateStaticParams / generateMetadata
// ─────────────────────────────────────────────
export async function generateStaticParams() {
  const slugs = await getAllRoadmapSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const step = await getRoadmapStepBySlug(slug);
  if (!step) return {};
  return {
    title: step.title,
    description: step.summary || step.title,
    openGraph: {
      title: step.title,
      description: step.summary || step.title,
      ...(step.eyecatch ? { images: [{ url: step.eyecatch.url }] } : {}),
    },
  };
}

// ─────────────────────────────────────────────
// ページ本体
// ─────────────────────────────────────────────
interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function RoadmapStepDetail({ params }: PageProps) {
  const { slug } = await params;
  const step = await getRoadmapStepBySlug(slug);

  if (!step) notFound();

  const themeInfo = step.theme ? THEME_LABELS[step.theme] ?? null : null;

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

          {/* チャプター番号バッジ */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-extrabold text-white"
              style={{ background: "linear-gradient(135deg, #3b82f6, #06b6d4)" }}
            >
              {String(step.chapterNumber).padStart(2, "0")}
            </div>
            {step.theme && (
              <span className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-0.5 text-xs font-medium text-cyan-700">
                {step.theme}
              </span>
            )}
          </div>

          {/* タイトル */}
          <h1 className="mb-4 text-2xl font-bold leading-tight tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            {step.title}
          </h1>

          {/* ツール・法令バッジ（NILTO スキーマにない場合は非表示） */}
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
                  <span key={tool} className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-[11px] font-medium text-blue-700">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}

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
                  <span key={law} className="rounded-full border border-pink-200 bg-pink-50 px-2.5 py-0.5 text-[11px] font-medium text-pink-700">
                    {law}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 本文エリア */}
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">

        {/* 動画プレイヤー */}
        {step.videoUrl && <VideoPlayer videoUrl={step.videoUrl} />}

        {/* 音声プレイヤー */}
        <AudioPlayer step={step} />

        {/* 概要ボックス */}
        {step.summary && (
          <div className="mt-10 mb-8 rounded-2xl border border-cyan-200 bg-gradient-to-r from-cyan-50 to-blue-50 p-5 sm:p-6">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-cyan-600">
              Summary
            </span>
            <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
              {step.summary}
            </p>
          </div>
        )}

        {/* 本文（NILTO body フィールド HTML） */}
        {step.contents && (
          <div
            className="markdown-content"
            dangerouslySetInnerHTML={{ __html: step.contents }}
          />
        )}

        {/* 添付ファイルダウンロード */}
        {step.attachment && (
          <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <Download className="h-5 w-5 shrink-0 text-gray-500" />
              <p className="flex-1 text-sm font-semibold text-gray-900">添付ファイル</p>
              <a
                href={step.attachment.url}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-gray-800 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-gray-700"
              >
                <Download size={12} />
                ダウンロード
              </a>
            </div>
          </div>
        )}

        {/* 法的注意事項（法的情報のため空でも必ず表示） */}
        <LegalNote note={step.legalNote} />

        {/* 相談 CTA */}
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

        {/* 一覧に戻るリンク */}
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
