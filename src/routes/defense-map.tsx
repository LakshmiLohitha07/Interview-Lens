import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/lens/PageShell";
import { GlassCard, SectionLabel } from "@/components/lens/GlassCard";
import { LevelBadge, ScoreBar } from "@/components/lens/LevelBadge";
import { Button } from "@/components/ui/button";
import { defenseMap, getInterviewSession } from "@/lib/interview-data";
import { AlertTriangle, Boxes, Cpu, FolderGit2 } from "lucide-react";

const title = "Your Resume Defense Map — InterviewLens";
const description =
  "See the skills, projects, technologies and high-risk claims extracted from your resume before your voice interview.";

export const Route = createFileRoute("/defense-map")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: DefenseMapPage,
});

function DefenseMapPage() {
  const [currentDefenseMap, setCurrentDefenseMap] = useState(defenseMap);

  useEffect(() => {
    const session = getInterviewSession();
    if (session) setCurrentDefenseMap(session.defenseMap);
  }, []);

  return (
    <PageShell>
      <div className="animate-rise">
        <SectionLabel>Extracted from your resume</SectionLabel>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <h1 className="text-3xl font-semibold md:text-4xl">Your Resume Defense Map</h1>
          <Button asChild size="lg">
            <Link to="/interview">Start Defense Interview</Link>
          </Button>
        </div>
      </div>

      <GlassCard glow className="mt-8 animate-rise border-weak/25">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-weak" />
          <SectionLabel>Claims to Defend</SectionLabel>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          These statements will be challenged directly in your interview.
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {currentDefenseMap.claims.map((c) => (
            <div
              key={c.text}
              className="rounded-xl border border-border bg-background/40 p-4 transition-colors hover:border-primary/40"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-medium leading-snug">“{c.text}”</p>
                <LevelBadge level={c.risk} />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{c.source}</p>
            </div>
          ))}
        </div>
      </GlassCard>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <GlassCard>
          <div className="flex items-center gap-2">
            <Boxes className="h-4 w-4 text-primary" />
            <SectionLabel>Skills</SectionLabel>
          </div>
          <div className="mt-5 space-y-4">
            {currentDefenseMap.skills.map((s) => (
              <div key={s.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">{s.name}</span>
                  <LevelBadge level={s.level} />
                </div>
                <ScoreBar value={s.confidence} level={s.level} />
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center gap-2">
            <FolderGit2 className="h-4 w-4 text-primary" />
            <SectionLabel>Projects</SectionLabel>
          </div>
          <div className="mt-5 space-y-4">
            {currentDefenseMap.projects.map((p) => (
              <div key={p.name} className="rounded-xl border border-border bg-background/40 p-4">
                <p className="text-sm font-medium">{p.name}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{p.summary}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.stack.map((t) => (
                    <span key={t} className="rounded-md bg-secondary px-2 py-0.5 text-[11px] text-secondary-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center gap-2">
            <Cpu className="h-4 w-4 text-primary" />
            <SectionLabel>Technologies</SectionLabel>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {currentDefenseMap.technologies.map((t) => (
              <span key={t} className="rounded-lg border border-border bg-background/40 px-3 py-1.5 text-xs">
                {t}
              </span>
            ))}
          </div>
        </GlassCard>
      </div>
    </PageShell>
  );
}
