"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ExternalLink } from "lucide-react";

const navigation = [
  { name: "ホーム", href: "/" },
  { name: "リポジトリ一覧", href: "/#repositories" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const pathname = usePathname();

  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const shouldBeTransparent = isHome && scrollY < 10;

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
              className={`text-lg font-bold whitespace-nowrap ${
                shouldBeTransparent ? "text-white" : "text-blue-900"
              }`}
            >
              tAiL.{" "}
              <span
                className={`font-normal ${
                  shouldBeTransparent ? "text-white/80" : "text-gray-600"
                }`}
              >
                Legal Office
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 pr-4">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-normal tracking-wider transition-colors duration-300 ${
                  shouldBeTransparent
                    ? "text-white hover:text-white/90"
                    : "text-gray-600 hover:text-emerald-600"
                }`}
              >
                {item.name}
              </Link>
            ))}
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
              tail-legal.jp
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
            {navigation.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-6 py-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 font-medium ${
                  index < navigation.length - 1
                    ? "border-b border-gray-100/50"
                    : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <a
              href="https://tail-legal.jp"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 font-medium flex items-center gap-1 border-t border-gray-100/50"
              onClick={() => setIsMenuOpen(false)}
            >
              tail-legal.jp
              <ExternalLink size={12} />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
