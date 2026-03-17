import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "アニメスケジュール JP - 配信スケジュール",
  description:
    "日本の配信プラットフォームのアニメ週間スケジュール。DMM TV、Netflix、ABEMAなどの配信時間を確認できます。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-text-primary`}
      >
        <header className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 shadow-lg">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
            <a href="/" className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-white drop-shadow-md">
              アニメスケジュール JP
            </a>
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
              2026年冬
            </span>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
