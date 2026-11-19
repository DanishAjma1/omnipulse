import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  FunnelAstRenderer,
  PREDEFINED_FUNNEL_TEMPLATES,
} from "@/components/funnels/FunnelAstRenderer";

export function generateStaticParams() {
  return [
    { templateSlug: "modern-saas" },
    { templateSlug: "direct-response" },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ templateSlug: string }>;
}): Promise<Metadata> {
  const { templateSlug } = await params;
  if (templateSlug === "modern-saas") {
    return {
      title: "Modern SaaS Funnel Template — Live Preview",
      description:
        "Clean Bento-grid SaaS funnel template with whitespace, subtle fade-ins, and 300dvh+ conversion architecture.",
    };
  }
  if (templateSlug === "direct-response") {
    return {
      title: "Direct Response Funnel Template — Live Preview",
      description:
        "High-contrast obsidian dark mode direct-response funnel template with pulsing CTAs and guarantee stack.",
    };
  }
  return { title: "Template Preview" };
}

export default async function StaticTemplatePreviewPage({
  params,
}: {
  params: Promise<{ templateSlug: string }>;
}) {
  const { templateSlug } = await params;
  const ast =
    PREDEFINED_FUNNEL_TEMPLATES[
      templateSlug as keyof typeof PREDEFINED_FUNNEL_TEMPLATES
    ];

  if (!ast) {
    notFound();
  }

  return <FunnelAstRenderer ast={ast} />;
}
