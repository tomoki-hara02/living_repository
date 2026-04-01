"use client";

import Image from "next/image";
import { useState } from "react";

type Theme = {
  index: string;
  category: string;
  title: string;
  benefit: string;
  description: string;
  image?: string;
  gradient: string;
  accentColor: string;
  badge: string;
  href?: string;
};

const themes: Theme[] = [
  {
    index: "01",
    category: "AI General",
    title: "汎用生成AI活用の基礎",
    benefit: "ChatGPT・Claude・Geminiを使いこなし、業務効率化の土台を作る",
    description:
      "主要生成AIツールの特徴比較から、効果的なプロンプト設計・情報収集・文書作成への応用・業務フローへの組み込み・社内AI活用ルール整備まで、AI活用の基礎を体系的に学ぶロードマップ。",
    image: "/images/roadmap-themes/AI General.png",
    gradient: "from-purple-100 via-violet-50 to-fuchsia-100",
    accentColor: "text-purple-600",
    badge: "公開中",
    href: "/roadmap/ai-general",
  },
  {
    index: "02",
    category: "Cursor",
    title: "Cursor活用の基礎",
    benefit: "AIコードエディタCursorで、ノンエンジニアでもWebサイトを内製化",
    description:
      "Cursorの基本操作・チャット・Composer・MCP活用まで、プログラミング未経験でもAIとの対話でWebサイトやツールを作成できるようになるロードマップ。",
    image: "/images/roadmap-themes/Cursor.png",
    gradient: "from-slate-200 via-gray-100 to-sky-100",
    accentColor: "text-sky-700",
    badge: "公開中",
    href: "/roadmap/cursor",
  },
  {
    index: "03",
    category: "Web Marketing",
    title: "ウェブマーケティング",
    benefit: "ウェブ構築、分析～コンテンツ更新までを生成AIで丸ごと自動化",
    description:
      "自社のウェブマーケにおける基本的な情報収集から、最新の自社ウェブサイトの内製化、サイトの分析から、コンテンツの自動更新で営業戦略に貢献するロードマップ。",
    image: "/images/roadmap-themes/Web Marketing Analytics.png",
    gradient: "from-sky-100 via-cyan-50 to-blue-100",
    accentColor: "text-cyan-600",
    badge: "公開中",
    href: "/roadmap/web-marketing",
  },
  {
    index: "04",
    category: "Estimate & Accounting",
    title: "経理サポート",
    benefit: "見積書・請求書の作成から経費管理まで、経理業務をAIで効率化",
    description:
      "見積書・請求書の自動生成・経費レポート作成・会計ソフトへのデータ連携・月次レポート自動化まで、管理部門の定型業務を大幅に削減するロードマップ。",
    image: "/images/roadmap-themes/Estimate Accounting.png",
    gradient: "from-amber-100 via-yellow-50 to-orange-100",
    accentColor: "text-amber-600",
    badge: "公開中",
    href: "/roadmap/accounting",
  },
  {
    index: "05",
    category: "Sales & Proposal",
    title: "営業・提案活動",
    benefit: "提案資料の作成から商談フォローまで、営業活動をAIがまるごと支援",
    description:
      "顧客情報の整理・提案書や営業メールの自動生成・商談メモの要約・CRMへの自動入力まで、営業チームの生産性を飛躍的に向上させるロードマップ。",
    image: "/images/roadmap-themes/Sales Proposal.png",
    gradient: "from-violet-100 via-purple-50 to-indigo-100",
    accentColor: "text-violet-600",
    badge: "公開中",
    href: "/roadmap/sales",
  },
  {
    index: "06",
    category: "Contract & Legal",
    title: "契約法務",
    benefit: "契約書レビューから社内規程整備まで、法務業務をAIでサポート",
    description:
      "契約書のリスク抽出・条項の自動チェック・社内規程のドラフト生成・法令調査の補助まで、法務担当者の負荷を下げながらコンプライアンスを強化するロードマップ。",
    image: "/images/roadmap-themes/Contract Legal.png",
    gradient: "from-slate-100 via-gray-50 to-blue-100",
    accentColor: "text-slate-600",
    badge: "公開中",
    href: "/roadmap/legal",
  },
];

export default function RoadmapThemeCards() {
  const [active, setActive] = useState(0);
  const theme = themes[active];
  const isLive = theme.badge === "公開中";

  return (
    <section
      className="py-16 sm:py-24"
      style={{ background: "linear-gradient(160deg, #f0f9ff 0%, #e0f2fe 40%, #f0fdfa 100%)" }}
    >
      <div className="container mx-auto px-4 sm:px-6">

        {/* セクション見出し */}
        <div className="mb-10 sm:mb-14">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600">
            Themes
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            テーマを選ぶ
          </h2>
          <div className="mt-5 h-px bg-gray-100" />
        </div>

        {/* メインカード */}
        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-md">
          <div className="grid min-h-[420px] lg:grid-cols-2">

            {/* 左：テキスト */}
            <div className="flex flex-col justify-between p-8 sm:p-10 lg:p-14">
              <div>
                {/* ラベル */}
                <div className="mb-6 flex items-center gap-2">
                  <span className="text-xs font-bold tracking-widest text-gray-300">
                    {theme.index}
                  </span>
                  <span className="h-px w-6 bg-gray-200" />
                  <span className={`text-xs font-semibold uppercase tracking-widest ${theme.accentColor}`}>
                    {theme.category}
                  </span>
                  {/* バッジ */}
                  <span
                    className={`ml-auto rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                      isLive
                        ? "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200"
                        : "bg-gray-50 text-gray-400 ring-1 ring-gray-200"
                    }`}
                  >
                    {theme.badge}
                  </span>
                </div>

                {/* タイトル */}
                <h3 className="mb-4 text-2xl font-bold leading-snug tracking-tight text-gray-900 sm:text-3xl">
                  {theme.title}
                </h3>

                {/* メリット */}
                <p className={`mb-4 text-sm font-semibold leading-snug sm:text-base ${theme.accentColor}`}>
                  {theme.benefit}
                </p>

                {/* 説明 */}
                <p className="text-sm leading-relaxed text-gray-500 sm:text-base">
                  {theme.description}
                </p>
              </div>

              {/* CTAボタン */}
              <div className="mt-8">
                {isLive ? (
                  <a
                    href={theme.href}
                    className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-6 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-200 hover:border-cyan-300 hover:text-cyan-600"
                  >
                    ロードマップを見る
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-full border border-gray-100 bg-gray-50 px-6 py-2.5 text-sm font-medium text-gray-300">
                    準備中
                  </span>
                )}
              </div>
            </div>

            {/* 右：ビジュアル */}
            <div className={`relative min-h-[260px] overflow-hidden bg-gradient-to-br ${theme.gradient} lg:min-h-0`}>
              {theme.image ? (
                <Image
                  src={theme.image}
                  alt={theme.title}
                  fill
                  className="object-cover"
                  key={theme.index}
                  unoptimized
                />
              ) : (
                <div className="flex h-full items-center justify-center p-12">
                  <span className="select-none text-6xl font-black tracking-tighter text-white/20 sm:text-8xl">
                    {theme.index}
                  </span>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* ナビゲーション */}
        <div className="mt-8 flex items-center justify-between">
          {/* ドット */}
          <div className="flex items-center gap-2">
            {themes.map((t, i) => (
              <button
                key={t.index}
                onClick={() => setActive(i)}
                aria-label={t.title}
                className={`rounded-full transition-all duration-300 ${
                  i === active
                    ? "h-2 w-6 bg-cyan-500"
                    : "h-2 w-2 bg-gray-200 hover:bg-gray-300"
                }`}
              />
            ))}
          </div>

          {/* 前後ボタン */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActive((prev) => (prev - 1 + themes.length) % themes.length)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-colors duration-200 hover:border-gray-300 hover:text-gray-600 disabled:opacity-30"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={() => setActive((prev) => (prev + 1) % themes.length)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-colors duration-200 hover:border-gray-300 hover:text-gray-600"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
