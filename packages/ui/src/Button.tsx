import { cn } from "@nayeem/utils";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import { Link } from "react-router-dom";

const base =
  "inline-flex items-center justify-center gap-2 font-mono text-xs tracking-[0.2em] uppercase px-6 py-3 transition-all duration-300 relative overflow-hidden group";

const variants = {
  primary: "bg-accent-cyan text-base-black hover:shadow-[0_0_24px_rgba(0,229,255,0.5)]",
  outline: "border border-base-border text-foreground hover:border-accent-cyan hover:text-accent-cyan",
  ghost: "text-foreground-muted hover:text-foreground",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
}

export function Button({ variant = "primary", className, children, ...props }: ButtonProps) {
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: keyof typeof variants;
}

export function LinkButton({ variant = "primary", className, children, href, target, download, ...props }: LinkButtonProps) {
  const internal = Boolean(href?.startsWith("/")) && !target && !download;
  if (internal && href) {
    return (
      <Link to={href} className={cn(base, variants[variant], className)}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} target={target} download={download} className={cn(base, variants[variant], className)} {...props}>
      {children}
    </a>
  );
}
