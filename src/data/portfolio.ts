/**
 * 포트폴리오 콘텐츠 데이터.
 * - 대괄호 [ ... ] 로 표시된 값은 아직 입력되지 않은 플레이스홀더입니다.
 * - 빈 배열/빈 문자열은 화면에서 "입력하세요" 박스로 표시되거나 숨겨집니다.
 * - 이미지/영상 파일은 /public 아래에 넣고 "/폴더/파일명" 경로로 적습니다.
 * - 배열 순서가 곧 표시 순서이며, featured: true 인 프로젝트가 앞쪽에 먼저 나옵니다.
 */

export type PortfolioProject = {
  id: string;
  title: string;
  eyebrow?: string; // 상세 상단/카드 상단의 짧은 영문 부제 (없으면 카테고리 표시)
  subtitle?: string; // 한 줄 소개
  category: string; // 촬영 / 스탭 / vibe coding
  period?: string; // 카드 상단 문구 (기간, 건수 등)
  year?: string;
  client?: string;
  projectType?: "client" | "personal" | "collaboration";
  role?: string[];
  duration?: string;
  color?: string; // 카드 배경색
  thumbnail?: string; // 카드/상세 이미지 (없으면 color 사용)
  aspectRatio?: `${number}/${number}`; // 예: "16/9", "9/16", "1866/1049" (이미지 원본 비율)
  video?: {
    type: "file" | "youtube" | "vimeo";
    src: string; // file: "/videos/xxx.mp4" · youtube/vimeo: 임베드 URL
    poster?: string;
  };
  description?: string;
  contribution?: string;
  awards?: { year: string; text: string }[];
  credits?: string[];
  stills?: string[];
  links?: { label: string; url: string }[];
  featured?: boolean;
};

type Entry = { year: string; text: string }; // year 칸에는 연도 또는 구분 라벨

export const profile = {
  initials: "delveintona", // 좌측 상단 로고 텍스트
  nameKo: "정수민",
  nameEn: "[영문 이름]",
  headerLabel: "2026 PORTFOLIO /",
  photo: "", // 예: "/profile.jpg"
  about: "[한 줄 소개를 입력하세요]",
  interested: [] as string[], // 관심 분야
  character: [] as string[], // 성격/키워드 태그
  notes: ["병역명문가"] as string[], // 특이사항
  education: [
    { year: "초등", text: "오현초등학교 입학 → 이곡초등학교 전학 → 호원초등학교 졸업" },
    { year: "중등", text: "회룡중학교 졸업" },
    { year: "고등", text: "대동세무고등학교 세무회계과 졸업" },
    { year: "대학", text: "고려대학교 세종캠퍼스 글로벌경영학과 재학 · 학점 4.1 (2학년 1학기 기준)" },
  ] as Entry[],
  awards: [
    { year: "2026", text: "UIA 춘천 해커톤 우수상 (루트임팩트 대표상)" },
    { year: "2026", text: "일경험 프로젝트 PT 장려상 (고려대학교 라이즈 사업단)" },
    { year: "2021", text: "교내 일본어 콘텐츠 제작 장려상" },
  ] as Entry[],
  certificates: [
    { year: "2026", text: "SNS광고마케터 1급" },
    { year: "2026", text: "ACP 프리미어 프로" },
    { year: "2025", text: "운전면허 1종 대형" },
    { year: "2023", text: "운전면허 1종 보통" },
    { year: "2021", text: "FAT 1급" },
    { year: "2021", text: "ERP 회계 2급" },
    { year: "2021", text: "전산회계운용사 3급" },
    { year: "2020", text: "ITQ (엑셀, 한글)" },
  ] as Entry[],
  activities: [
    { year: "동아리", text: "영상놀 — 영화동아리 (연출 담당)" },
    { year: "동아리", text: "무단외박 — 밴드부 (홍보 담당)" },
    { year: "동아리", text: "글사랑 — 문집 제작 (시, 소설 집필)" },
    { year: "동아리", text: "레전드 — 농구부" },
    { year: "서포터즈", text: "UIA SNS 운영팀" },
    { year: "활동", text: "UIA 춘천 해커톤 · 2026 사회적가치페스타 · 2026 국제경주포럼" },
    { year: "창업캠프", text: "Union 창업 캠프 · UI/UX 창업 캠프" },
    { year: "여행", text: "서울역~전주역 9박 10일 도보 · 파주~대전역 도보" },
  ] as Entry[],
  experience: [
    { year: "촬영", text: "단편영화 촬영팀 2건 (늪에 비친 새, 미국 영화)" },
    { year: "촬영", text: "상업 광고 촬영팀 3건" },
    { year: "촬영", text: "소규모 스튜디오 촬영감독 · 『밥 식기 전에 들어와』, 『신도림 사이코』" },
    { year: "촬영", text: "UIA SNS 운영 및 촬영 (3개월)" },
    { year: "촬영", text: "고연전 불꽃응원단 전담 촬영 (2개월)" },
    { year: "연출", text: "단편영화 연출팀 1건" },
    { year: "인턴", text: "세종테크노파크 2주 인턴 (일경험 프로젝트) · 장려상" },
    { year: "군", text: "운전병 및 운전 부사관 1년 6개월 · 간부 6개월 (병사+간부 15,000km 운행, 행정처리 담당)" },
    { year: "알바", text: "수영장 안전요원 40일 (하루 7~8시간)" },
    { year: "알바", text: "흠뻑쇼 사전 3일 · 당일 행사 스탭 2일" },
    { year: "알바", text: "이마트 7일 · 코스트코 5일 · 상하차 7일 · 쿠팡이츠 배달파트너(도보)" },
  ] as Entry[],
};

export const contact = {
  email: "", // 예: "name@example.com"
  socials: [{ label: "Naver Blog", url: "https://blog.naver.com/delveintona" }] as { label: string; url: string }[],
};

export const projectTypeLabel: Record<NonNullable<PortfolioProject["projectType"]>, string> = {
  client: "CLIENT WORK",
  personal: "PERSONAL WORK",
  collaboration: "COLLABORATION",
};

export const projects: PortfolioProject[] = [
  {
    id: "short-film-camera",
    title: "단편영화 촬영팀",
    subtitle: "단편영화 2건 참여",
    category: "촬영",
    period: "2건",
    color: "#2b4fd6",
    role: ["촬영팀"],
    description: "단편영화 촬영팀으로 2건 참여했습니다.\n- 늪에 비친 새\n- 미국 영화",
    featured: true,
  },
  {
    id: "commercial-camera",
    title: "상업 광고 촬영팀",
    subtitle: "상업 광고 3건 참여",
    category: "촬영",
    period: "3건",
    color: "#3f9a5a",
    role: ["촬영팀"],
    projectType: "client",
    description: "상업 광고 촬영팀으로 3건 참여했습니다.",
    featured: true,
  },
  {
    id: "babsikgi",
    title: "『밥 식기 전에 들어와』",
    subtitle: "소규모 스튜디오 · 촬영감독",
    category: "촬영",
    period: "촬영감독",
    color: "#d9663f",
    role: ["촬영감독"],
    description: "소규모 스튜디오에서 촬영감독으로 참여한 영화입니다.",
    featured: true,
  },
  {
    id: "sindorim-psycho",
    title: "『신도림 사이코』",
    subtitle: "소규모 스튜디오 · 촬영감독",
    category: "촬영",
    period: "촬영감독",
    color: "#7442d6",
    role: ["촬영감독"],
    description: "소규모 스튜디오에서 촬영감독으로 참여한 영화입니다.",
    featured: true,
  },
  {
    id: "uia-sns",
    title: "UIA SNS 운영 및 촬영",
    subtitle: "서포터즈 SNS 운영팀",
    category: "촬영",
    period: "3개월",
    color: "#a8913a",
    role: ["SNS 운영", "촬영"],
    description: "UIA SNS 운영팀으로 3개월간 SNS를 운영하고 촬영했습니다.",
  },
  {
    id: "koyeon-cheer",
    title: "고연전 불꽃응원단 전담 촬영",
    subtitle: "응원단 전담 촬영",
    category: "촬영",
    period: "2개월",
    color: "#9a6a82",
    role: ["전담 촬영"],
    description: "고연전 불꽃응원단의 전담 촬영을 2개월간 맡았습니다.",
  },
  {
    id: "short-film-directing",
    title: "단편영화 연출팀",
    subtitle: "단편영화 1건 참여",
    category: "스탭",
    period: "1건",
    color: "#7a5ab8",
    role: ["연출팀"],
    description: "단편영화 연출팀으로 1건 참여했습니다.",
  },
  {
    id: "waterbomb-staff",
    title: "흠뻑쇼 스탭",
    subtitle: "사전 3일 · 당일 행사 2일",
    category: "스탭",
    period: "5일",
    color: "#c2603f",
    role: ["행사 스탭"],
    description: "흠뻑쇼에서 사전 작업 3일, 당일 행사 스탭 2일을 근무했습니다.",
  },
  {
    id: "solopd",
    title: "솔로PD",
    subtitle: "1인 유튜버를 위한 실시간 AI 독백 프롬프터",
    category: "vibe coding",
    period: "WEB",
    color: "#2a8c8c",
    projectType: "personal",
    role: ["기획", "개발"],
    thumbnail: "/projects/solopd.png",
    aspectRatio: "1866/1049",
    description: "1인 유튜버들을 위한 실시간 AI 독백 프롬프터 웹 서비스입니다.",
    links: [{ label: "solopd.vercel.app", url: "https://solopd.vercel.app" }],
  },
  {
    id: "drivers-guide",
    title: "운전병 가이드",
    subtitle: "운전병을 위한 차폭감 가이드 웹",
    category: "vibe coding",
    period: "WEB",
    color: "#4a6a3a",
    projectType: "personal",
    role: ["기획", "개발"],
    thumbnail: "/projects/drivers-guide.webp",
    aspectRatio: "2000/1250",
    description: "운전병들을 위한 차폭감 가이드 웹입니다.",
    links: [{ label: "driver-s-guide.vercel.app", url: "https://driver-s-guide.vercel.app/" }],
  },
  {
    id: "diary-alarm",
    title: "일기와 알람",
    subtitle: "계획을 써야 꺼지는 알람 + 일기 기반 음악 생성",
    category: "vibe coding",
    period: "APP",
    color: "#b4456a",
    projectType: "personal",
    role: ["기획", "개발"],
    thumbnail: "/projects/diary-alarm.png",
    aspectRatio: "626/1337",
    description:
      "알람을 끄려면 오늘의 계획을 써야 하고, 저녁에는 하루 일과와 일기를 토대로 나만의 음악을 생성하는 앱입니다.",
  },
];

/** featured 우선, 그 안/밖에서는 배열 순서 유지 */
export function getOrderedProjects(): PortfolioProject[] {
  return [...projects.filter((p) => p.featured), ...projects.filter((p) => !p.featured)];
}

export function getCategories(): string[] {
  return ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
}
