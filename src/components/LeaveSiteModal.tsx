"use client";

import { useEffect } from "react";
import { ExternalLink, ShieldAlert, X } from "lucide-react";
import { useT } from "@/contexts/LanguageContext";
import { describeUrl } from "@/lib/externalLinks";

interface LeaveSiteModalProps {
  url: URL | null;
  onConfirm: () => void;
  onCancel: () => void;
}

const LeaveSiteModal = ({ url, onConfirm, onCancel }: LeaveSiteModalProps) => {
  const t = useT();

  useEffect(() => {
    if (!url) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [url, onCancel]);

  if (!url) return null;

  const copy = t.leaveModal;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="leave-site-title"
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4 bg-foreground/50 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(event) => {
        if (event.target === event.currentTarget) onCancel();
      }}
    >
      <div className="relative w-full max-w-lg rounded-3xl bg-card border border-border shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200">
        <button
          type="button"
          onClick={onCancel}
          aria-label={copy.close}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <span className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-muted-foreground mb-5">
          <span className="w-8 h-px bg-secondary" />
          {copy.eyebrow}
        </span>

        <div className="flex items-start gap-4 mb-5">
          <div className="shrink-0 w-11 h-11 rounded-2xl bg-secondary/20 flex items-center justify-center">
            <ShieldAlert className="w-5 h-5 text-foreground" />
          </div>
          <h2
            id="leave-site-title"
            className="text-2xl sm:text-3xl font-display leading-tight text-foreground pr-6"
          >
            {copy.title}
          </h2>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {copy.description}
        </p>

        <div className="rounded-2xl border border-border bg-muted/60 p-4 mb-4">
          <span className="block text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
            {copy.destination}
          </span>
          <p className="text-base font-semibold text-foreground flex items-center gap-2">
            <ExternalLink className="w-4 h-4 shrink-0" />
            {describeUrl(url)}
          </p>
          <p className="mt-2 text-xs font-mono text-muted-foreground break-all">
            {url.href}
          </p>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed mb-2">
          {copy.warning}
        </p>
        <p className="text-sm font-medium text-foreground mb-6">{copy.question}</p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 border border-border text-foreground px-5 h-12 rounded-full font-semibold text-sm hover:bg-muted transition-colors"
          >
            {copy.cancel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 hero-gradient text-primary-foreground px-5 h-12 rounded-full font-semibold text-sm hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2"
          >
            {copy.confirm}
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        <p className="mt-4 text-center text-[11px] text-muted-foreground">
          {copy.newTab}
        </p>
      </div>
    </div>
  );
};

export default LeaveSiteModal;
