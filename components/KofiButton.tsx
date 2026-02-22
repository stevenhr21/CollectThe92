import type { AnchorHTMLAttributes } from "react";

const KOFI_URL = "https://ko-fi.com/F2F71UR8Z1";

interface KofiButtonProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children"> {
  variant?: "gold" | "subtle";
  className?: string;
}

function CoffeeCupIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
      <line x1="6" y1="2" x2="6" y2="4" />
      <line x1="10" y1="2" x2="10" y2="4" />
      <line x1="14" y1="2" x2="14" y2="4" />
    </svg>
  );
}

export default function KofiButton({
  variant = "gold",
  className = "",
  ...anchorProps
}: KofiButtonProps) {
  const base = variant === "gold" ? "kofi-button-gold" : "kofi-button-subtle";
  const classes = [base, "shine-sweep", className].filter(Boolean).join(" ");

  return (
    <a
      href={KOFI_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={classes}
      {...anchorProps}
    >
      <CoffeeCupIcon />
      <span>Support This Project</span>
    </a>
  );
}

export function KofiNavButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={KOFI_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`kofi-nav-button shine-sweep ${className}`}
      aria-label="Support on Ko-fi"
      title="Support on Ko-fi"
    >
      <CoffeeCupIcon size={15} />
      <span className="kofi-nav-label">Support This Project</span>
    </a>
  );
}
