import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free BYOK Access • Multi-Tenant Workspace",
  description:
    "Launch your free BYOK OmniPulse workspace with your own Google Ads Developer Token, MCC Account ID, and Gemini API key.",
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
