"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef } from "react";
import type { PortfolioProject } from "@/data/portfolio";
import { cardColor } from "@/lib/contrast";
import { CardFace } from "./ProjectCard";

export const MORPH_MS = 720;
const EASE = "cubic-bezier(0.65, 0, 0.2, 1)";

type Props = {
  project: PortfolioProject;
  phase: "open" | "close";
  from?: DOMRect; // open: 클릭한 카드의 위치
  number: string;
  onDone: () => void;
};

const box = (r: DOMRect) => ({
  left: `${r.left}px`,
  top: `${r.top}px`,
  width: `${r.width}px`,
  height: `${r.height}px`,
});

/**
 * 공유 요소 전환: 카드가 상세의 미디어 자리로 날아가며 Y축으로 뒤집혀 사진으로 바뀌고,
 * 닫을 때는 반대로 사진이 뒤집히며 원래 카드 자리로 돌아간다.
 */
export default function CardMorph({ project, phase, from, number, onDone }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const doneRef = useRef(onDone);

  useEffect(() => {
    doneRef.current = onDone;
  });

  useLayoutEffect(() => {
    const el = root.current;
    const inn = inner.current;
    if (!el || !inn) return;

    const media = document.querySelector<HTMLElement>("[data-morph-target]")?.getBoundingClientRect();
    const card = document
      .querySelector<HTMLElement>(`[data-card-id="${project.id}"] .face-front`)
      ?.getBoundingClientRect();
    const a = phase === "open" ? (from ?? card) : media;
    const b = phase === "open" ? media : card;
    if (!a || !b) {
      doneRef.current();
      return;
    }

    // 고스트 카드의 글자 크기·여백·모서리를 진짜 카드와 똑같이 (카드 폭 기준 비례 값이라 폭을 넘겨 줘야 함)
    const cardRect = phase === "open" ? a : b;
    el.style.setProperty("--card-w", `${cardRect.width}px`);
    el.style.setProperty("--face-r", `max(12px, ${cardRect.width * 0.034}px)`);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const opts: KeyframeAnimationOptions = { duration: reduce ? 1 : MORPH_MS, easing: EASE, fill: "forwards" };
    const geo = el.animate([box(a), box(b)], opts);
    const rot = inn.animate(
      phase === "open"
        ? [{ transform: "rotateY(0deg)" }, { transform: "rotateY(180deg)" }]
        : [{ transform: "rotateY(180deg)" }, { transform: "rotateY(0deg)" }],
      opts,
    );
    geo.onfinish = () => doneRef.current();
    return () => {
      geo.cancel();
      rot.cancel();
    };
  }, [phase, from, project.id]);

  const poster = project.video?.poster ?? project.thumbnail;

  return (
    <div
      ref={root}
      className="ghost"
      aria-hidden="true"
      style={{ "--c": cardColor(project.color) ?? "var(--card-default)", ...(from ? box(from) : {}) } as React.CSSProperties}
    >
      <div ref={inner} className="ghost-inner">
        <CardFace project={project} number={number} />
        <span className="face face-photo">
          {poster ? (
            <Image src={poster} alt="" fill sizes="720px" draggable={false} className="photo-img" />
          ) : (
            <span className="photo-fill" />
          )}
        </span>
      </div>
    </div>
  );
}
