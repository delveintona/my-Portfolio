"use client";

import { useMemo, useState } from "react";
import { getCategories, getOrderedProjects } from "@/data/portfolio";
import CategoryFilters from "./CategoryFilters";
import FloatingNavigation, { type NavKey } from "./FloatingNavigation";
import { AboutDialog, ContactDialog } from "./InfoDialog";
import ProjectCarousel from "./ProjectCarousel";
import ProjectDetailDialog from "./ProjectDetailDialog";
import SiteHeader from "./SiteHeader";

export default function Portfolio() {
  const all = useMemo(() => getOrderedProjects(), []);
  const categories = useMemo(() => getCategories(), []);
  const [category, setCategory] = useState("All");
  const [index, setIndex] = useState(0);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [panel, setPanel] = useState<"about" | "contact" | null>(null);

  const projects = useMemo(
    () => (category === "All" ? all : all.filter((p) => p.category === category)),
    [all, category],
  );
  const detail = projects.find((p) => p.id === detailId) ?? null;
  const dialogOpen = !!detail || !!panel;
  const nav: NavKey = panel ?? "work";

  return (
    <main className="app" data-over={!!panel}>
      <SiteHeader />
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
        onOpen={setDetailId}
        keyboardEnabled={!dialogOpen}
      />
      <FloatingNavigation
        active={nav}
        onSelect={(k) => {
          setDetailId(null);
          setPanel(k === "work" ? null : k);
        }}
      />
      {detail && <ProjectDetailDialog project={detail} onClose={() => setDetailId(null)} />}
      {panel === "about" && <AboutDialog onClose={() => setPanel(null)} />}
      {panel === "contact" && <ContactDialog onClose={() => setPanel(null)} />}
    </main>
  );
}
