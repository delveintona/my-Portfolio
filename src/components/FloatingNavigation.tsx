"use client";

export type NavKey = "work" | "about" | "contact";

const ICONS: Record<NavKey, React.ReactNode> = {
  work: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="2" />
      <rect x="14" y="3" width="7" height="7" rx="2" />
      <rect x="3" y="14" width="7" height="7" rx="2" />
      <rect x="14" y="14" width="7" height="7" rx="2" />
    </>
  ),
  about: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="10" r="3" />
      <path d="M6.5 18.5c1.4-2.3 3.2-3.2 5.5-3.2s4.1.9 5.5 3.2" />
    </>
  ),
  contact: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M4 7l8 6 8-6" />
    </>
  ),
};

const ITEMS: { key: NavKey; label: string }[] = [
  { key: "work", label: "Work" },
  { key: "about", label: "About" },
  { key: "contact", label: "Contact" },
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
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {ICONS[it.key]}
          </svg>
          <span>{it.label}</span>
        </button>
      ))}
    </nav>
  );
}
