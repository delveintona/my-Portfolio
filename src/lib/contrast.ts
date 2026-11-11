/**
 * 모든 카드의 글자색을 한 가지(밝은색)로 통일하기 위해,
 * 밝아서 흰 글자 대비가 모자란 배경색만 대비 4.7:1이 될 때까지 살짝 어둡게 만든다 (WCAG).
 */
const LIGHT = "#fdfcfa";
const TARGET = 4.7;

function toRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16)) as [number, number, number];
}

function lum([r, g, b]: [number, number, number]): number {
  const [R, G, B] = [r, g, b].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

function ratio(a: [number, number, number], b: [number, number, number]): number {
  const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
}

export function cardColor(background: string | undefined): string | undefined {
  if (!background || !/^#[0-9a-f]{3,6}$/i.test(background)) return background;
  const light = toRgb(LIGHT);
  let rgb = toRgb(background);
  for (let i = 0; i < 40 && ratio(rgb, light) < TARGET; i++) {
    rgb = rgb.map((v) => Math.round(v * 0.96)) as [number, number, number];
  }
  return `#${rgb.map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}
