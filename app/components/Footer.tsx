import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

const navigation = [
  { name: "ホーム", href: "/" },
  { name: "実践ユースケース集", href: "/repository" },
  { name: "導入ロードマップ", href: "/roadmap" },
  { name: "法務/書式", href: "/formats" },
];

const roadmapThemes = [
  { name: "汎用生成AI活用の基礎", href: "/roadmap/ai-general" },
  { name: "Cursor活用の基礎", href: "/roadmap/cursor" },
  { name: "ウェブマーケティング", href: "/roadmap/web-marketing" },
  { name: "経理サポート", href: "/roadmap/accounting" },
  { name: "営業・提案活動", href: "/roadmap/sales" },
  { name: "契約法務", href: "/roadmap/legal" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="container mx-auto px-4 py-12 sm:py-16">

        {/* 上段 */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* ブランド */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-9 w-9 overflow-hidden rounded-lg">
                <Image
                  src="/images/brand/logo.png"
                  alt="tAiL. Legal Office Logo"
                  width={36}
                  height={36}
                />
              </div>
              <span className="text-base font-bold text-white">
                tAiL.{" "}
                <span className="font-normal text-gray-400">Members</span>
              </span>
            </Link>
            <p className="mt-4 text-xs leading-relaxed text-gray-500">
              生成AI活用に必要な実践ユースケース、導入ロードマップ、法務解説・規程など幅広いリーガル情報を一元提供するメンバー向けポータルです。
            </p>
            <a
              href="https://tail-legal.jp"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1 text-xs text-gray-500 transition-colors hover:text-blue-400"
            >
              本体サイト
              <ExternalLink size={11} />
            </a>
          </div>

          {/* メインナビ */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400">
              Menu
            </h3>
            <ul className="space-y-2.5">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-blue-400"
                  >
                    <span className="h-1 w-1 rounded-full bg-blue-600" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ロードマップテーマ */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400">
              Roadmap Themes
            </h3>
            <ul className="space-y-2.5">
              {roadmapThemes.map((theme) => (
                <li key={theme.href}>
                  <Link
                    href={theme.href}
                    className="flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-blue-400"
                  >
                    <span className="h-1 w-1 rounded-full bg-cyan-600" />
                    {theme.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 営業情報 */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400">
              Office
            </h3>
            <div className="space-y-2 text-sm text-gray-500">
              <p>tAiL. 法律事務所</p>
              <p>福岡県福岡市中央区<br />桜坂1丁目3-14</p>
              <p className="pt-1">平日 10:00〜17:00</p>
              <p>土日祝：要相談</p>
            </div>
          </div>

        </div>

        {/* 下段 */}
        <div className="mt-12 border-t border-gray-800 pt-6">
          <div className="flex flex-col items-center justify-between gap-2 text-xs text-gray-600 sm:flex-row">
            <p>&copy; {new Date().getFullYear()} tAiL. Legal Office. All rights reserved.</p>
            <a
              href="https://tail-legal.jp"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 transition-colors hover:text-gray-400"
            >
              tail-legal.jp
              <ExternalLink size={10} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
