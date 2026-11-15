import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Pricing Plans • Starter 7-Day Free Trial, White-Label Agency Pro & Global Enterprise",
  description:
    "Compare OmniPulse plans for local businesses seeking hands-off local ads and automated lead generation, marketing agencies scaling white-label client portals, and global brands demanding absolute data ownership, CRM syncing, and deep analytics.",
  keywords: [
    "marketing agency software pricing",
    "white-label client portal pricing",
    "automated local business ads pricing",
    "7-day free trial Starter marketing suite",
    "enterprise CRM syncing data ownership plan",
    "Google Ads MCC management pricing",
  ],
  openGraph: {
    type: "website",
    url: "https://omnipulse.io/pricing",
    siteName: "OmniPulse",
    title:
      "OmniPulse Pricing • 7-Day Starter Free Trial, White-Label Agency Scaling & Enterprise",
    description:
      "Start your 7-day free trial on Starter for automated local ads, upgrade to Agency Pro for unlimited white-label client portals, or deploy Enterprise with full CRM syncing and absolute data ownership.",
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
