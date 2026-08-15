import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { PageShell } from "@/components/lens/PageShell";
import { GlassCard } from "@/components/lens/GlassCard";
import { Button } from "@/components/ui/button";
import { analysisSteps, analyzeResumeApi, saveInterviewSession } from "@/lib/interview-data";
import { CheckCircle2, FileText, Loader2, UploadCloud } from "lucide-react";

const title = "Upload Your Resume — InterviewLens";
const description =
  "Upload your resume PDF and InterviewLens identifies your skills, projects, technologies and claims worth defending.";

export const Route = createFileRoute("/upload")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: UploadPage,
});

function UploadPage() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!analyzing) return;
    if (step >= analysisSteps.length) {
      void analyzeResumeApi(file).then((session) => {
        saveInterviewSession(session);
        navigate({ to: "/defense-map" });
      });
      return;
    }
    const t = setTimeout(() => setStep((s) => s + 1), 900);
    return () => clearTimeout(t);
  }, [analyzing, step, file, navigate]);

  return (
    <PageShell>
      <div className="mx-auto max-w-2xl animate-rise">
        <h1 className="text-3xl font-semibold md:text-4xl">Let's understand your resume.</h1>
        <p className="mt-3 text-muted-foreground">
          Upload your resume and we'll identify your skills, projects, technologies, and claims
          worth defending.
        </p>

        {analyzing ? (
          <GlassCard className="mt-8">
            <div className="space-y-4">
              {analysisSteps.map((label, i) => (
                <div key={label} className="flex items-center gap-3 text-sm">
                  {i < step ? (
                    <CheckCircle2 className="h-4 w-4 text-strong" />
                  ) : i === step ? (
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  ) : (
                    <span className="h-4 w-4 rounded-full border border-border" />
                  )}
                  <span className={i <= step ? "text-foreground" : "text-muted-foreground"}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>
        ) : (
          <>
            <div
              role="button"
              tabIndex={0}
              onClick={() => inputRef.current?.click()}
              onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                const f = e.dataTransfer.files?.[0];
                if (f) setFile(f);
              }}
              className={`glass mt-8 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-dashed px-6 py-16 text-center transition-colors ${
                dragging ? "border-primary bg-primary/5" : ""
              }`}
            >
              <input
                ref={inputRef}
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
              {file ? (
                <>
                  <FileText className="h-8 w-8 text-primary" />
                  <p className="mt-4 text-sm font-medium">{file.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Click to choose another file</p>
                </>
              ) : (
                <>
                  <UploadCloud className="h-8 w-8 text-primary" />
                  <p className="mt-4 text-sm font-medium">Drag & drop your resume PDF here</p>
                  <p className="mt-1 text-xs text-muted-foreground">or click to browse — PDF up to 10MB</p>
                </>
              )}
            </div>

            <div className="mt-6 flex items-center gap-4">
              <Button size="lg" onClick={() => setAnalyzing(true)}>
                Analyze Resume
              </Button>
              {!file && (
                <span className="text-xs text-muted-foreground">
                  No file? Continue with a sample resume.
                </span>
              )}
            </div>
          </>
        )}
      </div>
    </PageShell>
  );
}
