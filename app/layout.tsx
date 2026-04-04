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
    "tAiL.法律事務所が提供する生成AI活用ユースケース集。法務・ビジネスにおけるAI活用の実践的なガイドを掲載しています。",
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
