import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security, Zero-Knowledge Vault & System Trust",
  description:
    "Inspect OmniPulse security architecture: AES-256-GCM zero-knowledge API token encryption, strict multi-tenant PostgreSQL isolation, Admin/Manager/Client RBAC guardrails, sandboxed funnel rendering, and 99.99% API uptime.",
  openGraph: {
    title: "OmniPulse Security • Zero-Knowledge Encryption & Multi-Tenant Isolation",
    description:
      "Built for agencies and global brands managing high-spend Google Ads MCC and Meta portfolios with absolute data ownership.",
    url: "https://omnipulse.io/security",
  },
};

export default function SecurityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
