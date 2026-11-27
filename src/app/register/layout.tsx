import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Launch Your Free BYOK Workspace • Multi-Tenant Workspace Provisioning",
  description:
    "Launch your free isolated OmniPulse workspace in minutes. Bring your own Google Ads MCC, Developer Token, and Gemini API key with AES-256-GCM encryption and instant tenant isolation.",
  openGraph: {
    type: "website",
    url: "https://omnipulse.io/register",
    siteName: "OmniPulse",
    title: "Register on OmniPulse • Launch Your Free Marketing Operations Workspace",
    description:
      "Verify your work email, encrypt your Google Ads & Gemini BYOK credentials, and launch your free multi-tenant workspace.",
  },
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
