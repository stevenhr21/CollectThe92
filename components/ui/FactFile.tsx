import type { ReactNode } from "react";

interface FactItem {
  label: string;
  value: string;
  icon?: ReactNode;
}

interface FactFileProps {
  title: string;
  items: FactItem[];
  className?: string;
  compact?: boolean;
}

export default function FactFile({
  title,
  items,
  className = "",
  compact = false,
}: FactFileProps) {
  return (
    <div className={["fact-file keyline", compact ? "fact-file-compact" : "", className].join(" ")}>
      <div className="fact-file-label">Fact File</div>
      <p className="fact-file-title">{title}</p>
      <div className="fact-file-grid">
        {items.map((item) => (
          <div key={item.label} className="fact-file-cell">
            <p className="fact-file-cell-label">
              {item.icon ? <span className="fact-file-icon">{item.icon}</span> : null}
              {item.label}
            </p>
            <p className="fact-file-cell-value">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
