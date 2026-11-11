"use client";

import { useLayoutEffect, useRef } from "react";

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

/** 선택 표시(알약)가 Work/About/Contact 사이를 미끄러지듯 이동 */
export default function FloatingNavigation({ active, onSelect }: { active: NavKey; onSelect: (k: NavKey) => void }) {
  const wrap = useRef<HTMLElement>(null);
  const pill = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const place = () => {
      const w = wrap.current;
      const p = pill.current;
      const el = w?.querySelector<HTMLElement>('[aria-current="page"]');
      if (!w || !p || !el) return;
      const first = p.dataset.ready !== "true";
      if (first) p.style.transition = "none";
      p.style.width = `${el.offsetWidth}px`;
      p.style.height = `${el.offsetHeight}px`;
      p.style.transform = `translate(${el.offsetLeft}px, ${el.offsetTop}px)`;
      p.dataset.ready = "true";
      if (first) {
        void p.offsetWidth;
        p.style.transition = "";
      }
    };
    place();
    const ro = new ResizeObserver(place);
    if (wrap.current) ro.observe(wrap.current);
    return () => ro.disconnect();
  }, [active]);

  return (
    <nav className="float-nav" aria-label="주요 메뉴" ref={wrap}>
      <span className="nav-pill" ref={pill} aria-hidden="true" />
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
