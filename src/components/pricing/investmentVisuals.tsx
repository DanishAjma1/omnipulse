export function ServerVisual() {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" fill="none" aria-hidden>
      {[10, 26, 42].map((y) => (
        <g key={y}>
          <rect x="8" y={y} width="48" height="14" rx="4" className="stroke-cyan-500 dark:stroke-cyan-400" strokeWidth="2" />
          <circle cx="16" cy={y + 7} r="2" className="fill-emerald-500 animate-pulse" />
          <line x1="26" x2="48" y1={y + 7} y2={y + 7} className="stroke-zinc-400 dark:stroke-zinc-500" strokeWidth="2" strokeLinecap="round" />
        </g>
      ))}
    </svg>
  );
}

export function NeuralVisual() {
  const input = [14, 32, 50];
  const hidden = [20, 44];
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" fill="none" aria-hidden>
      <g className="stroke-zinc-400/70 dark:stroke-zinc-500/70" strokeWidth="1">
        {input.flatMap((a) => hidden.map((b) => <line key={`${a}-${b}`} x1="10" y1={a} x2="32" y2={b} />))}
        {hidden.map((b) => <line key={`o-${b}`} x1="32" y1={b} x2="54" y2="32" />)}
      </g>
      {input.map((y) => <circle key={y} cx="10" cy={y} r="4" className="fill-blue-500" />)}
      {hidden.map((y) => <circle key={y} cx="32" cy={y} r="4.5" className="fill-cyan-400 animate-pulse" />)}
      <circle cx="54" cy="32" r="5" className="fill-indigo-500" />
    </svg>
  );
}

export function RdVisual() {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" fill="none" aria-hidden>
      <path d="M18 16 L6 32 L18 48" className="stroke-blue-500" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M46 16 L58 32 L46 48" className="stroke-blue-500" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 42 L30 32 L36 37 L44 22" className="stroke-cyan-400" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="44" cy="22" r="3" className="fill-cyan-400 animate-pulse" />
    </svg>
  );
}

export function ShieldVisual() {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]" fill="none" aria-hidden>
      <path d="M32 6 L54 14 V32 C54 45 44 54 32 58 C20 54 10 45 10 32 V14 Z" className="stroke-cyan-400" strokeWidth="3" strokeLinejoin="round" />
      <rect x="23" y="29" width="18" height="14" rx="3" className="fill-blue-500/30 stroke-blue-400" strokeWidth="2" />
      <path d="M26 29 V25 a6 6 0 0 1 12 0 V29" className="stroke-blue-400" strokeWidth="2" />
      <circle cx="32" cy="36" r="2" className="fill-cyan-300 animate-pulse" />
    </svg>
  );
}
