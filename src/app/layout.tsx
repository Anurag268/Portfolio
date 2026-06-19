import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getPortfolio } from "@/app/actions/portfolio";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const portfolio = await getPortfolio();
  return {
    title: `${portfolio.hero.name} | ${portfolio.hero.title}`,
    description: portfolio.hero.valueProposition,
    openGraph: {
      title: `${portfolio.hero.name} | Portfolio`,
      description: portfolio.hero.valueProposition,
      url: "https://anuragsingh.dev",
      siteName: `${portfolio.hero.name} Portfolio`,
      type: "website",
    },
  };
}

import Tracker from "@/components/Tracker";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const portfolio = await getPortfolio();
  
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-primary/30`}
      >
        <Tracker />
        {children}
      </body>
    </html>
  );
}
