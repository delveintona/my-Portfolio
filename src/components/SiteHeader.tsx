import { profile } from "@/data/portfolio";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <span className="site-logo">{profile.initials}</span>
      <div className="site-meta">
        <span>{profile.tagline}</span>
        <span className="site-name">{profile.name}</span>
      </div>
    </header>
  );
}
