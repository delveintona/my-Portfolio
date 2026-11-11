"use client";

import Image from "next/image";
import type { PortfolioProject } from "@/data/portfolio";

type Props = {
  project: PortfolioProject;
  offset: number; // 활성 카드 기준 위치 (0 = 중앙)
  total: number;
  position: number;
  onSelect: () => void;
};

export default function ProjectCard({ project, offset, total, position, onSelect }: Props) {
  const active = offset === 0;
  const number = String(position + 1).padStart(2, "0");

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
          background: project.color ?? "#2b2b33",
          zIndex: 20 - Math.abs(offset),
        } as React.CSSProperties
      }
      onClick={onSelect}
    >
      {project.thumbnail && (
        <Image src={project.thumbnail} alt="" fill sizes="320px" unoptimized draggable={false} className="fan-img" />
      )}
      <span className="fan-top">
        <span className="fan-cat">{project.eyebrow ?? project.category}</span>
        {project.period && <span className="fan-period">{project.period}</span>}
      </span>
      <span className="fan-mid">
        <span className="fan-title">{project.title}</span>
        {project.subtitle && <span className="fan-sub">{project.subtitle}</span>}
      </span>
      <span className="fan-num">{number}</span>
    </button>
  );
}
