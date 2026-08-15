import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ScanEye } from "lucide-react";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <ScanEye className="h-4 w-4" />
            </span>
            <span className="font-display text-sm font-semibold tracking-tight">InterviewLens</span>
          </Link>
          <nav className="flex items-center gap-5 text-sm text-muted-foreground">
            <Link to="/upload" className="transition-colors hover:text-foreground">
              Upload
            </Link>
            <Link to="/defense-map" className="transition-colors hover:text-foreground">
              Defense Map
            </Link>
            <Link to="/report" className="transition-colors hover:text-foreground">
              Report
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-12">{children}</main>
    </div>
  );
}