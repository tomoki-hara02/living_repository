import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const notoSansJP = Noto_Sans_JP({
  display: "swap",
  variable: "--font-noto-sans-jp",
  weight: ["100", "300", "400", "500", "700", "900"],
  preload: false,
  fallback: [
    "Hiragino Sans",
    "Hiragino Kaku Gothic ProN",
    "Yu Gothic",
    "YuGothic",
    "Meiryo",
  ],
});

export const metadata: Metadata = {
  title: {
    default: "tAiL. Members | tAiL. Legal Office",
    template: "%s | tAiL. Members",
  },
  description:
    "企業の生成AI導入を支援する実践ポータル。ユースケース集・導入ロードマップ・法務書式をすべて無料でご利用いただけます。",
  icons: {
    icon: "/favicon.ico",
    apple: "/images/brand/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "tAiL. Members",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${notoSansJP.variable} font-sans antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
