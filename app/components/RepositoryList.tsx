"use client";

import { useEffect, useRef, useState } from "react";
import type { Repository } from "@/app/lib/types";
import { ALL_MODELS, ALL_LAWS, ALL_LEVELS, stripHtml } from "@/app/lib/types";
import TagFilter, { type FilterState } from "./TagFilter";
import SearchBar from "./SearchBar";
import RepositoryCard from "./RepositoryCard";

function matchesKeyword(repo: Repository, keyword: string): boolean {
  const q = keyword.toLowerCase();
  const title = repo.title.toLowerCase();
  const comment = (repo.comment ?? "").toLowerCase();
  const summary = stripHtml(repo.summary).toLowerCase();
  return title.includes(q) || comment.includes(q) || summary.includes(q);
}

interface RepositoryListProps {
  repositories: Repository[];
}

export default function RepositoryList({ repositories }: RepositoryListProps) {
  const [filter, setFilter] = useState<FilterState>({
    models: [],
    laws: [],
    level: null,
  });
  const [keyword, setKeyword] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const filtered = repositories.filter((r) => {
    if (keyword && !matchesKeyword(r, keyword)) return false;
    if (
      filter.models.length > 0 &&
      !filter.models.some((m) => r.models.includes(m))
    )
      return false;
    if (
      filter.laws.length > 0 &&
      !filter.laws.some((l) => r.laws.includes(l))
    )
      return false;
    if (filter.level !== null && r.level !== filter.level) return false;
    return true;
  });

  useEffect(() => {
    setActiveIndex(0);
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0 });
    }
  }, [filtered.length]);

  return (
    <>
      <div className="mb-6">
        <SearchBar value={keyword} onChange={setKeyword} />
      </div>

      <div className="mb-8">
        <TagFilter
          allModels={[...ALL_MODELS]}
          allLaws={[...ALL_LAWS]}
          allLevels={ALL_LEVELS}
          onFilterChange={setFilter}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="py-16 text-center text-sm text-slate-400">
          該当するユースケースが見つかりませんでした。
        </div>
      ) : (
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
              {filtered.map((repo) => (
                <div key={repo.id} className="w-[86%] flex-none snap-start">
                  <RepositoryCard repository={repo} />
                </div>
              ))}
            </div>

            {filtered.length > 1 && (
              <div className="mt-3 flex items-center justify-center gap-2">
                {filtered.map((repo, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={repo.id}
                      type="button"
                      aria-label={`スライド${idx + 1}`}
                      aria-current={isActive}
                      onClick={() => {
                        const el = carouselRef.current;
                        if (!el) return;
                        const items = Array.from(
                          el.children
                        ) as HTMLElement[];
                        const target = items[idx];
                        if (!target) return;
                        el.scrollTo({
                          left: target.offsetLeft,
                          behavior: "smooth",
                        });
                      }}
                      className={[
                        "h-1.5 rounded-full transition-all duration-300",
                        isActive
                          ? "w-2.5 bg-blue-600"
                          : "w-1.5 bg-slate-300",
                      ].join(" ")}
                    />
                  );
                })}
              </div>
            )}
          </div>

          {/* Desktop: グリッド */}
          <div className="hidden gap-4 sm:grid sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {filtered.map((repo) => (
              <RepositoryCard key={repo.id} repository={repo} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
