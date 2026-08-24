// Placeholder until MoEYS publishes the 2027 Bac II date. Same calendar day as 2026.
export const EXAM_START = "2027-08-10T07:00:00+07:00";
export const EXAM_START_MS = new Date(EXAM_START).getTime();

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function getTimeLeft(now = Date.now()): TimeLeft {
  const diff = Math.max(0, EXAM_START_MS - now);
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1000),
  };
}

export function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

export function isElapsed(time: TimeLeft): boolean {
  return (
    time.days === 0 &&
    time.hours === 0 &&
    time.minutes === 0 &&
    time.seconds === 0
  );
}
