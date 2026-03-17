import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Repository, Level } from "@/app/lib/types";

interface RepositoryCardProps {
  repository: Repository;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "");
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
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-200 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5"
    >
      <div className="flex flex-col p-4 pb-2 sm:p-6 sm:pb-3">
        {/* レベル */}
        {repository.level && (
          <div className="mb-2">
            <span
              className="inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold text-white"
              style={{ background: levelGradient[repository.level] }}
            >
              {repository.level}
            </span>
          </div>
        )}

        {/* comment */}
        {repository.comment && (
          <p className="mb-2 line-clamp-1 text-xs text-slate-500">
            {repository.comment}
          </p>
        )}

        {/* タイトル */}
        <h3 className="text-base font-bold leading-snug text-gray-900 transition-colors group-hover:text-blue-600">
          {repository.title}
        </h3>
      </div>

      {/* アイキャッチ画像 */}
      {repository.eyecatch ? (
        <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
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

      <div className="flex flex-1 flex-col p-4 pt-3 sm:p-6 sm:pt-4">
        {/* summary */}
        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-slate-600">
          {summaryText}
        </p>

        {/* モデル + 法令 */}
        <div className="mt-auto space-y-2 border-t border-slate-100 pt-3">
          {repository.models && repository.models.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {repository.models.map((m) => (
                <span
                  key={m}
                  className="rounded-md bg-blue-50 px-1.5 py-0.5 text-[10px] font-medium text-blue-600"
                >
                  {m}
                </span>
              ))}
            </div>
          )}
          <div className="flex items-center">
            {repository.laws && repository.laws.length > 0 && (
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
            <ArrowRight
              className="ml-auto shrink-0 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-blue-500"
              size={16}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
