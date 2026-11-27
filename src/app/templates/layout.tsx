import type { ReactNode } from "react";

export default function FunnelTemplatesPreviewLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="min-h-[300dvh] w-full antialiased">{children}</div>;
}
