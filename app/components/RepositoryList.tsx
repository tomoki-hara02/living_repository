"use client";

import { useState } from "react";
import type { Repository } from "@/app/lib/types";
import { ALL_MODELS, ALL_LAWS, ALL_LEVELS } from "@/app/lib/types";
import TagFilter, { type FilterState } from "./TagFilter";
import SearchBar from "./SearchBar";
import RepositoryCard from "./RepositoryCard";

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "");
}

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

  const filtered = repositories.filter((r) => {
    if (keyword && !matchesKeyword(r, keyword)) return false;
    if (
      filter.models.length > 0 &&
      !filter.models.some((m) => r.models?.includes(m))
    )
      return false;
    if (
      filter.laws.length > 0 &&
      !filter.laws.some((l) => r.laws?.includes(l))
    )
      return false;
    if (filter.level !== null && r.level !== filter.level) return false;
    return true;
  });

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
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {filtered.map((repo) => (
            <RepositoryCard key={repo.id} repository={repo} />
          ))}
        </div>
      )}
    </>
  );
}
