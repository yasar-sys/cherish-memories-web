/** জন্মদিন শুরু: ২২ আগস্ট ২০২৬, রাত ১২টা (ঢাকা সময়, UTC+6) */
export const BIRTHDAY_AT = new Date("2026-08-21T18:00:00Z");

export const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBn(value: number | string): string {
  return String(value).replace(/[0-9]/g, (d) => BN_DIGITS[Number(d)] ?? d);
}

export function pad2(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

export type Remaining = {
  total: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export function getRemaining(now: number): Remaining {
  const total = Math.max(0, BIRTHDAY_AT.getTime() - now);
  const s = Math.floor(total / 1000);
  return {
    total,
    hours: Math.floor(s / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}
