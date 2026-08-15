import { cn } from "@/lib/utils";

const tone: Record<string, string> = {
  Strong: "bg-strong/15 text-strong border-strong/30",
  Moderate: "bg-moderate/15 text-moderate border-moderate/30",
  Weak: "bg-weak/15 text-weak border-weak/30",
  "Needs Preparation": "bg-weak/15 text-weak border-weak/30",
  high: "bg-weak/15 text-weak border-weak/30",
  medium: "bg-moderate/15 text-moderate border-moderate/30",
  low: "bg-strong/15 text-strong border-strong/30",
};

export function LevelBadge({ level, className }: { level: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        tone[level] ?? "border-border bg-secondary text-secondary-foreground",
        className,
      )}
    >
      {level === "high" ? "High risk" : level === "medium" ? "Medium risk" : level === "low" ? "Low risk" : level}
    </span>
  );
}

export function ScoreBar({ value, level }: { value: number; level?: string }) {
  const color =
    level === "Strong" ? "bg-strong" : level === "Moderate" ? "bg-moderate" : level ? "bg-weak" : "bg-primary";
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
      <div className={cn("h-full rounded-full transition-all duration-700", color)} style={{ width: `${value}%` }} />
    </div>
  );
}