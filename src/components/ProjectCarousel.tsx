"use client";

import { useEffect, useRef, useState } from "react";
import type { PortfolioProject } from "@/data/portfolio";
import ProjectCard from "./ProjectCard";

type Props = {
  projects: PortfolioProject[];
  index: number;
  onIndexChange: (i: number) => void;
  onOpen: (id: string) => void;
  keyboardEnabled: boolean;
};

const VISIBLE = 5; // 중앙 기준 좌우로 렌더링할 카드 수
const THRESHOLD = 50;

export default function ProjectCarousel({ projects, index, onIndexChange, onOpen, keyboardEnabled }: Props) {
  const n = projects.length;
  const [dx, setDx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const drag = useRef({ down: false, startX: 0, moved: false });

  // 순환: 처음 카드가 가운데일 때도 왼쪽에 마지막 카드들이 보이도록
  const go = (i: number) => onIndexChange(((i % n) + n) % n);
  const wrapOffset = (i: number) => {
    let d = (((i - index) % n) + n) % n;
    if (d > n / 2) d -= n;
    return d;
  };

  useEffect(() => {
    if (!keyboardEnabled) return;
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
      if (n === 0) return;
      if (e.key === "ArrowLeft") onIndexChange((index - 1 + n) % n);
      else if (e.key === "ArrowRight") onIndexChange((index + 1) % n);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [keyboardEnabled, index, n, onIndexChange]);

  const finish = () => {
    const d = drag.current;
    if (!d.down) return;
    d.down = false;
    setDragging(false);
    if (Math.abs(dx) > THRESHOLD) go(index + (dx < 0 ? 1 : -1));
    setDx(0);
    // 드래그 직후 발생하는 click 무시
    setTimeout(() => (d.moved = false), 0);
  };

  if (n === 0) {
    return <div className="stage-empty">표시할 프로젝트가 없습니다</div>;
  }

  return (
    <section className="carousel" aria-roledescription="carousel" aria-label="프로젝트">
      <div
        className="stage"
        data-dragging={dragging}
        onPointerDown={(e) => {
          if (e.pointerType === "mouse" && e.button !== 0) return;
          drag.current = { down: true, startX: e.clientX, moved: false };
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          if (!d.down) return;
          const delta = e.clientX - d.startX;
          if (!d.moved && Math.abs(delta) > 6) {
            d.moved = true;
            setDragging(true);
          }
          if (d.moved) setDx(delta);
        }}
        onPointerUp={finish}
        onPointerCancel={finish}
        onPointerLeave={finish}
      >
        <div className="track" style={{ transform: `translateX(${dx * 0.35}px)` }}>
          {projects.map((p, i) => {
            const offset = wrapOffset(i);
            if (Math.abs(offset) > VISIBLE) return null;
            return (
              <ProjectCard
                key={p.id}
                project={p}
                offset={offset}
                total={n}
                position={i}
                onSelect={() => {
                  if (drag.current.moved) return;
                  if (offset === 0) onOpen(p.id);
                  else go(i);
                }}
              />
            );
          })}
        </div>
      </div>

      <div className="carousel-controls">
        <button type="button" className="round-btn" aria-label="이전 프로젝트" disabled={n < 2}onClick={() => go(index - 1)}>
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path d="M11 3L5 9l6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span className="counter" aria-live="polite">
          {String(index + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
        </span>
        <button type="button" className="round-btn" aria-label="다음 프로젝트" disabled={n < 2}onClick={() => go(index + 1)}>
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path d="M7 3l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}
