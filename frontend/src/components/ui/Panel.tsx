import type { ReactNode } from "react";

type Accent = "mint" | "sky" | "butter" | "coral" | "none";

const accentClasses: Record<Accent, string> = {
  mint: "bg-mint text-ink",
  sky: "bg-sky text-ink",
  butter: "bg-butter text-ink",
  coral: "bg-coral text-white",
  none: "bg-surface text-ink dark:bg-surface-dark dark:text-white",
};

interface PanelProps {
  children: ReactNode;
  className?: string;
  noShadowOnHover?: boolean;
  id?: string;
}

export function Panel({ children, className = "", noShadowOnHover, id }: PanelProps) {
  return (
    <div
      id={id}
      className={`rounded-xl border-2 border-ink bg-surface shadow-brutal transition-all duration-300 dark:bg-surface-dark dark:border-white/80 ${
        noShadowOnHover ? "" : "hover:shadow-none hover:translate-x-1 hover:translate-y-1"
      } ${className}`}
    >
      {children}
    </div>
  );
}

interface PanelTitleProps {
  children: ReactNode;
  accent?: Accent;
  icon?: ReactNode;
  className?: string;
}

export function PanelTitle({ children, accent = "none", icon, className = "" }: PanelTitleProps) {
  return (
    <div
      className={`flex min-h-16 items-center justify-between gap-3 rounded-t-[10px] border-b-2 border-ink px-5 py-3 font-[var(--font-mono-brand)] text-lg tracking-tight dark:border-white/80 ${accentClasses[accent]} ${className}`}
    >
      <span>{children}</span>
      {icon}
    </div>
  );
}

export function PanelBody({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`p-6 font-[var(--font-body)] text-base leading-relaxed ${className}`}>{children}</div>;
}
