"use client";

import Image from "next/image";
import type { PortfolioProject } from "@/data/portfolio";

const RATIO_NUM = { "16/9": 16 / 9, "3/2": 3 / 2, "9/16": 9 / 16, "1/1": 1 } as const;

type Props = {
  project: PortfolioProject;
  offset: number; // 활성 카드 기준 위치 (0 = 중앙)
  total: number;
  position: number;
  onSelect: (el: HTMLButtonElement) => void;
};

export default function ProjectCard({ project, offset, total, position, onSelect }: Props) {
  const active = offset === 0;
  const ratio = RATIO_NUM[project.aspectRatio ?? "16/9"];
  const meta = [project.category, project.year].filter(Boolean).join(" · ");

  return (
    <button
      type="button"
      className="fan-card"
      data-active={active}
      tabIndex={active ? 0 : -1}
      aria-current={active ? "true" : undefined}
      aria-label={
        active
          ? `${project.title}, ${position + 1}/${total}. 상세 보기`
          : `${project.title}로 이동, ${position + 1}/${total}`
      }
      style={
        {
          "--o": offset,
          "--ao": Math.abs(offset),
          "--ratio": ratio,
          zIndex: 10 - Math.abs(offset),
        } as React.CSSProperties
      }
      onClick={(e) => onSelect(e.currentTarget)}
    >
      <Image
        src={project.thumbnail}
        alt=""
        fill
        sizes="(max-width: 700px) 86vw, 720px"
        unoptimized
        draggable={false}
        className="fan-img"
        priority={active}
      />
      <span className="fan-shade" aria-hidden="true" />
      <span className="fan-info">
        <span className="fan-meta">{meta}</span>
        <span className="fan-title">{project.title}</span>
        {project.subtitle && <span className="fan-sub">{project.subtitle}</span>}
      </span>
      {project.duration && <span className="fan-duration">{project.duration}</span>}
      <span className="fan-play" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24">
          <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
        </svg>
      </span>
    </button>
  );
}
