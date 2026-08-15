import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/lens/PageShell";
import { ScorePreview } from "@/components/lens/ScorePreview";
import { GlassCard, SectionLabel } from "@/components/lens/GlassCard";
import { Button } from "@/components/ui/button";
import { AudioLines, FileSearch, ShieldQuestion } from "lucide-react";

const title = "InterviewLens — Defend Your Resume in an AI Voice Interview";
const description =
  "An AI voice interviewer that stress-tests your resume claims, adapts to your answers, and shows exactly what you need to improve.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Index,
});

const pillars = [
  {
    icon: FileSearch,
    title: "Resume Defense Map",
    body: "We extract your skills, projects, technologies and the claims most likely to be challenged.",
  },
  {
    icon: AudioLines,
    title: "Adaptive Voice Interview",
    body: "Questions come from your resume. Weak answers trigger deeper follow-ups in real time.",
  },
  {
    icon: ShieldQuestion,
    title: "Personalized Report",
    body: "Knowledge defense, communication metrics and the exact claims you need to prepare.",
  },
];

function Index() {
  return (
    <PageShell>
      <section className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div className="animate-rise">
          <span className="inline-flex items-center rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs text-muted-foreground">
            Voice-first AI Resume Defense Coach
          </span>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.1] md:text-5xl">
            Your resume gets you the interview.
            <br />
            <span className="text-gradient">InterviewLens prepares you to defend it.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">{description}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button asChild size="lg">
              <Link to="/upload">Analyze My Resume</Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link to="/defense-map">See a sample defense map</Link>
            </Button>
          </div>
          <p className="mt-5 text-sm text-muted-foreground">
            Resume Defense • Adaptive Voice Interview • Personalized Report
          </p>
        </div>
        <ScorePreview />
      </section>

      <section className="mt-20 grid gap-5 md:grid-cols-3">
        {pillars.map((p) => (
          <GlassCard key={p.title}>
            <p.icon className="h-5 w-5 text-primary" />
            <h2 className="mt-4 text-base font-semibold">{p.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
          </GlassCard>
        ))}
      </section>

      <section className="mt-20">
        <SectionLabel>How it works</SectionLabel>
        <div className="mt-5 grid gap-4 md:grid-cols-4">
          {["Upload resume", "Review defense map", "Voice interview", "Defense report"].map((s, i) => (
            <GlassCard key={s} className="p-5">
              <span className="font-display text-sm text-primary">0{i + 1}</span>
              <p className="mt-2 text-sm font-medium">{s}</p>
            </GlassCard>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
