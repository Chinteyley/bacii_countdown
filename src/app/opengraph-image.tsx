import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Khmer New Year Countdown";
export const size = { width: 1200, height: 630 } as const;
export const contentType = "image/png";

const DAY_MS = 86_400_000;

function nextKhmerNewYear(): Date {
  // April 14 00:00 ICT (UTC+7) === April 13 17:00 UTC.
  const now = Date.now();
  const year = new Date(now).getUTCFullYear();
  const thisYear = Date.UTC(year, 3, 13, 17, 0, 0);
  return new Date(now < thisYear ? thisYear : Date.UTC(year + 1, 3, 13, 17, 0, 0));
}

function daysLeft(): number {
  const diff = Math.max(0, nextKhmerNewYear().getTime() - Date.now());
  return Math.floor(diff / DAY_MS);
}

async function loadFont(url: string): Promise<ArrayBuffer | null> {
  try {
    const res = await fetch(url, { cache: "force-cache" });
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

const GLYPH = "#E04A2A";
const BG = "#080808";
const FG = "#F5F5F5";
const FG_MUTED = "#9A9A9A";

export default async function OpenGraphImage() {
  const days = daysLeft();
  const display = String(days).padStart(2, "0");

  const [doto, interBold, jetbrainsMono] = await Promise.all([
    loadFont(
      "https://cdn.jsdelivr.net/fontsource/fonts/doto@latest/latin-700-normal.ttf",
    ),
    loadFont(
      "https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-700-normal.ttf",
    ),
    loadFont(
      "https://cdn.jsdelivr.net/fontsource/fonts/jetbrains-mono@latest/latin-500-normal.ttf",
    ),
  ]);

  type FontEntry = {
    name: string;
    data: ArrayBuffer;
    weight: 500 | 700;
    style: "normal";
  };
  const fonts: FontEntry[] = [];
  if (doto) {
    fonts.push({
      name: "Display",
      data: doto,
      weight: 700,
      style: "normal",
    });
  } else if (interBold) {
    fonts.push({
      name: "Display",
      data: interBold,
      weight: 700,
      style: "normal",
    });
  }
  if (jetbrainsMono) {
    fonts.push({
      name: "Mono",
      data: jetbrainsMono,
      weight: 500,
      style: "normal",
    });
  }

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "32px",
        background: BG,
        color: FG,
        padding: "64px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "26px",
          fontFamily: "Mono",
          fontSize: "64px",
          fontWeight: 500,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: FG,
          paddingLeft: "46px",
        }}
      >
        <div
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "10px",
            background: GLYPH,
            boxShadow: `0 0 32px ${GLYPH}, 0 0 12px ${GLYPH}`,
            marginLeft: "-46px",
          }}
        />
        <span>Khmer New Year in</span>
      </div>

      <div
        style={{
          display: "flex",
          fontFamily: "Display",
          fontWeight: 700,
          fontSize: "300px",
          lineHeight: 0.82,
          fontVariantNumeric: "tabular-nums",
          color: FG,
        }}
      >
        {display}
      </div>

      <div
        style={{
          fontFamily: "Mono",
          fontSize: "64px",
          fontWeight: 500,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: FG_MUTED,
          paddingLeft: "0.16em",
        }}
      >
        days
      </div>
    </div>,
    {
      ...size,
      ...(fonts.length > 0 ? { fonts } : {}),
    },
  );
}
