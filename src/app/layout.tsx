import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Quizee",
  description: "さくさく解けるクイズアプリ",
  openGraph: {
    title: "Quizee",
    description: "さくさく解けるクイズアプリ",
    images: [
      {
        url: "https://quiz-ee.vercel.app/quizee-ogp.png",
        alt: "Quizee",
        width: 1200,
        height: 630,
      },
    ],
    siteName: "Quizee",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
