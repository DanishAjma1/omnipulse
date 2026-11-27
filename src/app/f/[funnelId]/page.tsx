import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  FunnelAst,
  FunnelAstRenderer,
} from "@/components/funnels/FunnelAstRenderer";

// Next.js 16 Cache Components (`cacheComponents: true` in next.config.ts):
// Opts `/f/[funnelId]` into request-time blocking dynamic rendering so uncached
// PostgreSQL/API lookups in `generateMetadata` and the page body never fail
// static prerendering in Turbopack.
export const instant = false;

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ||
  "http://localhost:4100/api/v1";

interface PublicFunnelPayload {
  id: string;
  name: string;
  slug: string;
  status: "PUBLISHED";
  liveUrl: string;
  componentTree: FunnelAst;
  seoMetadata?: {
    title?: string;
    description?: string;
    keywords?: string;
    canonicalPath?: string;
  };
  updatedAt: string;
}

async function fetchPublishedFunnel(
  funnelId: string
): Promise<PublicFunnelPayload | null> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/funnels/public/${encodeURIComponent(funnelId)}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    const json = (await res.json().catch(() => null)) as {
      success?: boolean;
      data?: PublicFunnelPayload;
    } | null;
    return json?.data ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ funnelId: string }>;
}): Promise<Metadata> {
  const { funnelId } = await params;
  const funnel = await fetchPublishedFunnel(funnelId);
  if (!funnel) {
    return {
      title: "Funnel Not Found",
      robots: { index: false, follow: false },
    };
  }

  const heroHeadline = funnel.componentTree?.components?.find(
    (c) => c.type === "Hero"
  )?.props?.headline;
  const title = funnel.seoMetadata?.title || heroHeadline || funnel.name;
  const description = funnel.seoMetadata?.description || "";
  const rawKeywords = funnel.seoMetadata?.keywords || "";
  const keywords = rawKeywords
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);

  return {
    title: { absolute: title },
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    openGraph: {
      title,
      description,
      type: "website",
      url: funnel.liveUrl,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function LivePublishedFunnelPage({
  params,
}: {
  params: Promise<{ funnelId: string }>;
}) {
  const { funnelId } = await params;
  const funnel = await fetchPublishedFunnel(funnelId);
  if (!funnel || !funnel.componentTree) {
    notFound();
  }

  return <FunnelAstRenderer ast={funnel.componentTree} />;
}
