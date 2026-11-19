export type PlanTier = "STARTER" | "AGENCY_PRO" | "ENTERPRISE";

export interface OnboardingTier {
  id: PlanTier;
  name: string;
  monthlyPrice: number;
  tagline: string;
  badge?: string;
  highlights: string[];
}

export const ONBOARDING_TIERS: OnboardingTier[] = [
  {
    id: "STARTER",
    name: "Starter Plan",
    monthlyPrice: 19,
    tagline: "Perfect for Solo Freelancers & New Agencies",
    highlights: ["5 Client Accounts & Portals", "10 AI Campaigns/mo & 3 SEO/day", "200 Emails/day & 3 Funnels/wk"],
  },
  {
    id: "AGENCY_PRO",
    name: "Agency Growth Plan",
    monthlyPrice: 49,
    tagline: "For Scaling Teams with custom portal domains",
    badge: "Most Popular",
    highlights: ["20 Client Accounts & Portals", "50 AI Campaigns/mo & 15 SEO/day", "1,000 Emails/day & 15 Funnels/wk"],
  },
  {
    id: "ENTERPRISE",
    name: "Enterprise Scale Plan",
    monthlyPrice: 99,
    tagline: "Unlimited operations & full white-labeling",
    highlights: ["Unlimited Clients, Portals & Funnels", "50 SEO/day & 5,000 Emails/day", "Full White-Label & Slack Support"],
  },
];

export interface OnboardingDraft {
  step: 1 | 2;
  email: string;
  otpSent: boolean;
  otpVerified: boolean;
  verificationToken: string;
  fullName: string;
  companyName: string;
  password: string;
  confirmPassword: string;
  mccId: string;
  developerToken: string;
  geminiApiKey: string;
  planTier: PlanTier;
}

export const DEFAULT_ONBOARDING_DRAFT: OnboardingDraft = {
  step: 1,
  email: "",
  otpSent: false,
  otpVerified: false,
  verificationToken: "",
  fullName: "",
  companyName: "",
  password: "",
  confirmPassword: "",
  mccId: "",
  developerToken: "",
  geminiApiKey: "",
  planTier: "STARTER",
};

export const ONBOARDING_STORAGE_KEY = "omnipulse_onboarding_v1";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ||
  "http://localhost:4100/api/v1";

export interface StripeSetupSession {
  mode: "stripe" | "sandbox";
  publishableKey: string | null;
  customerId: string;
  setupIntentId: string;
  clientSecret: string | null;
  planTier: PlanTier;
  trialDays: number;
}

export async function postOnboardingApi<T>(
  path: string,
  payload: unknown
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const json = (await res.json().catch(() => null)) as {
    success?: boolean;
    message?: string;
    data?: T;
  } | null;

  if (!res.ok || !json?.success) {
    throw new Error(json?.message || `Request failed (${res.status})`);
  }

  return json.data as T;
}
