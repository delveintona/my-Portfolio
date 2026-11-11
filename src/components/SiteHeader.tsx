import { profile } from "@/data/portfolio";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <span className="site-logo" aria-label={profile.nameKo}>
        {profile.initials}
      </span>
      <div className="site-meta">
        <span className="site-label">{profile.headerLabel}</span>
        <span className="site-name">{profile.nameKo}</span>
      </div>
    </header>
  );
}
