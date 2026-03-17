import Link from "next/link";

const mainNavigation = [
  { name: "ホーム", href: "/" },
  { name: "リポジトリ一覧", href: "/#repositories" },
  { name: "tail-legal.jp", href: "https://tail-legal.jp" },
];

const businessHours = {
  weekday: "平日 10:00～17:00",
  weekend: "土日祝：要相談",
};

export default function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 mb-6 md:grid-cols-2">
          {/* メインメニュー */}
          <div>
            <h3 className="text-base font-semibold text-white mb-4 flex items-center">
              <svg className="w-4 h-4 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
              メインメニュー
            </h3>
            <ul className="space-y-2">
              {mainNavigation.map((item) => {
                const isExternal = item.href.startsWith("http");
                const LinkTag = isExternal ? "a" : Link;
                const extraProps = isExternal
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {};
                return (
                  <li key={item.href}>
                    <LinkTag
                      href={item.href}
                      className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center"
                      {...extraProps}
                    >
                      <span className="w-1 h-1 bg-blue-500 rounded-full mr-2" />
                      {item.name}
                    </LinkTag>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* 営業時間 */}
          <div>
            <h3 className="text-base font-semibold text-white mb-4 flex items-center">
              <svg className="w-4 h-4 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              営業時間
            </h3>
            <div className="text-sm text-gray-400 space-y-1">
              <p>{businessHours.weekday}</p>
              <p>{businessHours.weekend}</p>
            </div>
          </div>
        </div>

        {/* コピーライト */}
        <div className="border-t border-gray-800 pt-4">
          <div className="flex flex-col items-center justify-center text-xs text-gray-500 md:flex-row md:justify-between">
            <p className="mb-2 md:mb-0">
              &copy; {new Date().getFullYear()} tAiL. Legal Office. All rights reserved.
            </p>
            <p className="text-gray-400">福岡県福岡市中央区桜坂1丁目3-14</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
