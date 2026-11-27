import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { LenisProvider } from "@/components/providers/LenisProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://omnipulse.io"),
  icons: {
    icon: [
      { url: "/omnipulse-favicon.svg?v=2", type: "image/svg+xml" },
      { url: "/favicon-32x32.png?v=2", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png?v=2", sizes: "192x192", type: "image/png" },
    ],
    shortcut: ["/favicon-32x32.png?v=2"],
    apple: [
      { url: "/apple-touch-icon.png?v=2", sizes: "180x180", type: "image/png" },
    ],
  },
  title: {
    default:
      "OmniPulse • White-Label Agency Operations, Automated Local Ads & Enterprise CRM Analytics",
    template: "%s | OmniPulse",
  },
  description:
    "Scale marketing agencies with white-label client portals, power automated lead generation and hands-off local ads for local businesses, and deliver absolute data ownership, CRM syncing, and deep analytics for global brands.",
  keywords: [
    "white-label client portals",
    "marketing agency scaling software",
    "automated lead generation",
    "hands-off local ads",
    "absolute data ownership",
    "CRM syncing marketing analytics",
    "deep multi-channel analytics",
    "Google Ads MCC orchestration",
    "multi-tenant agency console",
    "programmatic SEO audit software",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://omnipulse.io",
    siteName: "OmniPulse",
    title:
      "OmniPulse • White-Label Client Portals, Automated Local Lead Gen & Enterprise Analytics",
    description:
      "The unified marketing operations platform built for scaling marketing agencies, hands-off local business ad automation, and global brands demanding zero-knowledge data ownership and bidirectional CRM syncing.",
  },
  twitter: {
    card: "summary_large_image",
    title: "OmniPulse • Marketing Operations for Agencies, Local Businesses & Global Brands",
    description:
      "White-label client portals, automated local ads lead generation, bidirectional CRM syncing, and deep Google & Meta analytics.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-white dark:bg-[#0A0A0A] text-zinc-900 dark:text-zinc-100 transition-colors selection:bg-indigo-500/20 selection:text-indigo-600 dark:selection:text-indigo-300">
        <ThemeProvider>
          <LenisProvider>{children}</LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
