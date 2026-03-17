import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ChevronRight, Calendar, ArrowRight } from "lucide-react";
import { getRepositoryById, getRepositories } from "@/app/lib/microcms";
import { ALL_MODELS, ALL_LAWS, ALL_LEVELS, stripHtml } from "@/app/lib/types";
import type { Level } from "@/app/lib/types";

const levelGradient: Record<Level, string> = {
  Beginner: "linear-gradient(135deg, #3b82f6, #06b6d4)",
  Standard: "linear-gradient(135deg, #10b981, #06b6d4)",
  Advanced: "linear-gradient(135deg, #f59e0b, #ef4444)",
};

export const revalidate = 60;

export async function generateStaticParams() {
  const repos = await getRepositories();
  return repos.map((r) => ({ id: r.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const repo = await getRepositoryById(id);
  if (!repo) return {};
  return {
    title: repo.title,
    description: repo.comment || repo.title,
  };
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function RepositoryDetail({ params }: PageProps) {
  const { id } = await params;
  const repo = await getRepositoryById(id);

  if (!repo) notFound();

  const summaryText = stripHtml(repo.summary);
  const activeModels = repo.models ?? [];
  const activeLaws = repo.laws ?? [];

  const allRepos = await getRepositories();
  const repoTags = repo.tags ?? [];
  const relatedRepos = allRepos
    .filter(
      (r) =>
        r.id !== repo.id &&
        r.tags?.some((t) => repoTags.includes(t))
    )
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 pt-20">
      {/* 記事ヘッダー */}
      <div className="border-b border-gray-200/50 bg-white/80 shadow-sm backdrop-blur-sm">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
          {/* パンくず */}
          <nav className="mb-6 flex items-center gap-1 text-xs text-slate-400 sm:gap-1.5 sm:text-sm">
            <Link href="/" className="transition-colors hover:text-blue-600">
              ホーム
            </Link>
            <ChevronRight size={14} />
            <Link href="/#repositories" className="transition-colors hover:text-blue-600">
              一覧
            </Link>
            <ChevronRight size={14} />
            <span className="line-clamp-1 text-gray-500">{repo.title}</span>
          </nav>

          {/* レベルタグ（点灯方式） */}
          <div className="mb-4 flex flex-wrap gap-1.5">
            {ALL_LEVELS.map((lv) => {
              const active = repo.level === lv;
              return (
                <span
                  key={lv}
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    active ? "text-white" : "border border-gray-200 bg-gray-50 text-gray-300"
                  }`}
                  style={active ? { background: levelGradient[lv] } : undefined}
                >
                  {lv}
                </span>
              );
            })}
          </div>

          {/* タイトル */}
          <h1 className="mb-2 text-2xl font-bold leading-tight tracking-tight text-blue-900 sm:text-3xl md:text-4xl">
            {repo.title}
          </h1>

          {/* comment */}
          {repo.comment && (
            <p className="mb-4 text-sm leading-relaxed text-slate-500 sm:text-base">
              {repo.comment}
            </p>
          )}

          {/* 年月日 */}
          {repo.published_at && (
            <div className="mb-5 flex items-center gap-1.5 text-xs text-gray-400 sm:text-sm">
              <Calendar size={14} />
              <time>
                {new Date(repo.published_at).toLocaleDateString("ja-JP", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          )}

          {/* 関連法令タグ（点灯方式） */}
          <div className="mb-3">
            <div className="mb-1.5 flex items-center gap-2">
              <div className="h-0.5 w-4 rounded-full" style={{ background: "linear-gradient(to right, #ec4899, #ef4444, #f59e0b)" }} />
              <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                Legal Considerations
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {ALL_LAWS.map((law) => {
                const active = activeLaws.includes(law);
                return (
                  <span
                    key={law}
                    className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${
                      active
                        ? "border-pink-200 bg-pink-50 text-pink-700"
                        : "border-gray-200 bg-gray-50 text-gray-300"
                    }`}
                  >
                    {law}
                  </span>
                );
              })}
            </div>
          </div>

          {/* 使用モデルタグ（点灯方式） */}
          <div>
            <div className="mb-1.5 flex items-center gap-2">
              <div className="h-0.5 w-4 rounded-full" style={{ background: "linear-gradient(to right, #3b82f6, #06b6d4)" }} />
              <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                Models &amp; Services
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {ALL_MODELS.map((model) => {
                const active = activeModels.includes(model);
                return (
                  <span
                    key={model}
                    className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${
                      active
                        ? "border-blue-200 bg-blue-50 text-blue-700"
                        : "border-gray-200 bg-gray-50 text-gray-300"
                    }`}
                  >
                    {model}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 本文 */}
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        {/* アイキャッチ */}
        {repo.eyecatch && (
          <div className="mb-8 overflow-hidden rounded-xl sm:mb-10 sm:rounded-2xl">
            <Image
              src={repo.eyecatch.url}
              alt={repo.title}
              width={repo.eyecatch.width ?? 1200}
              height={repo.eyecatch.height ?? 630}
              className="h-auto w-full"
              priority
            />
          </div>
        )}

        {/* 概要ボックス */}
        <div className="mb-8 rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 p-5 sm:p-6">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-blue-600">
            Summary
          </span>
          <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
            {summaryText}
          </p>
        </div>

        {/* コンテンツ本文 */}
        <div
          className="markdown-content"
          dangerouslySetInnerHTML={{ __html: repo.contents }}
        />

        {/* お問い合わせ */}
        <div className="mt-12 rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 p-6 text-center sm:p-8">
          <p className="mb-2 text-base font-bold text-gray-900 sm:text-lg">
            このユースケースについて相談する
          </p>
          <p className="mb-5 text-sm leading-relaxed text-gray-600">
            導入方法や法的リスクについて、お気軽にご相談ください。
          </p>
          <a
            href="https://outlook.office.com/book/tAiL@tail-legal.jp/s/3Ut2Czsg_kmSUYzmoJuiOw2?ismsaljsauthenabled"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-3 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg sm:text-base"
          >
            無料相談を予約する
            <ArrowRight size={16} />
          </a>
        </div>

        {/* 関連記事 */}
        {relatedRepos.length > 0 && (
          <div className="mt-12 border-t border-gray-200 pt-8">
            <h2 className="mb-6 text-lg font-bold text-gray-900 sm:text-xl">
              関連するユースケース
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {relatedRepos.map((r) => (
                <Link
                  key={r.id}
                  href={`/repository/${r.id}`}
                  className="group flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg"
                >
                  {r.eyecatch && (
                    <div className="relative h-32 overflow-hidden bg-slate-100">
                      <Image
                        src={r.eyecatch.url}
                        alt={r.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-4">
                    <div className="mb-1.5 flex flex-wrap gap-1">
                      {r.level && (
                        <span
                          className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white"
                          style={{ background: levelGradient[r.level] }}
                        >
                          {r.level}
                        </span>
                      )}
                      {r.models.slice(0, 2).map((m) => (
                        <span
                          key={m}
                          className="rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 px-2 py-0.5 text-[10px] font-medium text-blue-700"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                    <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-gray-900 transition-colors group-hover:text-blue-600">
                      {r.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 一覧に戻る */}
        <div className="mt-8 pt-6 text-center">
          <Link
            href="/#repositories"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-blue-600"
          >
            ← ユースケース一覧に戻る
          </Link>
        </div>
      </main>
    </div>
  );
}
