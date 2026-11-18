import React, { useState } from "react";
import { Check, Clipboard, ShieldCheck } from "lucide-react";

interface SessionHeroProps {
  badgeText: string;
  title: string;
  goal: string;
  steps: string[];
  toolLabel?: string;
}

export function SessionHero({
  badgeText,
  title,
  goal,
  steps,
  toolLabel
}: SessionHeroProps) {
  return (
    <section className="space-y-6 pb-8 border-b border-white/[0.08]">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-[#9CA3AF]">
          <span className="font-medium text-[#4F8CFF]">{badgeText}</span>
          {toolLabel && <span>도구: {toolLabel}</span>}
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#E5E7EB] tracking-tight leading-snug">
          {title}
        </h2>
        <p className="text-[17px] text-[#E5E7EB]/90 leading-[1.75]">
          {goal}
        </p>
      </div>

      {steps.length > 0 && (
        <div className="space-y-2.5">
          <div className="text-xs font-semibold text-[#9CA3AF] tracking-wide">
            이번 시간 순서
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#121A2B] border border-white/[0.08] text-sm text-[#E5E7EB]"
              >
                <span className="text-xs font-semibold text-[#4F8CFF]">{idx + 1}</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

interface CollapsibleDetailsProps {
  label?: string;
  hint?: string;
  defaultOpen?: boolean;
  open?: boolean;
  onToggle?: () => void;
  children: React.ReactNode;
  className?: string;
}

export function CollapsibleDetails({
  label = "자세히 보기",
  hint,
  defaultOpen = false,
  open: controlledOpen,
  onToggle,
  children,
  className = ""
}: CollapsibleDetailsProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = typeof controlledOpen === "boolean";
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalOpen(prev => !prev);
    }
  };

  return (
    <div className={`pt-1 ${className}`}>
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={isOpen}
        className="group inline-flex items-center gap-2 text-sm font-medium text-[#9CA3AF] hover:text-[#4F8CFF] transition-colors py-1"
      >
        <span
          className={`inline-block transition-transform duration-200 text-[#4F8CFF] ${
            isOpen ? "rotate-90" : ""
          }`}
        >
          ▸
        </span>
        <span className="text-[#E5E7EB] group-hover:text-[#4F8CFF] transition-colors">
          {label}
        </span>
        {hint && <span className="text-xs text-[#9CA3AF]">{hint}</span>}
      </button>

      <div className="collapsible-grid" data-open={isOpen ? "true" : "false"}>
        <div className="collapsible-inner">
          <div className="pt-4 space-y-4">{children}</div>
        </div>
      </div>
    </div>
  );
}

interface PromptBoxProps {
  label?: string;
  subInfo?: string;
  prompt: string;
  isCopied: boolean;
  onCopy: () => void;
  maxHeightClass?: string;
}

export function PromptBox({
  label,
  subInfo,
  prompt,
  isCopied,
  onCopy,
  maxHeightClass = "max-h-60"
}: PromptBoxProps) {
  return (
    <div className="bg-[#0B1220] border border-white/[0.08] rounded-xl p-5 space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          {label && (
            <span className="text-xs font-medium text-[#9CA3AF] block">
              {label}
            </span>
          )}
          {subInfo && (
            <span className="text-xs text-[#9CA3AF]/80 block mt-0.5">
              {subInfo}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={onCopy}
          className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors inline-flex items-center gap-1.5 ${
            isCopied
              ? "bg-emerald-600 text-white"
              : "bg-[#4F8CFF] hover:bg-[#3A7AF0] text-white"
          }`}
        >
          {isCopied ? <Check className="w-3.5 h-3.5" /> : <Clipboard className="w-3.5 h-3.5" />}
          <span>{isCopied ? "복사됨" : "복사"}</span>
        </button>
      </div>
      <pre
        className={`text-sm font-mono text-[#E5E7EB] whitespace-pre-wrap leading-[1.7] overflow-y-auto custom-scroll ${maxHeightClass}`}
      >
        {prompt}
      </pre>
    </div>
  );
}

interface SafetyCalloutProps {
  title?: string;
  children: React.ReactNode;
}

export function SafetyCallout({ title, children }: SafetyCalloutProps) {
  return (
    <div className="bg-amber-500/[0.06] border border-amber-500/35 rounded-xl p-7 space-y-3">
      {title && (
        <div className="flex items-center gap-2 text-amber-300 font-bold text-base">
          <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
          <span>{title}</span>
        </div>
      )}
      <div className="text-[#E5E7EB] leading-[1.75] space-y-3">{children}</div>
    </div>
  );
}
