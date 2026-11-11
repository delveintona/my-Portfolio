"use client";

import Image from "next/image";
import { useState } from "react";
import type { PortfolioProject } from "@/data/portfolio";

function isSafeEmbed(url: string) {
  try {
    const u = new URL(url);
    return (
      u.protocol === "https:" &&
      ["www.youtube.com", "www.youtube-nocookie.com", "player.vimeo.com"].includes(u.hostname)
    );
  } catch {
    return false;
  }
}

/** 포스터 클릭 후 재생. 자동 재생 없음, 미디어는 사용자가 누를 때만 로드 */
export default function VideoPlayer({ project }: { project: PortfolioProject }) {
  const { video, thumbnail, aspectRatio = "16/9", title } = project;
  const fill = project.color ?? "#2b2b33";
  const [started, setStarted] = useState(false);
  const [failed, setFailed] = useState(false);
  const poster = video?.poster ?? thumbnail ?? "";
  const ratio = aspectRatio.replace("/", " / ");

  const src = video?.src?.trim();
  const playable =
    !!video && !!src && !failed && (video.type === "file" || isSafeEmbed(src));

  const posterEl = poster ? (
    <Image src={poster} alt="" fill sizes="(max-width: 900px) 100vw, 900px" unoptimized className="vp-poster" />
  ) : (
    <div className="vp-fill" style={{ "--c": fill } as React.CSSProperties} />
  );

  if (!playable) {
    return (
      <div className="vp" style={{ aspectRatio: ratio }} data-aspect={aspectRatio}>
        {posterEl}
        {/* 영상이 없고 대표 이미지가 있는 프로젝트(웹/앱 등)는 라벨을 숨김 */}
        {(video || !thumbnail) && (
          <span className="vp-badge">
            {failed || (video && src && video.type !== "file" && !isSafeEmbed(src))
              ? "영상을 불러올 수 없습니다"
              : "영상 준비 중"}
          </span>
        )}
      </div>
    );
  }

  if (!started) {
    return (
      <div className="vp" style={{ aspectRatio: ratio }} data-aspect={aspectRatio}>
        {posterEl}
        <button type="button" className="vp-play" aria-label={`${title} 재생`} onClick={() => setStarted(true)}>
          <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="vp" style={{ aspectRatio: ratio }} data-aspect={aspectRatio}>
      {video.type === "file" ? (
        <video
          className="vp-media"
          controls
          autoPlay
          playsInline
          preload="metadata"
          poster={poster || undefined}
          src={src}
          onError={() => setFailed(true)}
        />
      ) : (
        <iframe
          className="vp-media"
          src={src}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      )}
    </div>
  );
}
