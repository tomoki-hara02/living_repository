import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { getRepositoryById, getRepositories } from "@/app/lib/microcms";

export async function generateStaticParams() {
  const repos = await getRepositories();
  return repos.map((r) => ({ id: r.id }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function RepositoryDetail({ params }: PageProps) {
  const { id } = await params;
  const repo = await getRepositoryById(id);

  if (!repo) notFound();

  return (
    <div className="bg-white pt-20">
      {/* Breadcrumb */}
      <div className="border-b border-slate-100 bg-slate-50/50">
        <div className="mx-auto max-w-4xl px-4 py-3 sm:px-6">
          <nav className="flex items-center gap-1 text-xs text-slate-400 sm:gap-1.5 sm:text-sm">
            <Link
              href="/"
              className="transition-colors hover:text-blue-600"
            >
              ホーム
            </Link>
            <ChevronRight size={14} />
            <Link
              href="/#repositories"
              className="transition-colors hover:text-blue-600"
            >
              一覧
            </Link>
            <ChevronRight size={14} />
            <span className="line-clamp-1 font-medium text-gray-900">{repo.title}</span>
          </nav>
        </div>
      </div>

      <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-14">
        {/* Header */}
        <header className="mb-10">
          <div className="mb-4 flex flex-wrap gap-1.5">
            {repo.tags?.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="mb-2 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            {repo.title}
          </h1>
          {repo.comment && (
            <p className="mb-4 text-sm leading-relaxed text-slate-500">
              {repo.comment}
            </p>
          )}
          {repo.published_at && (
            <time className="text-sm text-slate-400">
              {new Date(repo.published_at).toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          )}
        </header>

        {/* Eyecatch */}
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

        {/* Summary */}
        <section className="mb-10">
          <div className="mb-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              Summary
            </span>
          </div>
          <div
            className="prose prose-slate max-w-none text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: repo.summary }}
          />
        </section>

        {/* Contents */}
        <section className="mb-10">
          <div
            className="cms-content prose prose-slate max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-xl prose-h2:text-gray-900 prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-lg prose-h3:text-gray-800 prose-p:leading-relaxed prose-p:text-slate-700 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-blockquote:border-blue-300 prose-blockquote:bg-slate-50 prose-blockquote:py-1 prose-blockquote:not-italic prose-strong:text-gray-900 prose-li:text-slate-700"
            dangerouslySetInnerHTML={{ __html: repo.contents }}
          />
        </section>

        {/* Back link */}
        <div className="border-t border-slate-100 pt-8">
          <Link
            href="/#repositories"
            className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
          >
            ← 一覧に戻る
          </Link>
        </div>
      </article>
    </div>
  );
}
