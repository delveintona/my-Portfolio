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
  eyebrow?: string; // 카드 상단/상세 상단의 짧은 영문 부제 (없으면 카테고리 표시)
  subtitle?: string; // 한 줄 소개
  category: string; // 키스탭(주도·책임진 작업) / 스탭 / 기획 / vibe coding
  period?: string; // 카드 상단 문구 (기간, 건수 등)
  year?: string;
  client?: string;
  projectType?: "client" | "personal" | "collaboration";
  role?: string[];
  duration?: string;
  color?: string; // 카드 배경색
  thumbnail?: string; // 카드 뒷면/상세 이미지 (없으면 color 사용)
  aspectRatio?: `${number}/${number}`; // 예: "16/9", "9/16", "1866/1049" (이미지 원본 비율)
  video?: {
    type: "file" | "youtube" | "vimeo";
    src: string; // file: "/videos/xxx.mp4" · youtube/vimeo: 임베드 URL
    poster?: string;
  };
  objective?: string; // 무엇을 하려 했나 (1~2줄)
  strategy?: string; // 어떻게 했나 (1~2줄)
  outcome?: string; // 결과 (1~2줄)
  tools?: string[]; // 사용 도구
  when?: string; // PERIOD 칸에 표시할 기간
  description?: string; // (대체용) 긴 설명이 꼭 필요할 때만
  contribution?: string;
  awards?: { year: string; text: string }[];
  credits?: string[];
  stills?: string[];
  links?: { label: string; url: string }[];
  featured?: boolean;
};

type Entry = { year: string; text: string }; // year 칸에는 연도/기간 또는 구분 라벨

export const profile = {
  initials: "delveintona", // 좌측 상단 로고 텍스트
  nameKo: "정수민",
  nameEn: "Jung Sumin",
  headerLabel: "2026 Portfolio /",
  photo: "/profile.webp",
  about: "사람의 시선에 대해서 탐구하는 중입니다.",
  interested: ["영상 제작", "컬러 그레이딩", "영상 기획", "마케팅"],
  character: ["깊은", "조용한", "실행력 있는", "무모한"],
  notes: ["2026 병역명문가 선정"] as string[], // 특이사항
  education: [
    { year: "2027.03 ~", text: "고려대학교 세종캠퍼스 인문학과 문화산업 (제2전공)" },
    { year: "2023.03 ~", text: "고려대학교 세종캠퍼스 글로벌경영학과 재학 (학점 4.1 / 4.5, 2학년 1학기 기준)" },
    { year: "2020.03 ~ 2023.02", text: "대동세무고등학교 세무회계과 졸업" },
  ] as Entry[],
  awards: [
    { year: "2026", text: "UIA 춘천 해커톤 우수상 — 루트임팩트 대표 (『Volume Up!』)" },
    { year: "2026", text: "일경험 프로젝트 최종 발표 장려상 — 고려대학교 RISE사업단" },
    { year: "2021", text: "교내 일본어 콘텐츠 제작 장려상 — 대동세무고등학교 (「아무것도 아니야」 뮤직비디오)" },
  ] as Entry[],
  certificates: [
    { year: "2026", text: "ACP Premiere Pro (Adobe)" },
    { year: "2026", text: "SNS광고마케터 1급 (한국생산성본부)" },
    { year: "2025", text: "1종 대형 운전면허" },
    { year: "2023", text: "1종 보통 운전면허" },
    { year: "2021", text: "FAT 1급 (한국공인회계사회)" },
    { year: "2021", text: "ERP 정보관리사 회계 2급" },
    { year: "2021", text: "전산회계운용사 3급 (대한상공회의소)" },
    { year: "2020", text: "ITQ 엑셀 · 한글 (한국생산성본부)" },
  ] as Entry[],
  activities: [
    { year: "2026.07 ~", text: "UIA (대학 임팩트 얼라이언스, 9개 대학 11개 캠퍼스 연합)\nSNS팀 팀장 · 2026 춘천 해커톤 참여 (우수상)" },
    { year: "동아리", text: "영상놀 (2026-2) — 고려대 세종캠퍼스 영화 동아리, 연출 담당\n글사랑 (2026) — 문집 제작, 시·소설 집필\n무단외박 (2023) — 밴드부, 홍보 담당\n레전드 — 농구부" },
    { year: "2026", text: "2026 사회적가치페스타 · 2026 국제경주포럼" },
    { year: "창업캠프", text: "Union 창업 캠프 · UI/UX 창업 캠프" },
  ] as Entry[],
  experience: [
    { year: "2026.07 ~", text: "UIA SNS팀 팀장 — 9개 대학 11개 캠퍼스 연합 공식 SNS 기획·운영, 행사 촬영 및 하이라이트·숏폼 제작" },
    { year: "2026.08 ~ 10", text: "고연전 불꽃응원단 전담 촬영 — 정기 연습부터 공연까지 활동 전 과정 기록" },
    { year: "2026.06 ~ 07", text: "세종테크노파크 일경험 프로젝트 2주 인턴 — 세종시 지역 기업 지원사업의 강점·문제점 분석 및 개선안 도출, 최종 발표 장려상" },
    { year: "2024.02 ~ 2026.02", text: "육군 제6사단 GOP 수송부 운전병 → 운전부사관(하사 전역) — 병사·간부 통산 15,000km 운행, 수송부 행정·공문 담당" },
    { year: "촬영감독", text: "『밥 식기 전에 들어와』, 『신도림 사이코』 — 결 스튜디오 단편영화" },
    { year: "촬영팀", text: "『늪에 비친 새』(독립 단편영화), 미국 단편영화(해외 제작) — 모두 공개 전\n상업 광고 3건 — 리코브, 아큐브, 도화엔지니어링" },
    { year: "연출팀", text: "단편영화 『청소』" },
  ] as Entry[],
};

export const contact = {
  email: "suminj0407@naver.com",
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
    eyebrow: "Short Film · Camera Team",
    subtitle: "단편영화 2건 참여",
    category: "스탭",
    period: "2건",
    color: "#2b4fd6",
    role: ["촬영팀"],
    objective: "『늪에 비친 새』와 미국 단편영화, 두 작품의 촬영팀으로 참여했습니다.",
    strategy: "현장 촬영을 도우며 한 컷을 만들기 위해 팀이 움직이는 방식을 익혔습니다.",
    outcome: "두 작품 모두 공개 전입니다.",
    featured: true,
  },
  {
    id: "commercial-camera",
    title: "상업 광고 촬영팀",
    eyebrow: "Commercial · Camera Team",
    subtitle: "리코브 · 아큐브 · 도화엔지니어링",
    category: "스탭",
    period: "3건",
    color: "#3f9a5a",
    role: ["촬영팀"],
    projectType: "client",
    objective: "리코브, 아큐브, 도화엔지니어링 광고 3건에 촬영팀으로 참여했습니다.",
    strategy: "정해진 시간 안에 컷을 확보해야 하는 광고 현장의 촬영 흐름을 경험했습니다.",
    featured: true,
  },
  {
    id: "babsikgi",
    title: "『밥 식기 전에 들어와』",
    eyebrow: "Short Film · Director of Photography",
    subtitle: "결 스튜디오 단편영화",
    category: "키스탭",
    period: "촬영감독",
    color: "#d9663f",
    role: ["촬영감독"],
    objective: "결 스튜디오 단편영화에서 촬영감독을 맡았습니다.",
    strategy: "작품 분위기에 맞는 구도와 촬영 방식을 정하고 현장 촬영을 이끌었습니다.",
    featured: true,
  },
  {
    id: "sindorim-psycho",
    title: "『신도림 사이코』",
    eyebrow: "Short Film · Director of Photography",
    subtitle: "결 스튜디오 단편영화",
    category: "키스탭",
    period: "촬영감독",
    color: "#7442d6",
    role: ["촬영감독"],
    objective: "결 스튜디오 단편영화에서 촬영감독을 맡았습니다.",
    strategy: "장면의 긴장감을 살리는 카메라 움직임과 구도를 설계했습니다.",
    featured: true,
  },
  {
    id: "uia-sns",
    title: "UIA SNS 운영 및 촬영",
    eyebrow: "Social Media · Team Lead",
    subtitle: "9개 대학 11개 캠퍼스 연합 · SNS팀 팀장",
    category: "키스탭",
    period: "2026.07 ~ 현재",
    color: "#a8913a",
    role: ["SNS팀 팀장", "행사 촬영", "숏폼 제작"],
    objective: "연합 공식 SNS를 기획·운영하며 행사를 알립니다.",
    strategy: "행사를 직접 촬영해 하이라이트와 숏폼 영상으로 제작합니다.",
    when: "2026.07 ~ 현재",
  },
  {
    id: "koyeon-cheer",
    title: "고연전 불꽃응원단 전담 촬영",
    eyebrow: "Documentation · Cheer Squad",
    subtitle: "응원단 활동 전 과정 기록",
    category: "키스탭",
    period: "2026.08 ~ 2026.10",
    color: "#9a6a82",
    role: ["전담 촬영"],
    objective: "응원단의 활동을 처음부터 끝까지 영상으로 기록했습니다.",
    strategy: "정기 연습부터 공연까지 2개월 동안 전담으로 촬영했습니다.",
    when: "2026.08 ~ 2026.10",
  },
  {
    id: "music-video-nothing",
    title: "「아무것도 아니야」 뮤직비디오",
    eyebrow: "Music Video · School Project",
    subtitle: "일본어 콘텐츠 제작 과제",
    category: "키스탭",
    period: "2021",
    color: "#c2603f",
    role: ["PD", "기획", "촬영", "배우 섭외"],
    objective: "일본어 콘텐츠 제작 과제로 뮤직비디오를 만들었습니다.",
    strategy: "PD로서 기획, 촬영, 배우 섭외까지 전 과정을 직접 맡았습니다.",
    awards: [{ year: "2021", text: "교내 일본어 콘텐츠 제작 장려상 — 대동세무고등학교" }],
    when: "2021",
  },
  {
    id: "short-film-directing",
    title: "『청소』",
    eyebrow: "Short Film · Directing Team",
    subtitle: "단편영화 연출팀",
    category: "스탭",
    period: "단편영화",
    color: "#7a5ab8",
    role: ["연출팀"],
    objective: "단편영화 『청소』에서 연출팀으로 참여했습니다.",
    strategy: "촬영 전 준비부터 현장 진행까지 연출 파트를 도왔습니다.",
  },
  {
    id: "volume-up",
    title: "Volume Up!",
    eyebrow: "Public Service Design",
    subtitle: "청소년이 소리를 고르고 직접 운영하는 청소년도서관 2층",
    category: "기획",
    period: "UIA 춘천 해커톤",
    color: "#1f78c8",
    projectType: "collaboration",
    thumbnail: "/projects/volume-up.webp",
    aspectRatio: "922/1306",
    role: ["기획", "현장조사"],
    objective: "청소년이 찾지 않는 춘천시립청소년도서관 2층을 청소년 공간으로 되돌립니다.",
    strategy: "2층을 소리 크기별로 나누고, 중·고교 동아리가 모인 운영위원회가 직접 운영합니다.",
    awards: [{ year: "2026", text: "UIA 춘천 해커톤 우수상 — 루트임팩트 대표" }],
    when: "2026",
  },
  {
    id: "sejong-rookie-label",
    title: "세종 루키 레이블",
    eyebrow: "Youth Culture Living Lab",
    subtitle: "대학생 크루와 공연동아리가 함께 만드는 청소년 문화 리빙랩",
    category: "기획",
    period: "2026 · 2차 발표평가",
    color: "#2f9e8f",
    projectType: "collaboration",
    role: ["기획", "조사", "설계", "발표 자료 제작"],
    objective: "학교 무대 다음으로 가는 길을 모르는 공연동아리 청소년의 막막함을 풀어 줍니다.",
    strategy: "대학생 크루와 한 팀이 되어 대학 축제 무대를 활용하고, 리빙랩 5단계로 검증합니다.",
    outcome: "2026 세종한두리캠퍼스 글로벌 리빙랩 공모전 2차 발표평가 진출 (팀 온동네).",
    when: "2026",
  },
  {
    id: "solopd",
    title: "솔로PD",
    eyebrow: "AI Prompter · Web",
    subtitle: "1인 유튜버를 위한 실시간 AI 독백 프롬프터",
    category: "vibe coding",
    period: "WEB · 1주",
    color: "#2a8c8c",
    projectType: "personal",
    role: ["기획", "디자인", "개발"],
    thumbnail: "/projects/solopd.png",
    aspectRatio: "1866/1049",
    objective: "혼자 촬영하는 1인 유튜버 곁에서 흐름을 잡아 주는 현장 PD가 되어 줍니다.",
    strategy: "기획서와 콘티를 올리면 촬영 중 발화를 듣고 실시간으로 흐름을 코칭합니다.",
    outcome: "웹으로 배포해 사용 중입니다.",
    tools: ["Gemini API", "Vercel", "Claude Code"],
    links: [{ label: "solopd.vercel.app", url: "https://solopd.vercel.app" }],
    when: "제작 1주",
  },
  {
    id: "drivers-guide",
    title: "운전병 가이드",
    eyebrow: "Driving Simulator · Web",
    subtitle: "운전병을 위한 차폭감 가이드 웹",
    category: "vibe coding",
    period: "WEB · 1일",
    color: "#4a6a3a",
    projectType: "personal",
    role: ["기획", "디자인", "개발"],
    thumbnail: "/projects/drivers-guide.webp",
    aspectRatio: "2000/1250",
    objective: "운전병 복무 경험에서 출발해 차폭감을 눈으로 익히게 합니다.",
    strategy: "굴절, S자, T자 코스를 위에서 본 화면과 운전석 시점, 사이드미러로 연습합니다.",
    outcome: "웹으로 배포했습니다.",
    tools: ["Claude Code", "Vercel"],
    links: [{ label: "driver-s-guide.vercel.app", url: "https://driver-s-guide.vercel.app/" }],
    when: "제작 1일",
  },
  {
    id: "diary-alarm",
    title: "일기와 알람",
    eyebrow: "Diary & Alarm · Mobile App",
    subtitle: "계획을 써야 꺼지는 알람 + 일기 기반 음악 생성",
    category: "vibe coding",
    period: "APP · 1주",
    color: "#b4456a",
    projectType: "personal",
    role: ["기획", "디자인", "개발"],
    thumbnail: "/projects/diary-alarm.png",
    aspectRatio: "626/1337",
    objective: "알람을 끄려면 오늘의 계획을 쓰게 해 하루를 시작하게 합니다.",
    strategy: "저녁에 쓴 일기와 하루 일과를 바탕으로 나만의 노래를 만들어 줍니다.",
    outcome: "개발 중입니다. 아직 배포 전입니다.",
    tools: ["Supabase", "Google Lyria", "Claude Code"],
    when: "제작 1주",
  },
];

/** featured 우선, 그 안/밖에서는 배열 순서 유지 */
export function getOrderedProjects(): PortfolioProject[] {
  return [...projects.filter((p) => p.featured), ...projects.filter((p) => !p.featured)];
}

const CATEGORY_ORDER = ["키스탭", "스탭", "기획", "vibe coding"];

export function getCategories(): string[] {
  const present = new Set(projects.map((p) => p.category));
  const ordered = CATEGORY_ORDER.filter((c) => present.has(c));
  const rest = Array.from(present).filter((c) => !CATEGORY_ORDER.includes(c));
  return ["All", ...ordered, ...rest];
}
