import { GlassCard, SectionLabel } from "./GlassCard";
import { ScoreBar } from "./LevelBadge";

const rows = [
  { name: "Python", value: 92, level: "Strong" },
  { name: "Machine Learning", value: 88, level: "Strong" },
  { name: "DistilBERT", value: 61, level: "Moderate" },
  { name: "PyTorch", value: 55, level: "Weak" },
];

export function ScorePreview({ score = 82 }: { score?: number }) {
  const circumference = 2 * Math.PI * 52;
  return (
    <GlassCard glow className="w-full max-w-md animate-rise">
      <SectionLabel>Resume Defense Score</SectionLabel>
      <div className="mt-5 flex items-center gap-6">
        <div className="relative h-32 w-32 shrink-0">
          <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
            <circle cx="60" cy="60" r="52" className="stroke-secondary" strokeWidth="10" fill="none" />
            <circle
              cx="60"
              cy="60"
              r="52"
              stroke="url(#lensGrad)"
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - score / 100)}
            />
            <defs>
              <linearGradient id="lensGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="oklch(0.66 0.17 262)" />
                <stop offset="100%" stopColor="oklch(0.68 0.15 300)" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-3xl font-semibold">{score}</span>
            <span className="text-xs text-muted-foreground">/ 100</span>
          </div>
        </div>
        <div className="flex-1 space-y-3">
          {rows.map((r) => (
            <div key={r.name} className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-surface-foreground">{r.name}</span>
                <span className="text-muted-foreground">{r.value}</span>
              </div>
              <ScoreBar value={r.value} level={r.level} />
            </div>
          ))}
        </div>
      </div>
      <p className="mt-5 rounded-xl border border-weak/25 bg-weak/10 p-3 text-xs text-muted-foreground">
        <span className="font-medium text-weak">1 high-risk claim</span> — “Optimized model
        performance by 40%”
      </p>
    </GlassCard>
  );
}