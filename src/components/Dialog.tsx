"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const FOCUSABLE =
  'a[href],button:not([disabled]),iframe,video[controls],input,select,textarea,[tabindex]:not([tabindex="-1"])';

type Props = {
  label: string;
  onClose: () => void;
  onCloseStart?: () => void; // 닫기 요청 즉시 (전환 애니메이션 시작용)
  exitMs?: number; // 닫힘 애니메이션 길이
  children: React.ReactNode;
  wide?: boolean; // 프로젝트 상세
  full?: boolean; // 화면 전체를 채우는 페이지형 (About)
  narrow?: boolean; // 작은 모달 (Contact)
};

/** 접근성 다이얼로그: 포커스 가두기, Esc/배경 클릭 닫기, 닫힘 애니메이션, 닫힌 뒤 트리거로 포커스 복귀 */
export default function Dialog({ label, onClose, onCloseStart, exitMs = 420, children, wide, full, narrow }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  const startRef = useRef(onCloseStart);
  const closingRef = useRef(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    closeRef.current = onClose;
    startRef.current = onCloseStart;
  });

  const requestClose = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    startRef.current?.();
    setClosing(true);
    window.setTimeout(() => closeRef.current(), exitMs);
  }, [exitMs]);

  useEffect(() => {
    const trigger = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        requestClose();
        return;
      }
      if (e.key !== "Tab" || !ref.current) return;
      const els = Array.from(ref.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (els.length === 0) {
        e.preventDefault();
        ref.current.focus();
        return;
      }
      const first = els[0];
      const last = els[els.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || active === ref.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      trigger?.focus?.();
    };
  }, [requestClose]);

  return (
    <div
      className={`dlg-backdrop ${full ? "full" : ""}`}
      data-closing={closing}
      style={{ "--exit": `${exitMs}ms` } as React.CSSProperties}
      onMouseDown={(e) => !full && e.target === e.currentTarget && requestClose()}
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        className={`dlg-panel ${wide ? "dlg-wide" : ""} ${full ? "dlg-full" : ""} ${narrow ? "dlg-narrow" : ""}`}
      >
        <button type="button" className="dlg-close" aria-label="닫기" onClick={requestClose}>
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
        <div className="dlg-scroll">{children}</div>
      </div>
    </div>
  );
}
