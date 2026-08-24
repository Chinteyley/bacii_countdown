"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "bacii-theme";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const [theme, setThemeState] = useState<Theme | null>(null);

  useEffect(() => {
    const initial: Theme = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read theme after mount to match the pre-paint script
    setThemeState(initial);
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
        onClick={() => setTheme("light")}
        className={cls("light")}
      >
        light
      </button>
      <span aria-hidden className="text-fg-faint">
        /
      </span>
      <button
        type="button"
        onClick={() => setTheme("dark")}
        className={cls("dark")}
      >
        dark
      </button>
    </div>
  );
}
