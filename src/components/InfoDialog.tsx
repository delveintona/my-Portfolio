"use client";

import Image from "next/image";
import { useState } from "react";
import { contact, profile } from "@/data/portfolio";
import Dialog from "./Dialog";

type Entry = { year: string; text: string };
const TABS = ["PROFILE", "AWARD", "ACTIVITIES", "EXPERIENCE"] as const;
type Tab = (typeof TABS)[number];

function Placeholder({ children }: { children: React.ReactNode }) {
  return <p className="ph">{children}</p>;
}

function EntryList({ items, hint }: { items: Entry[]; hint: string }) {
  if (items.length === 0) return <Placeholder>{hint}</Placeholder>;
  return (
    <ul className="entries">
      {items.map((e) => (
        <li key={e.year + e.text}>
          <span>{e.year}</span>
          <span>{e.text}</span>
        </li>
      ))}
    </ul>
  );
}

function Tags({ items, hint }: { items: string[]; hint: string }) {
  if (items.length === 0) return <Placeholder>{hint}</Placeholder>;
  return (
    <ul className="tags">
      {items.map((s) => (
        <li key={s}>{s}</li>
      ))}
    </ul>
  );
}

export function AboutDialog({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<Tab>("PROFILE");
  const aboutIsPlaceholder = profile.about.startsWith("[");

  return (
    <Dialog label="About" onClose={onClose} full>
      <div className="about">
        <div className="about-tabs" role="tablist" aria-label="About 섹션">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              className="about-tab"
              data-active={tab === t}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "PROFILE" && (
          <div className="about-profile">
            <div className="about-photo-col">
              <div className="about-photo">
                {profile.photo ? (
                  <Image src={profile.photo} alt={profile.nameKo} fill sizes="320px" unoptimized />
                ) : (
                  <span>[프로필 사진]</span>
                )}
              </div>
              <p className="about-name">{profile.nameKo}</p>
              <p className="about-name-en">{profile.nameEn}</p>
            </div>
            <div className="about-main">
              <h3 className="sec">ABOUT</h3>
              {aboutIsPlaceholder ? <Placeholder>{profile.about}</Placeholder> : <p className="lead">{profile.about}</p>}
              <h3 className="sec">INTERESTED IN</h3>
              {profile.interested.length > 0 ? (
                <p className="lead">{profile.interested.join(", ")}</p>
              ) : (
                <Placeholder>[관심 분야를 profile.interested에 입력하세요]</Placeholder>
              )}
              <h3 className="sec">CHARACTER</h3>
              <Tags items={profile.character} hint="[성격 키워드를 profile.character에 입력하세요]" />
              <h3 className="sec">EDUCATION</h3>
              <EntryList items={profile.education} hint="[학력을 profile.education에 입력하세요]" />
              {profile.notes.length > 0 && (
                <>
                  <h3 className="sec">NOTE</h3>
                  <Tags items={profile.notes} hint="" />
                </>
              )}
            </div>
          </div>
        )}

        {tab === "AWARD" && (
          <div className="about-single">
            <h3 className="sec">AWARD</h3>
            <EntryList items={profile.awards} hint="[수상 내역을 profile.awards에 입력하세요]" />
            {profile.certificates.length > 0 && (
              <>
                <h3 className="sec">CERTIFICATES</h3>
                <EntryList items={profile.certificates} hint="" />
              </>
            )}
          </div>
        )}
        {tab === "ACTIVITIES" && (
          <div className="about-single">
            <h3 className="sec">ACTIVITIES</h3>
            <EntryList items={profile.activities} hint="[활동 내역을 profile.activities에 입력하세요]" />
          </div>
        )}
        {tab === "EXPERIENCE" && (
          <div className="about-single">
            <h3 className="sec">EXPERIENCE</h3>
            <EntryList items={profile.experience} hint="[경력을 profile.experience에 입력하세요]" />
          </div>
        )}
      </div>
    </Dialog>
  );
}

export function ContactDialog({ onClose }: { onClose: () => void }) {
  return (
    <Dialog label="Contact" onClose={onClose} narrow>
      <div className="contact">
        <h3 className="sec">CONTACT</h3>
        <ul className="contact-list">
          <li>
            {contact.email ? (
              <a className="contact-row" href={`mailto:${contact.email}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2.5" />
                  <path d="M4 7l8 6 8-6" />
                </svg>
                {contact.email}
              </a>
            ) : (
              <Placeholder>[이메일을 portfolio.ts의 contact.email에 입력하세요]</Placeholder>
            )}
          </li>
          {contact.socials.map((s) => (
            <li key={s.url}>
              <a className="contact-row" href={s.url} target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
                </svg>
                {s.label}
              </a>
            </li>
          ))}
          {contact.socials.length === 0 && (
            <li>
              <Placeholder>[SNS 링크를 portfolio.ts의 contact.socials에 입력하세요]</Placeholder>
            </li>
          )}
        </ul>
      </div>
    </Dialog>
  );
}
