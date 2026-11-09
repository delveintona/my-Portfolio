"use client";

import Image from "next/image";
import { projectTypeLabel, type PortfolioProject } from "@/data/portfolio";
import Dialog from "./Dialog";
import VideoPlayer from "./VideoPlayer";

export default function ProjectDetailDialog({ project, onClose }: { project: PortfolioProject; onClose: () => void }) {
  const kicker = [project.category, project.year, project.projectType && projectTypeLabel[project.projectType]]
    .filter(Boolean)
    .join(" · ");

  return (
    <Dialog label={project.title} onClose={onClose} wide>
      <article className="detail">
        <header className="detail-head">
          <p className="kicker">{kicker}</p>
          <h2>{project.title}</h2>
          {project.subtitle && <p className="detail-sub">{project.subtitle}</p>}
          {project.client && <p className="detail-client">{project.client}</p>}
        </header>

        <div className="detail-player" data-vertical={project.aspectRatio === "9/16"}>
          <VideoPlayer project={project} />
        </div>

        <div className="detail-body">
          {project.description && <p className="detail-desc">{project.description}</p>}
          <dl className="detail-info">
            {project.role && project.role.length > 0 && (
              <div>
                <dt>ROLE</dt>
                <dd>{project.role.join(", ")}</dd>
              </div>
            )}
            {project.duration && (
              <div>
                <dt>DURATION</dt>
                <dd>{project.duration}</dd>
              </div>
            )}
            {project.credits && project.credits.length > 0 && (
              <div>
                <dt>CREDITS</dt>
                <dd>
                  {project.credits.map((c) => (
                    <span key={c} className="block">
                      {c}
                    </span>
                  ))}
                </dd>
              </div>
            )}
          </dl>
        </div>

        {project.stills && project.stills.length > 0 && (
          <div className="detail-stills">
            {project.stills.map((s, i) => (
              <div key={s} className="still">
                <Image src={s} alt={`${project.title} 스틸 ${i + 1}`} fill sizes="(max-width: 900px) 100vw, 450px" unoptimized loading="lazy" />
              </div>
            ))}
          </div>
        )}

        {project.externalLink && (
          <a className="detail-link" href={project.externalLink} target="_blank" rel="noopener noreferrer">
            VIEW EXTERNAL ↗
          </a>
        )}
      </article>
    </Dialog>
  );
}
