import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { PageShell } from "@/components/lens/PageShell";
import { GlassCard, SectionLabel } from "@/components/lens/GlassCard";
import { Button } from "@/components/ui/button";
import { interviewQuestions } from "@/lib/interview-data";
import { Mic, Sparkles, Loader2, Radio } from "lucide-react";

const title = "Resume Defense Interview — InterviewLens";
const description =
  "An adaptive AI voice interview generated from your resume, with follow-up questions driven by your previous answers.";

export const Route = createFileRoute("/interview")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: InterviewPage,
});

type Phase = "asking" | "listening" | "analyzing" | "followup";

type SpeechRecognitionInstance = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

type SpeechRecognitionEvent = {
  results: ArrayLike<{ 0: { transcript: string } }>;
};

type SpeechRecognitionErrorEvent = { error: string };

function InterviewPage() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(1);
  const [phase, setPhase] = useState<Phase>("asking");
  const [transcript, setTranscript] = useState("");
  const [speechError, setSpeechError] = useState("");
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const transcriptRef = useRef("");

  const q = interviewQuestions[index]!;
  const isFollowUp = phase === "followup" && q.followUp;
  const activeQuestion = isFollowUp ? q.followUp!.question : q.question;
  const activeOrigin = isFollowUp ? q.followUp!.origin : q.origin;

  useEffect(() => {
    return () => {
      const recognition = recognitionRef.current;
      if (!recognition) return;
      recognition.onresult = null;
      recognition.onerror = null;
      recognition.onend = null;
      recognition.abort();
      recognitionRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (phase !== "analyzing") return;
    const t = setTimeout(() => {
      if (q.followUp) setPhase("followup");
      else next();
    }, 1600);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  function startListening() {
    if (recognitionRef.current) return;

    const Recognition = (
      window as Window & {
        SpeechRecognition?: SpeechRecognitionConstructor;
        webkitSpeechRecognition?: SpeechRecognitionConstructor;
      }
    ).SpeechRecognition ??
      (
        window as Window & {
          webkitSpeechRecognition?: SpeechRecognitionConstructor;
        }
      ).webkitSpeechRecognition;

    if (!Recognition) {
      setSpeechError("Speech recognition is unavailable in this browser.");
      return;
    }

    setTranscript("");
    transcriptRef.current = "";
    setSpeechError("");

    const recognition = new Recognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = navigator.language || "en-US";
    recognition.onresult = (event) => {
      const nextTranscript = Array.from(event.results)
        .map((result) => result[0]?.transcript ?? "")
        .join("")
        .trim();
      transcriptRef.current = nextTranscript;
      setTranscript(nextTranscript);
    };
    recognition.onerror = (event) => {
      const message =
        event.error === "not-allowed" || event.error === "service-not-allowed"
          ? "Microphone permission was denied. Please allow microphone access and try again."
          : "Speech recognition could not start. Please try again.";
      setSpeechError(message);
    };
    recognition.onend = () => {
      recognitionRef.current = null;
      if (transcriptRef.current) {
        setPhase("analyzing");
      } else {
        setPhase("asking");
      }
    };

    recognitionRef.current = recognition;
    try {
      recognition.start();
      setPhase("listening");
    } catch {
      recognitionRef.current = null;
      setSpeechError("Speech recognition could not start. Please try again.");
    }
  }

  function submitAnswer() {
    recognitionRef.current?.stop();
  }

  function next() {
    if (index >= interviewQuestions.length - 1) {
      navigate({ to: "/report" });
      return;
    }
    setIndex((i) => i + 1);
    setPhase("asking");
    setTranscript("");
    transcriptRef.current = "";
    setSpeechError("");
  }

  const progress = ((index + 1) / interviewQuestions.length) * 100;

  return (
    <PageShell>
      <div className="animate-rise">
        <SectionLabel>Adaptive · generated from your resume</SectionLabel>
        <h1 className="mt-3 text-3xl font-semibold md:text-4xl">Resume Defense Interview</h1>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-6">
          <GlassCard glow>
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
              <span className="text-muted-foreground">
                Question {index + 1} / {interviewQuestions.length}
              </span>
              <span className="rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs">
                Current topic: <span className="text-primary">{q.topic}</span>
              </span>
            </div>
            <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-6 flex gap-4">
              <div className="relative mt-1 h-11 w-11 shrink-0">
                {phase === "listening" && (
                  <span className="absolute inset-0 rounded-full bg-primary/30 animate-ring" />
                )}
                <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Radio className="h-5 w-5" />
                </span>
              </div>
              <div className="min-w-0">
                {isFollowUp && (
                  <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-xs text-accent">
                    <Sparkles className="h-3 w-3" /> Follow-up question
                  </span>
                )}
                <p className="text-lg font-medium leading-snug">{activeQuestion}</p>
                <p className="mt-2 text-xs text-muted-foreground">{activeOrigin}</p>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                variant={phase === "listening" ? "secondary" : "default"}
                disabled={phase === "analyzing"}
                onPointerDown={(event) => {
                  event.currentTarget.setPointerCapture(event.pointerId);
                  startListening();
                }}
                onPointerUp={submitAnswer}
                onPointerCancel={submitAnswer}
                onLostPointerCapture={submitAnswer}
              >
                <Mic className="mr-2 h-4 w-4" />
                {phase === "listening" ? "Listening..." : "Hold to Answer"}
              </Button>
              {phase === "followup" && (
                <Button variant="outline" onClick={next}>
                  Next question
                </Button>
              )}
              {phase === "analyzing" && (
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" /> Analyzing your answer...
                </span>
              )}
            </div>
          </GlassCard>

          <GlassCard>
            <SectionLabel>Your answer (live transcript)</SectionLabel>
            <p className="mt-3 min-h-16 text-sm leading-relaxed text-muted-foreground">
              {transcript || "Hold the microphone button and start speaking..."}
              {phase === "listening" && <span className="ml-0.5 animate-pulse text-primary">|</span>}
            </p>
            {speechError && <p className="mt-3 text-xs text-weak">{speechError}</p>}
          </GlassCard>
        </div>

        <div className="space-y-6">
          <GlassCard>
            <SectionLabel>Interview Focus</SectionLabel>
            <div className="mt-4 space-y-3">
              {[
                { k: "Technical Depth", v: "Probing implementation details" },
                { k: "Resume Consistency", v: "Matching answers to written claims" },
                { k: "Communication", v: "Clarity, structure, filler words" },
              ].map((f) => (
                <div key={f.k} className="rounded-xl border border-border bg-background/40 p-3">
                  <p className="text-sm font-medium">{f.k}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{f.v}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard>
            <SectionLabel>Question source</SectionLabel>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              Every question is generated from your uploaded resume. When an answer is incomplete,
              InterviewLens adapts and asks a deeper follow-up before moving on.
            </p>
            <div className="mt-4 space-y-2">
              {interviewQuestions.map((item, i) => (
                <div
                  key={item.id}
                  className={`flex items-center gap-2 text-xs ${
                    i === index ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      i < index ? "bg-strong" : i === index ? "bg-primary" : "bg-border"
                    }`}
                  />
                  {item.topic}
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </PageShell>
  );
}
