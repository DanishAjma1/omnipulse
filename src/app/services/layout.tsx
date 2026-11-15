import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Services & Platform Architecture • White-Label Portals, Local Ad Automation & CRM Analytics",
  description:
    "Explore OmniPulse architecture: white-label client portals for scaling marketing agencies, hands-off local ads and automated lead generation for local businesses, and encrypted data ownership with bidirectional CRM syncing and deep analytics for global brands.",
  keywords: [
    "white-label agency software",
    "client reporting portals custom CNAME",
    "automated local ads platform",
    "hands-off local lead generation",
    "bidirectional CRM syncing HubSpot BigQuery",
    "enterprise marketing data ownership",
    "deep multi-channel ad analytics",
    "Google Ads MCC API orchestration",
  ],
  openGraph: {
    type: "website",
    url: "https://omnipulse.io/services",
    siteName: "OmniPulse",
    title:
      "OmniPulse Services • White-Label Portals, Automated Local Ads & Enterprise Data Ownership",
    description:
      "Built for marketing agencies scaling client retainers, local businesses automating geo-targeted leads, and global enterprises needing full CRM syncing and deep ROAS telemetry.",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
