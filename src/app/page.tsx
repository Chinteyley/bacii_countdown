import { AnimatedLogo } from "@/components/animated-logo";
import { Countdown } from "@/components/countdown";
import { ThemeToggle } from "@/components/theme-toggle";
import { getTimeLeft } from "@/lib/countdown";
import {
  EXAM_DATE_ISO,
  EXAM_DATE_LABEL,
  PAGE_HEADING,
} from "@/lib/seo";

export default function Page() {
  const initial = getTimeLeft();

  return (
    <main className="relative grid h-svh min-h-[640px] grid-rows-[auto_1fr_auto] gap-6 px-6 pt-6 pb-5 sm:px-10 sm:pt-8 sm:pb-6 md:px-16 md:pt-10 md:pb-8">
      <header className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1.5 font-mono text-[10px] uppercase tracking-[0.32em] sm:text-[11px]">
          <div className="flex items-center gap-2.5 text-fg">
            <span
              aria-hidden
              className="block h-1.5 w-1.5 rounded-full bg-glyph shadow-[0_0_12px_var(--glyph),0_0_4px_var(--glyph)]"
            />
            <span>Bac II</span>
          </div>
          <p className="ml-[15px] text-fg-muted">
            <time dateTime={EXAM_DATE_ISO}>{EXAM_DATE_LABEL}</time>
          </p>
        </div>
        <ThemeToggle />
      </header>

      <section className="flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-10">
        <h1 className="text-center font-mono text-sm uppercase tracking-[0.2em] text-fg sm:text-base">
          {PAGE_HEADING}
        </h1>
        <Countdown initial={initial} />
        <p className="max-w-[26rem] text-center font-sans text-sm leading-relaxed text-fg">
          Cambodia&apos;s Grade 12 Bac II exam is on{" "}
          <time dateTime={EXAM_DATE_ISO}>10 August 2026</time>.
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
