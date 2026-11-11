"use client";

import { useMemo, useState } from "react";
import { getCategories, getOrderedProjects } from "@/data/portfolio";
import CardMorph from "./CardMorph";
import CategoryFilters from "./CategoryFilters";
import FloatingNavigation, { type NavKey } from "./FloatingNavigation";
import { AboutDialog, ContactDialog } from "./InfoDialog";
import ProjectCarousel from "./ProjectCarousel";
import ProjectDetailDialog from "./ProjectDetailDialog";
import SiteHeader from "./SiteHeader";

type Morph = { id: string; phase: "open" | "close"; from?: DOMRect };

export default function Portfolio() {
  const all = useMemo(() => getOrderedProjects(), []);
  const categories = useMemo(() => getCategories(), []);
  const [category, setCategory] = useState("All");
  const [index, setIndex] = useState(0);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [hiddenId, setHiddenId] = useState<string | null>(null); // 날아간 동안 숨길 원본 카드
  const [morph, setMorph] = useState<Morph | null>(null);
  const [closingDetail, setClosingDetail] = useState(false);
  const [panel, setPanel] = useState<"about" | "contact" | null>(null);

  const projects = useMemo(
    () => (category === "All" ? all : all.filter((p) => p.category === category)),
    [all, category],
  );
  const detail = projects.find((p) => p.id === detailId) ?? null;
  const dialogOpen = !!detail || !!panel;
  const nav: NavKey = panel ?? "work";
  const morphProject = morph ? all.find((p) => p.id === morph.id) : undefined;
  const morphNumber = morphProject
    ? String(Math.max(projects.findIndex((p) => p.id === morphProject.id), 0) + 1).padStart(2, "0")
    : "";

  const openProject = (id: string, face: HTMLElement) => {
    setHiddenId(id);
    setDetailId(id);
    setMorph({ id, phase: "open", from: face.getBoundingClientRect() });
  };
  const startClose = () => {
    if (detailId) {
      setClosingDetail(true);
      setMorph({ id: detailId, phase: "close" });
    }
  };
  const resetProject = () => {
    setClosingDetail(false);
    setDetailId(null);
    setHiddenId(null);
    setMorph(null);
  };

  return (
    <main className="app" data-over={panel ?? undefined}>
      <SiteHeader
        onHome={() => {
          resetProject();
          setPanel(null);
          setCategory("All");
          setIndex(0);
        }}
      />
      <CategoryFilters
        categories={categories}
        value={category}
        onChange={(c) => {
          setCategory(c);
          setIndex(0);
        }}
      />
      <ProjectCarousel
        projects={projects}
        index={Math.min(index, Math.max(projects.length - 1, 0))}
        onIndexChange={setIndex}
        onOpen={openProject}
        hiddenId={hiddenId}
        keyboardEnabled={!dialogOpen}
      />
      <FloatingNavigation
        active={nav}
        onSelect={(k) => {
          resetProject();
          setPanel(k === "work" ? null : k);
        }}
      />
      {detail && (
        <ProjectDetailDialog
          project={detail}
          mediaHidden={!!morph || closingDetail}
          onCloseStart={startClose}
          onClose={resetProject}
        />
      )}
      {morph && morphProject && (
        <CardMorph
          key={morph.phase + morph.id}
          project={morphProject}
          phase={morph.phase}
          from={morph.from}
          number={morphNumber}
          onDone={() => {
            if (morph.phase === "close") {
              setHiddenId(null);
            }
            setMorph(null);
          }}
        />
      )}
      {panel === "about" && <AboutDialog onClose={() => setPanel(null)} />}
      {panel === "contact" && <ContactDialog onClose={() => setPanel(null)} />}
    </main>
  );
}
