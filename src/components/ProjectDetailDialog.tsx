"use client";

import Image from "next/image";
import { projectTypeLabel, type PortfolioProject } from "@/data/portfolio";
import Dialog from "./Dialog";
import VideoPlayer from "./VideoPlayer";

export default function ProjectDetailDialog({ project, onClose }: { project: PortfolioProject; onClose: () => void }) {
  const meta = [project.category, project.period ?? project.year, project.projectType && projectTypeLabel[project.projectType]]
    .filter(Boolean)
    .join(" · ");

  return (
    <Dialog label={project.title} onClose={onClose} wide>
      <article className="detail">
        <div className="detail-media" data-vertical={project.aspectRatio === "9/16"}>
          <VideoPlayer project={project} />
        </div>

        <div className="detail-text">
          {project.eyebrow && <p className="eyebrow">{project.eyebrow}</p>}
          <h2>{project.title}</h2>
          {project.subtitle && <p className="detail-sub">{project.subtitle}</p>}
          <p className="detail-meta">{meta}</p>

          {project.description && <p className="detail-desc">{project.description}</p>}

          {project.contribution && (
            <>
              <h3 className="sec">CONTRIBUTION</h3>
              <p className="lead">{project.contribution}</p>
            </>
          )}

          {project.role && project.role.length > 0 && (
            <>
              <h3 className="sec">ROLE</h3>
              <p className="lead">{project.role.join(", ")}</p>
            </>
          )}

          {project.awards && project.awards.length > 0 && (
            <>
              <h3 className="sec">AWARD</h3>
              <ul className="entries">
                {project.awards.map((a) => (
                  <li key={a.year + a.text}>
                    <span>{a.year}</span>
                    <span>{a.text}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {project.credits && project.credits.length > 0 && (
            <>
              <h3 className="sec">CREDITS</h3>
              <p className="lead">{project.credits.join(" / ")}</p>
            </>
          )}

          {project.links && project.links.length > 0 && (
            <>
              <h3 className="sec">LINKS</h3>
              <ul className="entries">
                {project.links.map((l) => (
                  <li key={l.url}>
                    <a className="info-link" href={l.url} target="_blank" rel="noopener noreferrer">
                      {l.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
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
      </article>
    </Dialog>
  );
}
