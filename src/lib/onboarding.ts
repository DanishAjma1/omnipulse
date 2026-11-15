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
    name: "Starter",
    monthlyPrice: 49,
    tagline: "For boutique agencies up to 5 accounts",
    highlights: ["5 Google & Meta accounts", "Daily metric sync", "1 Branded client portal"],
  },
  {
    id: "AGENCY_PRO",
    name: "Agency Pro",
    monthlyPrice: 149,
    tagline: "Real-time MCC sync & unlimited portals",
    badge: "Most Popular",
    highlights: ["Unlimited ad accounts", "15s MCC telemetry sync", "White-label CNAME portals"],
  },
  {
    id: "ENTERPRISE",
    name: "Enterprise",
    monthlyPrice: 499,
    tagline: "Multi-MCC clustering & custom SLAs",
    highlights: ["Dedicated token isolation", "Multi-MCC clustering", "99.99% uptime SLA"],
  },
];

export interface OnboardingDraft {
  step: 1 | 2 | 3;
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
  planTier: "AGENCY_PRO",
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
