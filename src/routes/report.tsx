import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/lens/PageShell";
import { GlassCard, SectionLabel } from "@/components/lens/GlassCard";
import { LevelBadge, ScoreBar } from "@/components/lens/LevelBadge";
import { Button } from "@/components/ui/button";
import { getInterviewSession, report } from "@/lib/interview-data";
import { AlertTriangle, ListChecks } from "lucide-react";

const title = "Your Resume Defense Report — InterviewLens";
const description =
  "Resume Defense Score, knowledge strengths, communication metrics and high-risk claims from your AI voice interview.";

export const Route = createFileRoute("/report")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ReportPage,
});

function ReportPage() {
  const [reportData, setReportData] = useState(report);

  useEffect(() => {
    const session = getInterviewSession();
    if (session?.report) setReportData(session.report);
  }, []);

  const c = 2 * Math.PI * 54;
  return (
    <PageShell>
      <div className="animate-rise">
        <SectionLabel>Generated from your interview answers</SectionLabel>
        <h1 className="mt-3 text-3xl font-semibold md:text-4xl">Your Resume Defense Report</h1>
      </div>

      <GlassCard glow className="mt-8 animate-rise">
        <div className="flex flex-wrap items-center gap-8">
          <div className="relative h-36 w-36">
            <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
              <circle cx="60" cy="60" r="54" className="stroke-secondary" strokeWidth="9" fill="none" />
              <circle
                cx="60"
                cy="60"
                r="54"
                stroke="url(#reportGrad)"
                strokeWidth="9"
                strokeLinecap="round"
                fill="none"
                strokeDasharray={c}
                strokeDashoffset={c * (1 - reportData.score / 100)}
              />
              <defs>
                <linearGradient id="reportGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="oklch(0.66 0.17 262)" />
                  <stop offset="100%" stopColor="oklch(0.68 0.15 300)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-4xl font-semibold">{reportData.score}</span>
              <span className="text-xs text-muted-foreground">/ 100</span>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Resume Defense Score — {reportData.score}/100</h2>
            <p className="mt-2 max-w-lg text-sm text-muted-foreground">{reportData.summary}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/interview">Practice Again</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/defense-map">View Defense Map</Link>
              </Button>
            </div>
          </div>
        </div>
      </GlassCard>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <GlassCard>
          <SectionLabel>Knowledge Defense</SectionLabel>
          <div className="mt-5 space-y-4">
            {reportData.knowledge.map((k) => (
              <div key={k.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">{k.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">{k.score}</span>
                    <LevelBadge level={k.level} />
                  </div>
                </div>
                <ScoreBar value={k.score} level={k.level === "Strong" ? "Strong" : k.level === "Moderate" ? "Moderate" : "Weak"} />
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <SectionLabel>Communication</SectionLabel>
          <div className="mt-5 grid grid-cols-2 gap-4">
            {reportData.communication.map((m) => (
              <div key={m.label} className="rounded-xl border border-border bg-background/40 p-4">
                <p className="text-xs text-muted-foreground">{m.label}</p>
                <p className="mt-1 font-display text-2xl font-semibold">{m.value}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <GlassCard className="border-weak/25">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-weak" />
            <SectionLabel>High-Risk Claim</SectionLabel>
          </div>
          <p className="mt-4 text-base font-medium">“{reportData.highRiskClaim.claim}”</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {reportData.highRiskClaim.explanation}
          </p>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center gap-2">
            <ListChecks className="h-4 w-4 text-primary" />
            <SectionLabel>Personalized Preparation</SectionLabel>
          </div>
          <ol className="mt-4 space-y-3">
            {reportData.preparation.map((p, i) => (
              <li key={p} className="flex gap-3 text-sm">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs text-primary">
                  {i + 1}
                </span>
                <span className="text-muted-foreground">{p}</span>
              </li>
            ))}
          </ol>
        </GlassCard>
      </div>
    </PageShell>
  );
}
