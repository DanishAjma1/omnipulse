import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation & Agency Console Guide",
  description:
    "Interactive scroll-story guide and module documentation for the OmniPulse Agency Console: Google Ads MCC orchestration, 3-Tier Campaign Studio, 400vh+ Scroll-Story Funnels, Worker-Thread SEO Audits, Resend Outreach, and Admin/Manager/Client RBAC.",
  openGraph: {
    title: "OmniPulse Documentation & Interactive Console Playbook",
    description:
      "Master every Agency Console workflow—from AES-256-GCM BYOK onboarding and Google Ads MCC syncing to Scroll-Story Funnels, SEO crawlers, and rationed Client Portals.",
    url: "https://omnipulse.io/docs",
  },
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
