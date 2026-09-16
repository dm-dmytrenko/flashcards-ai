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
  title: "Flashcards AI - Instant AI Flashcard Generator & Fast Learning",
  description: "Stop wasting hours making flashcards manually. Type any topic and let AI instantly generate custom study decks. Learn faster with smart spaced repetition.",
  keywords: [
    "AI flashcard generator",
    "fast flashcards",
    "study deck creator",
    "spaced repetition",
    "smart learning app",
    "automated flashcards",
    "exam prep tool"
  ],
  authors: [{ name: "Flashcards AI Team" }],
  openGraph: {
    title: "Flashcards AI - Instant AI Flashcard Generator & Fast Learning",
    description: "Turn any topic into a custom study deck instantly. Review cards, master subjects faster, and keep your progress private.",
    type: "website",
    locale: "en_US",
    siteName: "Flashcards AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flashcards AI - Instant AI Flashcard Generator",
    description: "Type any topic, get instant flashcards, and learn faster.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
