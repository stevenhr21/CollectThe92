import Link from "next/link";

interface TabItem {
  id: string;
  label: string;
  href?: string;
  background?: string;
  borderColor?: string;
  textColor?: string;
  shadowColor?: string;
}

interface TabStripProps {
  tabs: TabItem[];
  activeId: string;
  className?: string;
  onTabSelect?: (id: string) => void;
}

export default function TabStrip({
  tabs,
  activeId,
  className = "",
  onTabSelect,
}: TabStripProps) {
  return (
    <div className={["tab-strip", className].join(" ")}>
      {tabs.map((tab) => {
        const active = tab.id === activeId;
        const itemClassName = [
          "tab-strip-item",
          active ? "tab-strip-item-active" : "",
        ]
          .filter(Boolean)
          .join(" ");
        const itemStyle = {
          background: tab.background,
          borderColor: tab.borderColor,
          color: tab.textColor,
          boxShadow: tab.shadowColor
            ? `inset 0 1px 0 rgba(255,255,255,0.24), 0 6px 12px ${tab.shadowColor}`
            : undefined,
        };

        if (tab.href) {
          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={itemClassName}
              style={itemStyle}
              aria-current={active ? "page" : undefined}
            >
              {tab.label}
            </Link>
          );
        }

        return (
          <button
            key={tab.id}
            type="button"
            className={itemClassName}
            style={itemStyle}
            onClick={() => onTabSelect?.(tab.id)}
            aria-pressed={active}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
