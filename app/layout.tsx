import type { Metadata } from "next";
import { Spectral, Inter, Fira_Code } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 Grave",
  description: "모든 무덤에는 이야기가 있다. 당신의 실패한 프로젝트 이야기. 404-Grave",
};

// 묘지 테마 타이포그래피 시스템
const spectral = Spectral({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-spectral",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-fira-code",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark">
      <body
        className={`${spectral.variable} ${inter.variable} ${firaCode.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
