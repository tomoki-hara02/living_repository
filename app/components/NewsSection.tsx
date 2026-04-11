import Link from "next/link";
import type { NewsItem } from "@/app/lib/nilto-news";

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function NewsSection({ news }: { news: NewsItem[] }) {
  if (news.length === 0) return null;

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="mb-6 flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
            News
          </span>
          <span className="h-px flex-1 bg-gray-100" />
        </div>

        <ul className="divide-y divide-gray-100">
          {news.map((item) => (
            <li
              key={item.id}
              className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:gap-8"
            >
              <time
                dateTime={item.date}
                className="shrink-0 text-xs tabular-nums text-gray-400 sm:text-sm"
              >
                {formatDate(item.date)}
              </time>
              {item.roadmapSlug ? (
                <Link
                  href={`/roadmap/step/${item.roadmapSlug}`}
                  className="text-sm leading-relaxed text-blue-600 underline-offset-2 hover:underline sm:text-base"
                >
                  {item.title}
                </Link>
              ) : item.legalSlug ? (
                <Link
                  href={`/formats/${item.legalSlug}`}
                  className="text-sm leading-relaxed text-blue-600 underline-offset-2 hover:underline sm:text-base"
                >
                  {item.title}
                </Link>
              ) : (
                <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
                  {item.title}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
