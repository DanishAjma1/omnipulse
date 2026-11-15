import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start Your 7-Day Free Trial • Multi-Tenant Workspace Provisioning",
  description:
    "Launch your isolated OmniPulse workspace in minutes. Start with our 7-day Starter free trial backed by AES-256-GCM Google Ads Developer Token encryption and instant white-label provisioning.",
  openGraph: {
    type: "website",
    url: "https://omnipulse.io/register",
    siteName: "OmniPulse",
    title: "Register on OmniPulse • Launch Your Marketing Operations Workspace",
    description:
      "Verify your work email, encrypt your Google Ads MCC credentials, and activate your 7-day free trial on the Starter plan.",
  },
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
