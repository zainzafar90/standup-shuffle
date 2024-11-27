import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Standup Shuffle",
  description: "A simple tool to shuffle your standup names",
  openGraph: {
    title: "Standup Shuffle",
    description: "A simple tool to shuffle your standup names",
    type: "website",
    url: "https://standup-shuffle.vercel.app",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Standup Shuffle Preview",
      },
    ],
    siteName: "Standup Shuffle",
  },
  twitter: {
    card: "summary_large_image",
    title: "Standup Shuffle",
    description: "A simple tool to shuffle your standup names",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
