import { Lock, User } from "lucide-react";

export function RoasChart() {
  return (
    <svg viewBox="0 0 220 90" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="orbitRoas" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[25, 50, 75].map((y) => (
        <line key={y} x1="0" x2="220" y1={y} y2={y} className="stroke-zinc-300 dark:stroke-white/10" />
      ))}
      <path
        d="M4 80 C40 74 60 58 90 52 S140 36 160 26 S200 10 216 6 L216 90 L4 90 Z"
        fill="url(#orbitRoas)"
      />
      <path
        d="M4 80 C40 74 60 58 90 52 S140 36 160 26 S200 10 216 6"
        fill="none"
        stroke="#6366f1"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LockVisual() {
  return (
    <div className="relative flex h-full items-center justify-center gap-3">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-indigo-500/40 bg-indigo-500/10 text-indigo-600 dark:text-indigo-300">
        <User className="h-7 w-7" />
      </div>
      <span className="font-mono text-lg tracking-widest text-zinc-400">•••</span>
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
        <Lock className="h-7 w-7" />
      </div>
    </div>
  );
}

export function RadarVisual() {
  return (
    <div className="relative mx-auto flex h-full aspect-square items-center justify-center">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
        {[46, 32, 18].map((r) => (
          <circle key={r} cx="50" cy="50" r={r} fill="none" className="stroke-zinc-300 dark:stroke-white/15" />
        ))}
        <line x1="4" y1="50" x2="96" y2="50" className="stroke-zinc-300 dark:stroke-white/10" />
        <line x1="50" y1="4" x2="50" y2="96" className="stroke-zinc-300 dark:stroke-white/10" />
        <circle cx="68" cy="34" r="2.5" fill="#10b981" />
        <circle cx="36" cy="62" r="2.5" fill="#f59e0b" />
      </svg>
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full animate-spin [animation-duration:4s]"
        aria-hidden
      >
        <path d="M50 50 L50 4 A46 46 0 0 1 90 27 Z" fill="rgba(6,182,212,0.35)" />
        <line x1="50" y1="50" x2="50" y2="4" stroke="#06b6d4" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

export function FunnelVisual() {
  return (
    <svg viewBox="0 0 220 90" className="h-full w-full" aria-hidden>
      <g className="stroke-zinc-400 dark:stroke-zinc-500" strokeWidth="1.5" fill="none">
        <path d="M30 20 L90 45 M30 45 L90 45 M30 70 L90 45" />
        <path d="M110 45 L160 22 M110 45 L160 68" />
        <path d="M180 22 L205 22 M180 68 L205 68" />
      </g>
      {[20, 45, 70].map((y) => (
        <circle key={y} cx="24" cy={y} r="6" fill="#6366f1" />
      ))}
      <rect x="90" y="35" width="22" height="20" rx="5" fill="#06b6d4" />
      <circle cx="170" cy="22" r="8" fill="#10b981" />
      <circle cx="170" cy="68" r="8" fill="#f59e0b" />
      <circle cx="210" cy="22" r="4" fill="#10b981" />
      <circle cx="210" cy="68" r="4" fill="#f59e0b" />
    </svg>
  );
}
