"use client";

import { useEffect, useRef, useState } from "react";
import type { PortfolioProject } from "@/data/portfolio";
import ProjectCard from "./ProjectCard";

type Props = {
  projects: PortfolioProject[];
  index: number;
  onIndexChange: (i: number) => void;
  onOpen: (id: string, face: HTMLElement) => void;
  hiddenId: string | null;
  keyboardEnabled: boolean;
};

const VISIBLE = 4; // 중앙 기준 좌우로 렌더링할 카드 수
const THRESHOLD = 50;
const WHEEL_STEP = 70; // 카드 한 장 넘기는 데 필요한 누적 휠 거리 (클수록 둔감)
const WHEEL_COOLDOWN = 170; // ms: 한 장 넘긴 뒤 다음 장까지 최소 간격 (클수록 천천히)
const WHEEL_MAX_PER_GESTURE = 4; // 한 번 굴려서 넘어가는 최대 카드 수
const WHEEL_IDLE = 160; // ms: 이 시간 동안 휠 입력이 없으면 다음 제스처로 인정
const WHEEL_NOTCH_MIN = 90; // 이 이상 한 번에 크게 들어오면 마우스 휠 한 칸으로 봄
const WHEEL_NOTCH_GAP = 40; // ms: 트랙패드는 이벤트가 이보다 촘촘히 들어옴
const WHEEL_NOTCH_COOLDOWN = 90; // ms: 휠 한 칸당 한 장, 너무 빠른 연속 입력만 걸러냄

export default function ProjectCarousel({ projects, index, onIndexChange, onOpen, hiddenId, keyboardEnabled }: Props) {
  const n = projects.length;
  const [dx, setDx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const drag = useRef({ down: false, startX: 0, moved: false });
  const section = useRef<HTMLElement>(null);
  const wheel = useRef({ acc: 0, lastStep: -1e9, lastEvent: 0, count: 0, index: 0 });

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

  // 마우스 휠 / 트랙패드: 한 칸씩 카드를 돌림
  useEffect(() => {
    const el = section.current;
    if (!el || !keyboardEnabled || n < 2) return;
    // 상태는 ref에 보관: index가 바뀌어 이 효과가 다시 만들어져도 쿨다운이 유지됨
    const w = wheel.current;
    w.index = index;
    const step = (dir: 1 | -1) => {
      w.index = (w.index + dir + n) % n; // 다시 그려지기 전에 연속으로 와도 한 칸씩 정확히 쌓임
      onIndexChange(w.index);
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = performance.now();
      const gap = now - w.lastEvent;
      w.lastEvent = now;
      const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (delta === 0) return;

      // 마우스 휠: 한 칸("또독")에 카드 한 장. 한 칸의 deltaY는 보통 100 안팎, 이벤트 간격도 띄엄띄엄
      const notch = e.deltaMode !== 0 || (Math.abs(delta) >= WHEEL_NOTCH_MIN && gap > WHEEL_NOTCH_GAP);
      if (notch) {
        if (now - w.lastStep >= WHEEL_NOTCH_COOLDOWN) {
          step(delta > 0 ? 1 : -1);
          w.lastStep = now;
        }
        w.acc = 0;
        w.count = 0;
        return;
      }

      // 트랙패드: 잘게 쪼개진 입력을 모아서, 굴린 만큼 이어서 넘김 (한 번에 최대 4장)
      if (gap > WHEEL_IDLE) {
        w.acc = 0;
        w.count = 0;
      }
      if (w.count >= WHEEL_MAX_PER_GESTURE) return;
      if (w.acc !== 0 && Math.sign(delta) !== Math.sign(w.acc)) w.acc = 0;
      w.acc += delta;
      if (Math.abs(w.acc) >= WHEEL_STEP && now - w.lastStep >= WHEEL_COOLDOWN) {
        step(w.acc > 0 ? 1 : -1);
        w.acc = 0;
        w.lastStep = now;
        w.count += 1;
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
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
    <section ref={section} className="carousel" aria-roledescription="carousel" aria-label="프로젝트">
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
                hidden={hiddenId === p.id}
                onSelect={(face) => {
                  if (drag.current.moved || hiddenId) return;
                  if (offset === 0) onOpen(p.id, face);
                  else go(i);
                }}
              />
            );
          })}
        </div>
      </div>

      <div className="carousel-controls">
        <button type="button" className="round-btn" aria-label="이전 프로젝트" disabled={n < 2} onClick={() => go(index - 1)}>
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path d="M11 3L5 9l6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span className="counter" aria-live="polite">
          {String(index + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
        </span>
        <button type="button" className="round-btn" aria-label="다음 프로젝트" disabled={n < 2} onClick={() => go(index + 1)}>
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path d="M7 3l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}
