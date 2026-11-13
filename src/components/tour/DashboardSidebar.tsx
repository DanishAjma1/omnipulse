"use client";

import { motion, MotionValue } from "framer-motion";
import { Megaphone, Search, Filter, Send, Globe, Activity } from "lucide-react";
import { useRamp, useRampOut, type Progress } from "./timeline";

interface NavItemProps {
  label: string;
  icon: React.ReactNode;
  activeOpacity?: MotionValue<number>;
}

function NavItem({ label, icon, activeOpacity }: NavItemProps) {
  return (
    <div
      title={label}
      className="relative flex h-10 w-10 items-center justify-center rounded-xl text-zinc-500"
    >
      {activeOpacity && (
        <motion.div
          style={{ opacity: activeOpacity }}
          className="absolute inset-0 rounded-xl border border-indigo-500/40 bg-indigo-500/20"
        />
      )}
      <span className="relative">{icon}</span>
    </div>
  );
}

/** 64px icon rail. Item centers (design px): Campaigns y=92, SEO y=140. */
export function DashboardSidebar({ p }: { p: Progress }) {
  const campaignsActive = useRampOut(p, 0.49, 0.51);
  const seoActive = useRamp(p, 0.49, 0.51);

  return (
    <div className="flex w-16 shrink-0 flex-col items-center border-r border-white/5 bg-[#0c0c0e]">
      <div className="flex h-14 w-full items-center justify-center border-b border-white/5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
          <Activity className="h-4 w-4" />
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 pt-4">
        <NavItem
          label="Campaigns"
          icon={<Megaphone className="h-[18px] w-[18px]" />}
          activeOpacity={campaignsActive}
        />
        <NavItem
          label="SEO Auditing"
          icon={<Search className="h-[18px] w-[18px]" />}
          activeOpacity={seoActive}
        />
        <NavItem label="AI Funnels" icon={<Filter className="h-[18px] w-[18px]" />} />
        <NavItem label="Outreach" icon={<Send className="h-[18px] w-[18px]" />} />
        <NavItem label="Client Portals" icon={<Globe className="h-[18px] w-[18px]" />} />
      </div>
    </div>
  );
}
