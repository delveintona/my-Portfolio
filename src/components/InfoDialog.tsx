"use client";

import { contact, profile } from "@/data/portfolio";
import Dialog from "./Dialog";

export function AboutDialog({ onClose }: { onClose: () => void }) {
  const placeholderIntro = profile.intro.startsWith("[");
  return (
    <Dialog label="About" onClose={onClose}>
      <div className="info">
        <p className="kicker">ABOUT</p>
        <h2>{profile.name}</h2>
        <p className={placeholderIntro ? "ph" : "info-text"}>{profile.intro}</p>

        <h3>SKILLS</h3>
        {profile.skills.length > 0 ? (
          <ul className="tags">
            {profile.skills.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        ) : (
          <p className="ph">[역량을 portfolio.ts의 profile.skills에 입력하세요]</p>
        )}

        <h3>HISTORY</h3>
        {profile.history.length > 0 ? (
          <ul className="history">
            {profile.history.map((h) => (
              <li key={h.period + h.title}>
                <span>{h.period}</span>
                <span>{h.title}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="ph">[경력/학력을 portfolio.ts의 profile.history에 입력하세요]</p>
        )}
      </div>
    </Dialog>
  );
}

export function ContactDialog({ onClose }: { onClose: () => void }) {
  return (
    <Dialog label="Contact" onClose={onClose}>
      <div className="info">
        <p className="kicker">CONTACT</p>
        <h2>Get in touch</h2>

        <h3>EMAIL</h3>
        {contact.email ? (
          <a className="info-link" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
        ) : (
          <p className="ph">[이메일을 portfolio.ts의 contact.email에 입력하세요]</p>
        )}

        <h3>SOCIAL</h3>
        {contact.socials.length > 0 ? (
          <ul className="history">
            {contact.socials.map((s) => (
              <li key={s.url}>
                <a className="info-link" href={s.url} target="_blank" rel="noopener noreferrer">
                  {s.label} ↗
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="ph">[SNS 링크를 portfolio.ts의 contact.socials에 입력하세요]</p>
        )}
      </div>
    </Dialog>
  );
}
