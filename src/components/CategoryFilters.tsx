"use client";

import { useLayoutEffect, useRef } from "react";

type Props = {
  categories: string[];
  value: string;
  onChange: (c: string) => void;
};

/** 선택 표시(동그란 알약)가 탭 사이를 미끄러지듯 이동하는 필터 */
export default function CategoryFilters({ categories, value, onChange }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const pill = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const place = () => {
      const w = wrap.current;
      const p = pill.current;
      if (!w || !p) return;
      const active = w.querySelector<HTMLElement>('[aria-selected="true"]');
      if (!active) return;
      const first = p.dataset.ready !== "true";
      if (first) p.style.transition = "none"; // 첫 배치는 이동 없이 바로
      p.style.width = `${active.offsetWidth}px`;
      p.style.height = `${active.offsetHeight}px`;
      p.style.transform = `translate(${active.offsetLeft}px, ${active.offsetTop}px)`;
      p.dataset.ready = "true";
      if (first) {
        void p.offsetWidth; // 리플로우 후 전환 복구
        p.style.transition = "";
      }
    };
    place();
    const ro = new ResizeObserver(place);
    if (wrap.current) ro.observe(wrap.current);
    document.fonts?.ready.then(place);
    return () => ro.disconnect();
  }, [value, categories]);

  return (
    <div className="filters" role="tablist" aria-label="카테고리 필터" ref={wrap}>
      <span className="filter-pill" ref={pill} aria-hidden="true" />
      {categories.map((c) => (
        <button
          key={c}
          type="button"
          role="tab"
          aria-selected={c === value}
          className="filter-tab"
          data-active={c === value}
          onClick={() => onChange(c)}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
