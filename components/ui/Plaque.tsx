import type { ReactNode } from "react";

interface PlaqueProps {
  children: ReactNode;
  className?: string;
  foil?: boolean;
  subtleShine?: boolean;
}

export default function Plaque({
  children,
  className = "",
  foil = false,
  subtleShine = true,
}: PlaqueProps) {
  return (
    <div
      className={[
        "plaque",
        foil ? "foil" : "",
        subtleShine ? "shine-sweep" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
