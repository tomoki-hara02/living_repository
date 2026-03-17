"use client";

import { useState } from "react";
import type { Level } from "@/app/lib/types";

export interface FilterState {
  models: string[];
  laws: string[];
  level: Level | null;
}

interface TagFilterProps {
  allModels: string[];
  allLaws: string[];
  allLevels: Level[];
  onFilterChange: (filter: FilterState) => void;
}

const levelGradient: Record<Level, string> = {
  Beginner: "linear-gradient(135deg, #3b82f6, #06b6d4)",
  Standard: "linear-gradient(135deg, #10b981, #06b6d4)",
  Advanced: "linear-gradient(135deg, #f59e0b, #ef4444)",
};

export default function TagFilter({
  allModels,
  allLaws,
  allLevels,
  onFilterChange,
}: TagFilterProps) {
  const [filter, setFilter] = useState<FilterState>({
    models: [],
    laws: [],
    level: null,
  });

  const update = (next: FilterState) => {
    setFilter(next);
    onFilterChange(next);
  };

  const toggleModel = (m: string) => {
    const models = filter.models.includes(m)
      ? filter.models.filter((x) => x !== m)
      : [...filter.models, m];
    update({ ...filter, models });
  };

  const toggleLaw = (l: string) => {
    const laws = filter.laws.includes(l)
      ? filter.laws.filter((x) => x !== l)
      : [...filter.laws, l];
    update({ ...filter, laws });
  };

  const toggleLevel = (lv: Level) => {
    update({ ...filter, level: filter.level === lv ? null : lv });
  };

  const clearAll = () => {
    update({ models: [], laws: [], level: null });
  };

  const hasFilter =
    filter.models.length > 0 || filter.laws.length > 0 || filter.level !== null;

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* 使用モデル */}
      <div>
        <div className="mb-2 flex items-center gap-2">
          <div className="h-0.5 w-6 rounded-full" style={{ background: "linear-gradient(to right, #3b82f6, #06b6d4)" }} />
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
            Models &amp; Services
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {allModels.map((m) => {
            const active = filter.models.includes(m);
            return (
              <button
                key={m}
                onClick={() => toggleModel(m)}
                className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition-all sm:px-3 sm:text-xs ${
                  active
                    ? "border-blue-200 bg-blue-50 text-blue-700"
                    : "border-gray-200 bg-gray-50 text-gray-400 hover:border-gray-300 hover:text-gray-500"
                }`}
              >
                {m}
              </button>
            );
          })}
        </div>
      </div>

      {/* 関連法令 */}
      <div>
        <div className="mb-2 flex items-center gap-2">
          <div className="h-0.5 w-6 rounded-full" style={{ background: "linear-gradient(to right, #ec4899, #ef4444, #f59e0b)" }} />
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
            Legal Considerations
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {allLaws.map((l) => {
            const active = filter.laws.includes(l);
            return (
              <button
                key={l}
                onClick={() => toggleLaw(l)}
                className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition-all sm:px-3 sm:text-xs ${
                  active
                    ? "border-pink-200 bg-pink-50 text-pink-700"
                    : "border-gray-200 bg-gray-50 text-gray-400 hover:border-gray-300 hover:text-gray-500"
                }`}
              >
                {l}
              </button>
            );
          })}
        </div>
      </div>

      {/* レベル */}
      <div>
        <div className="mb-2 flex items-center gap-2">
          <div className="h-0.5 w-6 rounded-full" style={{ background: "linear-gradient(to right, #10b981, #06b6d4, #3b82f6)" }} />
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
            Difficulty
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {allLevels.map((lv) => {
            const active = filter.level === lv;
            return (
              <button
                key={lv}
                onClick={() => toggleLevel(lv)}
                className={`rounded-full border px-2.5 py-1 text-[11px] transition-all sm:px-3 sm:text-xs ${
                  active ? "border-transparent font-bold text-white" : "border-gray-200 bg-gray-50 font-medium text-gray-400 hover:border-gray-300 hover:text-gray-500"
                }`}
                style={active ? { background: levelGradient[lv] } : undefined}
              >
                {lv}
              </button>
            );
          })}
        </div>
      </div>

      {/* リセット */}
      {hasFilter && (
        <button
          onClick={clearAll}
          className="text-xs text-slate-400 underline underline-offset-2 transition-colors hover:text-slate-600"
        >
          フィルターをリセット
        </button>
      )}
    </div>
  );
}
