"use client";

import type { PortfolioProject } from "@/data/portfolio";

type Props = {
  project: PortfolioProject;
  offset: number; // 활성 카드 기준 위치 (0 = 중앙)
  total: number;
  position: number;
  hidden: boolean; // 상세로 날아간 동안 원래 카드는 숨김
  onSelect: (face: HTMLElement) => void;
};

/** 카드 앞면 (캐러셀 카드와 전환용 고스트 카드가 공유) */
export function CardFace({ project, number }: { project: PortfolioProject; number: string }) {
  return (
    <span className="face face-front">
      <span className="fan-top">
        <span className="fan-cat">{project.eyebrow ?? project.category}</span>
        {project.period && <span className="fan-period">{project.period}</span>}
      </span>
      <span className="fan-mid">
        <span className="fan-title">{project.title}</span>
        {project.subtitle && <span className="fan-sub">{project.subtitle}</span>}
      </span>
      <span className="fan-num">{number}</span>
    </span>
  );
}

/** 메인 카드: 단색 면. 누르면 상세로 날아가며 뒤집혀 사진으로 바뀜 (CardMorph) */
export default function ProjectCard({ project, offset, total, position, hidden, onSelect }: Props) {
  const active = offset === 0;
  const number = String(position + 1).padStart(2, "0");

  return (
    <button
      type="button"
      className="fan-card"
      data-card-id={project.id}
      data-active={active}
      data-hidden={hidden}
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
          ...(project.color ? { "--c": project.color } : {}),
          zIndex: 20 - Math.abs(offset),
        } as React.CSSProperties
      }
      onClick={(e) => onSelect(e.currentTarget.querySelector<HTMLElement>(".face-front") ?? e.currentTarget)}
    >
      <CardFace project={project} number={number} />
    </button>
  );
}
