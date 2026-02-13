import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

interface PremiumButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  children: ReactNode;
  href?: string;
  className?: string;
}

export default function PremiumButton({
  children,
  href,
  className = "",
  type = "button",
  ...buttonProps
}: PremiumButtonProps) {
  const classes = ["premium-button foil shine-sweep", className].filter(Boolean).join(" ");

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
