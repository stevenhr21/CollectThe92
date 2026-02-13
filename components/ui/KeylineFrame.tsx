import type { ReactNode } from "react";

type FrameVariant = "default" | "league";
type FramePadding = "sm" | "md" | "lg";
type FrameRadius = "sm" | "md" | "lg";

interface KeylineFrameProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  variant?: FrameVariant;
  padding?: FramePadding;
  rounded?: FrameRadius;
  cornerTicks?: boolean;
}

const paddingClasses: Record<FramePadding, string> = {
  sm: "p-2",
  md: "p-3",
  lg: "p-4 sm:p-5",
};

const radiusClasses: Record<FrameRadius, string> = {
  sm: "rounded-md",
  md: "rounded-lg",
  lg: "rounded-xl",
};

export default function KeylineFrame({
  children,
  className = "",
  contentClassName = "",
  variant = "default",
  padding = "md",
  rounded = "md",
  cornerTicks = false,
}: KeylineFrameProps) {
  return (
    <div
      className={[
        "print-frame keyline relative overflow-hidden",
        variant === "league" ? "print-frame-league" : "",
        radiusClasses[rounded],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {cornerTicks && <div className="corner-ticks pointer-events-none absolute inset-0" />}
      <div className={["relative z-[1]", paddingClasses[padding], contentClassName].join(" ")}>
        {children}
      </div>
    </div>
  );
}
