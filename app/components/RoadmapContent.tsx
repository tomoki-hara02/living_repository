"use client";

import { useState } from "react";
import Image from "next/image";
import type { RoadmapStep, Level } from "@/app/lib/types-roadmap";

const LEVEL_STYLE: Record<Level, { label: string; bg: string; text: string; border: string; gradient: string }> = {
  Beginner: {
    label: "Beginner",
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    gradient: "linear-gradient(135deg, #3b82f6, #06b6d4)",
  },
  Standard: {
    label: "Standard",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    gradient: "linear-gradient(135deg, #10b981, #06b6d4)",
  },
  Advanced: {
    label: "Advanced",
    bg: "bg-orange-50",
    text: "text-orange-700",
    border: "border-orange-200",
    gradient: "linear-gradient(135deg, #f59e0b, #ef4444)",
  },
};

const LEVEL_FILTERS: ("ALL" | Level)[] = ["ALL"];

type ViewMode = "gallery" | "list";

// ─── ギャラリーカード（Notion スタイル）───
function GalleryCard({ step }: { step: RoadmapStep }) {
  const lv = LEVEL_STYLE[step.level];
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-white/80 bg-white/80 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer">
      {/* アイキャッチ */}
      <div className="relative h-40 overflow-hidden sm:h-44">
        {step.eyecatch ? (
          <Image
            src={step.eyecatch.url}
            alt={step.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="flex h-full items-center justify-center"
            style={{ background: lv.gradient }}
          >
            <span className="select-none text-6xl font-black text-white/20">
              {String(step.chapterNumber).padStart(2, "0")}
            </span>
          </div>
        )}
      </div>

      {/* タイトル */}
      <div className="px-4 py-3 sm:px-4 sm:py-3">
        <div className="mb-1">
          <span className="text-[10px] font-bold text-gray-300">
            Ch.{String(step.chapterNumber).padStart(2, "0")}
          </span>
        </div>
        <h3 className="text-sm font-semibold leading-snug text-gray-900 sm:text-base">
          {step.title}
        </h3>
      </div>
    </div>
  );
}

// ─── リストカード ───
function ListCard({ step }: { step: RoadmapStep }) {
  const lv = LEVEL_STYLE[step.level];
  return (
    <div className="group overflow-hidden rounded-2xl border border-white/80 bg-white/80 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex gap-0">
        {/* 左：アイキャッチ */}
        <div className="relative w-32 shrink-0 overflow-hidden sm:w-48">
          {step.eyecatch ? (
            <Image
              src={step.eyecatch.url}
              alt={step.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div
              className="flex h-full min-h-[120px] items-center justify-center"
              style={{ background: lv.gradient }}
            >
              <span className="select-none text-3xl font-black text-white/20 sm:text-4xl">
                {String(step.chapterNumber).padStart(2, "0")}
              </span>
            </div>
          )}
        </div>

        {/* 右：テキスト */}
        <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <div
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-extrabold text-white"
                style={{ background: lv.gradient }}
              >
                {step.chapterNumber}
              </div>
              <span className={`rounded-md border px-2 py-0.5 text-[11px] font-bold ${lv.bg} ${lv.text} ${lv.border}`}>
                {lv.label}
              </span>
              <h3 className="text-sm font-bold text-gray-900 sm:text-base">{step.title}</h3>
            </div>
            <p className="mb-3 text-xs leading-relaxed text-gray-500 sm:text-sm line-clamp-2">
              {step.summary}
            </p>
            <div className="flex flex-wrap gap-1">
              {step.tools.map((t) => (
                <span key={t} className="rounded-full border border-blue-100 bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-600">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Legal hint */}
          <div className="mt-3 flex items-start gap-1.5 rounded-lg border border-amber-100 bg-amber-50/60 px-3 py-2">
            <svg className="mt-0.5 h-3 w-3 shrink-0 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
            </svg>
            <p className="text-[10px] leading-relaxed text-amber-700 line-clamp-1 sm:line-clamp-none">{step.legalNote}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── メインコンポーネント ───
export default function RoadmapContent({ steps }: { steps: RoadmapStep[] }) {
  const [view, setView] = useState<ViewMode>("gallery");
  const [levelFilter, setLevelFilter] = useState<"ALL" | Level>("ALL");

  const filtered = levelFilter === "ALL"
    ? steps
    : steps.filter((s) => s.level === levelFilter);

  return (
    <div>
      {/* コントロールバー */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        {/* レベルフィルター */}
        <div className="flex flex-wrap gap-2">
          {LEVEL_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setLevelFilter(f)}
                className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
                levelFilter === f
                  ? "border-cyan-500 bg-cyan-500 text-white"
                  : "border-white/80 bg-white/70 text-gray-500 backdrop-blur-sm hover:border-white hover:bg-white hover:text-gray-700"
              }`}
            >
              {f === "ALL" ? "すべて" : f}
              <span className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] ${
                levelFilter === f ? "bg-white/20 text-white" : "bg-gray-100 text-gray-400"
              }`}>
                {f === "ALL" ? steps.length : steps.filter((s) => s.level === f).length}
              </span>
            </button>
          ))}
        </div>

        {/* ビュートグル */}
        <div className="flex items-center gap-1 rounded-lg border border-white/80 bg-white/70 p-1 backdrop-blur-sm">
          <button
            onClick={() => setView("gallery")}
            title="ギャラリー表示"
            className={`rounded-md p-1.5 transition-colors duration-200 ${
              view === "gallery" ? "bg-gray-100 text-gray-900" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {/* グリッドアイコン */}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
            </svg>
          </button>
          <button
            onClick={() => setView("list")}
            title="リスト表示"
            className={`rounded-md p-1.5 transition-colors duration-200 ${
              view === "list" ? "bg-gray-100 text-gray-900" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {/* リストアイコン */}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
          </button>
        </div>
      </div>

      {/* コンテンツ */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center text-sm text-gray-400">
          該当するチャプターがありません
        </div>
      ) : view === "gallery" ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((step) => (
            <GalleryCard key={step.id} step={step} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((step) => (
            <ListCard key={step.id} step={step} />
          ))}
        </div>
      )}
    </div>
  );
}
