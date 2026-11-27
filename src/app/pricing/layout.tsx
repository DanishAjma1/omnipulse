import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Workspace Editions & Plans • Free BYOK Onboarding, Agency Scale & Enterprise",
  description:
    "Compare OmniPulse workspace editions for local businesses, scaling marketing agencies, and global brands—featuring zero subscription checkout friction, BYOK credential ownership, 400vh+ Scroll-Story Funnels, and white-label client portals.",
  keywords: [
    "marketing agency workspace editions",
    "BYOK Google Ads MCC platform",
    "white-label client portal tiers",
    "automated local business ads workspace",
    "enterprise CRM syncing data ownership",
  ],
  openGraph: {
    type: "website",
    url: "https://omnipulse.io/pricing",
    siteName: "OmniPulse",
    title:
      "OmniPulse Workspace Editions • Free BYOK Launch, Agency Pro & Enterprise",
    description:
      "Launch your encrypted OmniPulse workspace with zero credit card or subscription lock-in.",
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
