"use client";

import { useEffect, useState } from "react";
import { AnimatedLogo } from "@/components/animated-logo";
import NumberFlow from "@/components/prismui/number-flow";
import { cn } from "@/lib/utils";

const TARGET = new Date("2026-08-10T07:00:00+07:00");
const STORAGE_KEY = "bacii-theme";

type Theme = "light" | "dark";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const ZERO: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

function getTimeLeft(): TimeLeft {
  const diff = Math.max(0, TARGET.getTime() - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1000),
  };
}

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

function ThemeToggle({
  theme,
  onChange,
}: {
  theme: Theme | null;
  onChange: (next: Theme) => void;
}) {
  const cls = (mode: Theme) =>
    cn(
      "relative cursor-pointer px-1 duration-200 ease-[var(--ease-out)]",
      "transition-[color,transform] motion-safe:active:scale-[0.96]",
      "before:absolute before:-inset-x-2 before:-inset-y-4 before:content-['']",
      theme === mode ? "text-fg" : "text-fg-faint hover:text-fg-muted",
    );
  return (
    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.32em] sm:text-[11px]">
      <button
        type="button"
        onClick={() => onChange("light")}
        className={cls("light")}
      >
        light
      </button>
      <span aria-hidden className="text-fg-faint">
        /
      </span>
      <button
        type="button"
        onClick={() => onChange("dark")}
        className={cls("dark")}
      >
        dark
      </button>
    </div>
  );
}

export default function Page() {
  const [time, setTime] = useState<TimeLeft>(ZERO);
  const [mounted, setMounted] = useState(false);
  const [theme, setThemeState] = useState<Theme | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time mount guard to gate hydration-sensitive UI
    setMounted(true);
    const tick = () => setTime(getTimeLeft());
    tick();
    const id = setInterval(tick, 1000);

    const initial: Theme = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
    setThemeState(initial);

    return () => clearInterval(id);
  }, []);

  const setTheme = (next: Theme) => {
    setThemeState(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore storage errors (private mode, quota, etc.)
    }
  };

  return (
    <main className="relative grid h-svh min-h-[640px] grid-rows-[auto_1fr_auto] gap-6 px-6 pt-6 pb-5 sm:px-10 sm:pt-8 sm:pb-6 md:px-16 md:pt-10 md:pb-8">
      <h1 className="sr-only">
        BacII Countdown — days until the Cambodian Bac II national exam
      </h1>
      <p className="sr-only">
        BacII Countdown is a free, live timer counting down the days, hours,
        minutes, and seconds until the Cambodian Bac II (Baccalaureate II)
        national exam on 10 August 2026. Built for Grade 12 students preparing
        for the Cambodian national high-school exit examination.
      </p>
      <header className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1.5 font-mono text-[10px] uppercase tracking-[0.32em] sm:text-[11px]">
          <div className="flex items-center gap-2.5 text-fg">
            <span
              aria-hidden
              className="block h-1.5 w-1.5 rounded-full bg-glyph shadow-[0_0_12px_var(--glyph),0_0_4px_var(--glyph)]"
            />
            <span>Bac II</span>
          </div>
          <p className="ml-[15px] text-fg-muted">10 / 08 / 2026</p>
        </div>
        <ThemeToggle theme={theme} onChange={setTheme} />
      </header>

      <section className="flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-10">
        <div
          className="font-display tabular-nums text-fg [text-box:trim-both_cap_alphabetic] [&_*]:[text-box:trim-both_cap_alphabetic]"
          style={{
            fontSize: "clamp(7rem, 38vmin, 22rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 0.85,
            fontVariationSettings: '"ROND" 0',
          }}
        >
          <NumberFlow
            value={mounted ? time.days : 0}
            willChange
            spinTiming={{
              duration: 500,
              easing: "cubic-bezier(0.23, 1, 0.32, 1)",
            }}
          />
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.65em] text-fg sm:text-xs">
          days
        </p>
        <p
          className="font-mono text-xs tabular-nums tracking-[0.28em] text-fg-muted sm:text-sm"
          suppressHydrationWarning
        >
          {mounted ? (
            <>
              {pad(time.hours)}
              <span className="text-fg-faint">h</span>
              {"   "}
              {pad(time.minutes)}
              <span className="text-fg-faint">m</span>
              {"   "}
              {pad(time.seconds)}
              <span className="text-fg-faint">s</span>
            </>
          ) : (
            "00h  00m  00s"
          )}
        </p>
      </section>

      <footer className="flex items-end justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.28em] text-fg-faint">
        <a
          href="https://ctey.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-flex items-center gap-2 duration-200 ease-[var(--ease-out)] transition-[color,transform] hover:text-fg motion-safe:active:scale-[0.96] before:absolute before:-inset-x-1 before:-inset-y-3.5 before:content-['']"
        >
          <span>made by chintey</span>
          <AnimatedLogo size={14} />
        </a>
        <p>v.01 / cambodia</p>
      </footer>
    </main>
  );
}
