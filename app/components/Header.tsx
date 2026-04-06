"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ExternalLink, ChevronDown } from "lucide-react";

type HeaderProps = {
  /** false のとき常に背景付き（透過しない） */
  transparent?: boolean;
};

const roadmapThemes = [
  { name: "汎用生成AI活用の基礎", href: "/roadmap/ai-general" },
  { name: "Cursor活用の基礎", href: "/roadmap/cursor" },
  { name: "ウェブマーケティング", href: "/roadmap/web-marketing" },
  { name: "経理サポート", href: "/roadmap/accounting" },
  { name: "営業・提案活動", href: "/roadmap/sales" },
  { name: "契約法務", href: "/roadmap/legal" },
];

export default function Header({ transparent = true }: HeaderProps) {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const shouldBeTransparent = transparent && isAtTop;

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-colors duration-300
        ${shouldBeTransparent ? "bg-transparent" : "bg-white/95 backdrop-blur-md shadow-sm"}
      `}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-9 h-9 overflow-hidden rounded-lg">
              <Image
                src="/images/brand/logo.png"
                alt="tAiL. Legal Office Logo"
                width={36}
                height={36}
                className="transition-transform duration-300 group-hover:scale-110"
                priority
              />
            </div>
            <span
              className={`text-lg font-bold whitespace-nowrap transition-colors duration-300 ${
                shouldBeTransparent ? "text-white" : "text-blue-900"
              }`}
            >
              tAiL.{" "}
              <span
                className={`font-normal transition-colors duration-300 ${
                  shouldBeTransparent ? "text-white/80" : "text-gray-600"
                }`}
              >
                Members
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 pr-4">

            {/* ホーム */}
            <Link
              href="/"
              className={`text-sm font-normal tracking-wider transition-colors duration-300 ${
                shouldBeTransparent
                  ? "text-white hover:text-white/90"
                  : "text-gray-600 hover:text-emerald-600"
              }`}
            >
              ホーム
            </Link>

            {/* 実践ユースケース集 */}
            <Link
              href="/repository"
              className={`text-sm font-normal tracking-wider transition-colors duration-300 ${
                shouldBeTransparent
                  ? "text-white hover:text-white/90"
                  : "text-gray-600 hover:text-emerald-600"
              }`}
            >
              実践ユースケース集
            </Link>

            {/* 導入ロードマップ（CSS onlyドロップダウン） */}
            <div className="group/dd relative flex items-center">
              <Link
                href="/roadmap"
                className={`flex items-center gap-1 text-sm font-normal tracking-wider transition-colors duration-300 ${
                  shouldBeTransparent
                    ? "text-white hover:text-white/90"
                    : "text-gray-600 hover:text-emerald-600"
                }`}
              >
                導入ロードマップ
                <ChevronDown
                  size={14}
                  className="transition-transform duration-200 group-hover/dd:rotate-180"
                />
              </Link>

              {/* ドロップダウン — group-hover で表示 */}
              <div className="pointer-events-none absolute left-1/2 top-full z-[60] -translate-x-1/2 pt-2 opacity-0 transition-all duration-200 group-hover/dd:pointer-events-auto group-hover/dd:opacity-100 group-hover/dd:translate-y-0 -translate-y-1">
                <div className="w-56 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
                  <div className="border-b border-gray-50 px-4 py-2.5">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                      Themes
                    </p>
                  </div>
                  <ul className="py-1">
                    {roadmapThemes.map((theme, i) => (
                      <li key={i}>
                        <Link
                          href={theme.href}
                          className="flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 transition-colors duration-150 hover:bg-gray-50 hover:text-cyan-600"
                        >
                          <span>{theme.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-gray-50 px-4 py-2.5">
                    <Link
                      href="/roadmap"
                      className="flex items-center gap-1 text-xs font-semibold text-cyan-600 hover:text-cyan-700"
                    >
                      すべてのテーマを見る
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* 書式一覧 */}
            <Link
              href="/formats"
              className={`text-sm font-normal tracking-wider transition-colors duration-300 ${
                shouldBeTransparent
                  ? "text-white hover:text-white/90"
                  : "text-gray-600 hover:text-emerald-600"
              }`}
            >
              書式一覧
            </Link>

            {/* 本体サイト */}
            <a
              href="https://tail-legal.jp"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1 text-sm font-normal tracking-wider transition-colors duration-300 ${
                shouldBeTransparent
                  ? "text-white/70 hover:text-white/90"
                  : "text-gray-400 hover:text-emerald-600"
              }`}
            >
              本体サイト
              <ExternalLink size={12} />
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            className={`md:hidden p-2 rounded-lg transition-colors duration-200 ${
              shouldBeTransparent
                ? "text-white hover:bg-white/10"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="メニューを開閉"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-white/95 backdrop-blur-md shadow-xl border-t border-gray-200 z-40">
          <nav className="flex flex-col py-2 max-h-[calc(100vh-5rem)] overflow-y-auto">
            <Link
              href="/"
              className="border-b border-gray-100/50 px-6 py-4 font-medium text-gray-700 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              ホーム
            </Link>
            <Link
              href="/repository"
              className="border-b border-gray-100/50 px-6 py-4 font-medium text-gray-700 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              実践ユースケース集
            </Link>

            {/* モバイル：ロードマップ + テーマ一覧 */}
            <div className="border-b border-gray-100/50">
              <Link
                href="/roadmap"
                className="flex items-center justify-between px-6 py-4 font-medium text-gray-700 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                導入ロードマップ
              </Link>
              <ul className="border-t border-gray-50 bg-gray-50/60">
                {roadmapThemes.map((theme, i) => (
                  <li key={i}>
                    <Link
                      href={theme.href}
                      className="flex items-center justify-between px-8 py-3 text-sm text-gray-600 transition-colors duration-150 hover:text-cyan-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span>{theme.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/formats"
              className="border-b border-gray-100/50 px-6 py-4 font-medium text-gray-700 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              書式一覧
            </Link>

            <a
              href="https://tail-legal.jp"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 border-t border-gray-100/50 px-6 py-4 font-medium text-gray-400 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              本体サイト
              <ExternalLink size={12} />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
