"use client";

import { profile } from "@/data/portfolio";

/** 로고를 누르면 첫 화면(All, 첫 카드)으로 돌아감 */
export default function SiteHeader({ onHome }: { onHome: () => void }) {
  return (
    <header className="site-header">
      <button type="button" className="site-logo" aria-label={`${profile.nameKo} · 첫 화면으로`} onClick={onHome}>
        {profile.initials}
      </button>
      <div className="site-meta">
        <span className="site-label">{profile.headerLabel}</span>
        <span className="site-name">{profile.nameKo}</span>
      </div>
    </header>
  );
}
