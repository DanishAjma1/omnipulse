import { Suspense, type ReactNode } from "react";

/**
 * Isolated standalone layout for live published funnels (/f/[funnelId]).
 * Deliberately omits MarketingLayout (no navbar, no site footer) and wraps
 * children in <Suspense> for Next.js 16 Cache Components compatibility.
 */
export default function LiveFunnelStandaloneLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-[300dvh] w-full bg-transparent antialiased">
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center bg-slate-950 font-mono text-sm text-slate-400">
            Loading live funnel…
          </div>
        }
      >
        {children}
      </Suspense>
    </div>
  );
}
