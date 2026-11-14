import { MotionValue } from "framer-motion";

export type Progress = MotionValue<number>;

export interface PhaseMeta {
  id: "ads" | "portals" | "seo" | "funnels" | "mailing";
  eyebrow: string;
  title: string;
  body: string;
  /** Global scrollYProgress window owned by this phase. */
  start: number;
  end: number;
}

/** Each phase owns exactly 20% of the 500vh master track. */
export const PHASES: PhaseMeta[] = [
  {
    id: "ads",
    eyebrow: "01 · Advertising",
    title: "Ads Engine",
    body: "Spin up Performance Max campaigns straight through the Google Ads API.",
    start: 0,
    end: 0.2,
  },
  {
    id: "portals",
    eyebrow: "02 · Reporting",
    title: "Client Portals",
    body: "White-labeled, read-only analytics your clients log into themselves.",
    start: 0.2,
    end: 0.4,
  },
  {
    id: "seo",
    eyebrow: "03 · Organic",
    title: "SEO Auditing",
    body: "Deep crawls, technical scores and ready-made fix tasks.",
    start: 0.4,
    end: 0.6,
  },
  {
    id: "funnels",
    eyebrow: "04 · Growth",
    title: "AI Funnels",
    body: "Traffic to lead to customer, mapped and automated end to end.",
    start: 0.6,
    end: 0.8,
  },
  {
    id: "mailing",
    eyebrow: "05 · Outreach",
    title: "Cold Mailing",
    body: "AI-drafted sequences sent to your leads, with results you can see.",
    start: 0.8,
    end: 1,
  },
];

/** Degrees between neighbouring cards on the 5-card ring (360 / 5). */
export const RING_STEP = 72;
