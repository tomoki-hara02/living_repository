import Link from "next/link";
import Image from "next/image";
import type { Repository, Level } from "@/app/lib/types";
import { stripHtml } from "@/app/lib/types";

interface RepositoryCardProps {
  repository: Repository;
}

const levelGradient: Record<Level, string> = {
  Beginner: "linear-gradient(135deg, #3b82f6, #06b6d4)",
  Standard: "linear-gradient(135deg, #10b981, #06b6d4)",
  Advanced: "linear-gradient(135deg, #f59e0b, #ef4444)",
};

export default function RepositoryCard({ repository }: RepositoryCardProps) {
  const summaryText = stripHtml(repository.summary);

  return (
    <Link
      href={`/repository/${repository.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
    >
      {/* アイキャッチ画像 */}
      {repository.eyecatch ? (
        <div className="relative h-44 overflow-hidden bg-slate-100 sm:h-48 lg:h-52">
          <Image
            src={repository.eyecatch.url}
            alt={repository.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="h-px bg-slate-100" />
      )}

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* レベル */}
        <div className="mb-2 flex flex-wrap items-center gap-1.5">
          {repository.level && (
            <span
              className="rounded-full px-2.5 py-0.5 text-[11px] font-bold text-white"
              style={{ background: levelGradient[repository.level] }}
            >
              {repository.level}
            </span>
          )}
        </div>

        {/* comment */}
        {repository.comment && (
          <p className="mb-1.5 line-clamp-1 text-xs text-slate-500">
            {repository.comment}
          </p>
        )}

        {/* タイトル */}
        <h3 className="mb-2 line-clamp-2 text-base font-semibold leading-snug text-gray-900 transition-colors group-hover:text-blue-600">
          {repository.title}
        </h3>

        {/* summary */}
        <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-slate-600">
          {summaryText}
        </p>

        {/* フッター */}
        <div className="mt-auto space-y-2 border-t border-slate-100 pt-3">
          {repository.laws.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {repository.laws.map((l) => (
                <span
                  key={l}
                  className="rounded-md bg-pink-50 px-1.5 py-0.5 text-[10px] font-medium text-pink-600"
                >
                  {l}
                </span>
              ))}
            </div>
          )}
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {repository.models.slice(0, 3).map((m) => (
                <span
                  key={m}
                  className="rounded-md bg-blue-50 px-1.5 py-0.5 text-[10px] font-medium text-blue-600"
                >
                  {m}
                </span>
              ))}
              {repository.models.length > 3 && (
                <span className="rounded-md bg-gray-50 px-1.5 py-0.5 text-[10px] text-gray-400">
                  +{repository.models.length - 3}
                </span>
              )}
            </div>
            <span className="text-xs font-medium text-blue-600 opacity-0 transition-opacity group-hover:opacity-100">
              詳細を見る →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
