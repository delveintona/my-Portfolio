/**
 * 포트폴리오 콘텐츠 데이터 (교체용 플레이스홀더).
 * - 대괄호 [ ... ] 로 표시된 값은 실제 정보로 교체하세요.
 * - 이미지/영상 파일은 /public 아래에 넣고 "/폴더/파일명" 경로로 적습니다.
 * - 배열 순서가 곧 표시 순서이며, featured: true 인 프로젝트가 앞쪽에 먼저 나옵니다.
 */

export type PortfolioProject = {
  id: string;
  title: string; // [프로젝트명]
  subtitle?: string; // 한 줄 소개
  category: string; // FILM / MOTION 등
  year?: string;
  client?: string;
  projectType?: "client" | "personal" | "collaboration";
  role?: string[];
  duration?: string;
  thumbnail: string; // 카드 포스터 이미지
  aspectRatio?: "16/9" | "3/2" | "9/16" | "1/1";
  video?: {
    type: "file" | "youtube" | "vimeo";
    src: string; // file: "/videos/xxx.mp4" · youtube/vimeo: 임베드 URL
    poster?: string;
  };
  description?: string;
  credits?: string[];
  stills?: string[];
  externalLink?: string;
  featured?: boolean;
};

export const profile = {
  initials: "[이니셜]",
  name: "[이름]",
  tagline: "PORTFOLIO / FILM & MOTION",
  intro: "[자기소개를 입력하세요]",
  skills: [] as string[], // 예: ["촬영", "편집", "모션그래픽"]
  history: [] as { period: string; title: string }[], // 경력/학력
};

export const contact = {
  email: "", // 예: "name@example.com"
  socials: [] as { label: string; url: string }[], // 예: { label: "Instagram", url: "https://..." }
};

export const projectTypeLabel: Record<NonNullable<PortfolioProject["projectType"]>, string> = {
  client: "CLIENT WORK",
  personal: "PERSONAL WORK",
  collaboration: "COLLABORATION",
};

export const projects: PortfolioProject[] = [
  {
    id: "sample-1",
    title: "[프로젝트명 1]",
    subtitle: "[한 줄 소개]",
    category: "FILM",
    year: "[연도]",
    projectType: "personal",
    role: ["[역할]"],
    duration: "[00:00]",
    thumbnail: "/placeholder/poster-1.svg",
    aspectRatio: "16/9",
    description: "[프로젝트 설명을 입력하세요]",
    featured: true,
  },
  {
    id: "sample-2",
    title: "[프로젝트명 2]",
    subtitle: "[한 줄 소개]",
    category: "MOTION",
    year: "[연도]",
    projectType: "client",
    role: ["[역할]"],
    duration: "[00:00]",
    thumbnail: "/placeholder/poster-2.svg",
    aspectRatio: "16/9",
    description: "[프로젝트 설명을 입력하세요]",
    featured: true,
  },
  {
    id: "sample-3",
    title: "[프로젝트명 3]",
    subtitle: "[한 줄 소개]",
    category: "BRANDED",
    year: "[연도]",
    projectType: "client",
    role: ["[역할]"],
    duration: "[00:00]",
    thumbnail: "/placeholder/poster-3.svg",
    aspectRatio: "16/9",
    description: "[프로젝트 설명을 입력하세요]",
  },
  {
    id: "sample-4",
    title: "[프로젝트명 4 · 세로 영상]",
    subtitle: "[한 줄 소개]",
    category: "PERSONAL",
    year: "[연도]",
    projectType: "personal",
    role: ["[역할]"],
    duration: "[00:00]",
    thumbnail: "/placeholder/poster-4.svg",
    aspectRatio: "9/16",
    description: "[프로젝트 설명을 입력하세요]",
  },
];

/** featured 우선, 그 안/밖에서는 배열 순서 유지 */
export function getOrderedProjects(): PortfolioProject[] {
  return [...projects.filter((p) => p.featured), ...projects.filter((p) => !p.featured)];
}

export function getCategories(): string[] {
  return ["ALL", ...Array.from(new Set(projects.map((p) => p.category)))];
}
