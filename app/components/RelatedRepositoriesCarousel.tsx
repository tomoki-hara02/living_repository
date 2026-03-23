"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Level, Repository } from "@/app/lib/types";

const levelGradient: Record<Level, string> = {
  Beginner: "linear-gradient(135deg, #3b82f6, #06b6d4)",
  Standard: "linear-gradient(135deg, #10b981, #06b6d4)",
  Advanced: "linear-gradient(135deg, #f59e0b, #ef4444)",
};

function RelatedCard({ r }: { r: Repository }) {
  return (
    <Link
      href={`/repository/${r.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg"
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
  );
}

export default function RelatedRepositoriesCarousel({
  relatedRepos,
}: {
  relatedRepos: Repository[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  return (
    <>
      {/* Mobile: 横スクロールカルーセル */}
      <div className="sm:hidden">
        <div
          ref={carouselRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          onScroll={() => {
            if (rafRef.current !== null) return;
            rafRef.current = window.requestAnimationFrame(() => {
              rafRef.current = null;
              const el = carouselRef.current;
              if (!el) return;
              const items = Array.from(el.children) as HTMLElement[];
              if (items.length === 0) return;
              const center = el.scrollLeft + el.clientWidth / 2;
              let nearestIdx = 0;
              let nearestDist = Number.POSITIVE_INFINITY;
              for (let i = 0; i < items.length; i++) {
                const dist = Math.abs(
                  items[i].offsetLeft + items[i].clientWidth / 2 - center
                );
                if (dist < nearestDist) {
                  nearestDist = dist;
                  nearestIdx = i;
                }
              }
              setActiveIndex(nearestIdx);
            });
          }}
        >
          {relatedRepos.map((r) => (
            <div key={r.id} className="w-[86%] flex-none snap-start">
              <RelatedCard r={r} />
            </div>
          ))}
        </div>

        {relatedRepos.length > 1 && (
          <div className="mt-3 flex items-center justify-center gap-2">
            {relatedRepos.map((r, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={r.id}
                  type="button"
                  aria-label={`スライド${idx + 1}`}
                  aria-current={isActive}
                  onClick={() => {
                    const el = carouselRef.current;
                    if (!el) return;
                    const items = Array.from(el.children) as HTMLElement[];
                    const target = items[idx];
                    if (!target) return;
                    el.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
                  }}
                  className={[
                    "h-1.5 rounded-full transition-all duration-300",
                    isActive ? "w-2.5 bg-blue-600" : "w-1.5 bg-slate-300",
                  ].join(" ")}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Desktop: グリッド */}
      <div className="hidden gap-4 sm:grid sm:grid-cols-3">
        {relatedRepos.map((r) => (
          <RelatedCard key={r.id} r={r} />
        ))}
      </div>
    </>
  );
}
