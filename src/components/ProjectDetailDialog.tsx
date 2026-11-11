"use client";

import Image from "next/image";
import type { PortfolioProject } from "@/data/portfolio";
import Dialog from "./Dialog";
import VideoPlayer from "./VideoPlayer";
import { MORPH_MS } from "./CardMorph";

function isVertical(ratio?: string) {
  if (!ratio) return false;
  const [w, h] = ratio.split("/").map(Number);
  return !!w && !!h && h > w;
}

type Props = {
  project: PortfolioProject;
  mediaHidden: boolean; // 전환 중에는 고스트 카드가 미디어 자리를 대신함
  onCloseStart: () => void;
  onClose: () => void;
};

/** 왼쪽 사진/영상은 고정, 오른쪽 글만 따로 스크롤 */
export default function ProjectDetailDialog({ project, mediaHidden, onCloseStart, onClose }: Props) {
  const { objective, strategy, outcome, tools, links, awards, role, when, description } = project;

  return (
    <Dialog label={project.title} onClose={onClose} onCloseStart={onCloseStart} exitMs={MORPH_MS + 60} wide>
      <article className="detail">
        <div
          className="detail-media"
          data-morph-target
          data-hidden={mediaHidden}
          data-vertical={isVertical(project.aspectRatio)}
        >
          <VideoPlayer project={project} />
        </div>

        <div className="detail-text">
          {project.eyebrow && <p className="eyebrow">{project.eyebrow}</p>}
          <h2>{project.title}</h2>
          {project.subtitle && <p className="detail-sub">{project.subtitle}</p>}

          {objective && (
            <div>
              <h3 className="sec">Objective</h3>
              <p className="lead">{objective}</p>
            </div>
          )}
          {strategy && (
            <div>
              <h3 className="sec">Strategy</h3>
              <p className="lead">{strategy}</p>
            </div>
          )}
          {outcome && (
            <div>
              <h3 className="sec">Outcome</h3>
              <p className="lead">{outcome}</p>
            </div>
          )}
          {!objective && !strategy && description && (
            <div>
              <p className="lead detail-desc">{description}</p>
            </div>
          )}
          {awards && awards.length > 0 && (
            <div>
              <h3 className="sec">Award</h3>
              <ul className="entries">
                {awards.map((a) => (
                  <li key={a.year + a.text}>
                    <span>{a.year}</span>
                    <span>{a.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {tools && tools.length > 0 && (
            <div>
              <h3 className="sec">Tools</h3>
              <ul className="tags">
                {tools.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          )}
          {links && links.length > 0 && (
            <div>
              <h3 className="sec">Links</h3>
              <ul className="link-pills">
                {links.map((l) => (
                  <li key={l.url}>
                    <a className="link-pill" href={l.url} target="_blank" rel="noopener noreferrer">
                      {l.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {((role && role.length > 0) || when) && (
            <dl className="detail-facts">
              {role && role.length > 0 && (
                <>
                  <dt>Role</dt>
                  <dd>{role.join(" / ")}</dd>
                </>
              )}
              {when && (
                <>
                  <dt>Period</dt>
                  <dd>{when}</dd>
                </>
              )}
            </dl>
          )}

          {project.stills && project.stills.length > 0 && (
            <div className="detail-stills">
              {project.stills.map((s, i) => (
                <div key={s} className="still">
                  <Image src={s} alt={`${project.title} 스틸 ${i + 1}`} fill sizes="(max-width: 900px) 100vw, 450px" loading="lazy" />
                </div>
              ))}
            </div>
          )}
        </div>
      </article>
    </Dialog>
  );
}
