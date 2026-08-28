import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg border-2 border-ink px-5 py-3 font-mono-brand text-sm font-medium shadow-brutal-sm transition-all duration-200 hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none dark:border-white/80";

const variants = {
  primary: "bg-ink text-white dark:bg-coral dark:text-ink",
  sky: "bg-sky text-ink",
  coral: "bg-coral text-white",
  ghost: "bg-transparent text-ink dark:text-white",
};

type Variant = keyof typeof variants;

interface ButtonAsButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  as?: "button";
  variant?: Variant;
  children: ReactNode;
}

interface ButtonAsAnchor extends AnchorHTMLAttributes<HTMLAnchorElement> {
  as: "a";
  variant?: Variant;
  children: ReactNode;
}

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export function Button({ variant = "primary", className = "", children, ...rest }: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (rest.as === "a") {
    const { as: _as, ...anchorProps } = rest;
    return (
      <a className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const { as: _as, ...buttonProps } = rest as ButtonAsButton;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
