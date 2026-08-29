import { JOMNOUY_URL } from "@/lib/seo";

export function JomnouyBanner() {
  return (
    <a
      href={JOMNOUY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="flex shrink-0 items-center justify-center gap-2 border-b border-rule bg-bg-edge px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-fg-muted duration-200 ease-[var(--ease-out)] transition-colors hover:bg-bg hover:text-fg sm:tracking-[0.28em]"
    >
      <span className="text-fg">Jomnouy</span>
      <span aria-hidden className="text-fg-faint">
        ·
      </span>
      <span>Bac II study tools</span>
      <span aria-hidden className="text-fg-faint">
        →
      </span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
