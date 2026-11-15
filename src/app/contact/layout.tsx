import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Solutions Engineering • Multi-MCC, CRM Sync & White-Label Setup",
  description:
    "Connect with OmniPulse solutions architects to configure white-label client portals, local lead automation pipelines, or enterprise CRM syncing and BigQuery data ownership.",
  openGraph: {
    type: "website",
    url: "https://omnipulse.io/contact",
    siteName: "OmniPulse",
    title: "Contact OmniPulse • Solutions Engineering & Enterprise Onboarding",
    description:
      "Speak directly with our solutions engineers about Google Ads MCC scaling, custom CNAME white-label portals, and enterprise data ownership.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
