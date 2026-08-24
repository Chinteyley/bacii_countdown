"use client";

import { useEffect, useState } from "react";
import NumberFlow from "@/components/prismui/number-flow";
import { getTimeLeft, isElapsed, pad, type TimeLeft } from "@/lib/countdown";
import { EXAM_DATE_ISO, EXAM_DATE_LONG } from "@/lib/seo";

export function Countdown({ initial }: { initial: TimeLeft }) {
  const [time, setTime] = useState<TimeLeft>(initial);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const tick = () => setTime(getTimeLeft());
    tick();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- swap to the animated digits after the server-rendered count is in the HTML
    setLive(true);
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
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
        {live ? (
          <NumberFlow
            value={time.days}
            willChange
            spinTiming={{
              duration: 500,
              easing: "cubic-bezier(0.23, 1, 0.32, 1)",
            }}
          />
        ) : (
          <span>{time.days}</span>
        )}
      </div>
      <p className="font-mono text-[11px] uppercase tracking-[0.65em] text-fg sm:text-xs">
        days
      </p>
      {isElapsed(time) ? (
        <p className="font-mono text-xs tracking-[0.18em] text-fg-muted sm:text-sm">
          <time dateTime={EXAM_DATE_ISO}>{EXAM_DATE_LONG}</time>
        </p>
      ) : (
        <p className="font-mono text-xs tabular-nums tracking-[0.28em] text-fg-muted sm:text-sm">
          {pad(time.hours)}
          <span className="text-fg-faint">h</span>
          {"   "}
          {pad(time.minutes)}
          <span className="text-fg-faint">m</span>
          {"   "}
          {pad(time.seconds)}
          <span className="text-fg-faint">s</span>
        </p>
      )}
    </>
  );
}
