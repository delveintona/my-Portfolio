"use client";

export type NavKey = "work" | "about" | "contact";

const ITEMS: { key: NavKey; label: string }[] = [
  { key: "work", label: "WORK" },
  { key: "about", label: "ABOUT" },
  { key: "contact", label: "CONTACT" },
];

export default function FloatingNavigation({ active, onSelect }: { active: NavKey; onSelect: (k: NavKey) => void }) {
  return (
    <nav className="float-nav" aria-label="주요 메뉴">
      {ITEMS.map((it) => (
        <button
          key={it.key}
          type="button"
          className="nav-item"
          data-active={active === it.key}
          aria-current={active === it.key ? "page" : undefined}
          onClick={() => onSelect(it.key)}
        >
          {it.label}
        </button>
      ))}
    </nav>
  );
}
