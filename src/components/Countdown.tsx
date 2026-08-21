import { useEffect, useState } from "react";
import { getRemaining, pad2, toBn } from "@/lib/birthday";
import { Sparkles, Heart } from "lucide-react";

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="glass-card scrapbook-shadow flex flex-col items-center justify-center rounded-2xl border border-gold/30 p-4 sm:p-6 min-w-[76px] sm:min-w-[100px] transition-transform hover:scale-105">
      <span className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-rose-deep drop-shadow-sm">
        {toBn(pad2(value))}
      </span>
      <span className="mt-2 text-[11px] sm:text-xs font-medium tracking-widest text-rose-deep/70 uppercase">
        {label}
      </span>
    </div>
  );
}

export function Countdown({ onReady }: { onReady: () => void }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const r = getRemaining(now ?? Date.now());
  const done = now !== null && r.total <= 0;

  return (
    <div className="animate-reveal relative z-10 mx-auto max-w-xl text-center px-4">
      {/* Decorative Top Badge */}
      <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-5 py-2 text-xs font-semibold tracking-wider text-rose-deep backdrop-blur-md">
        <Sparkles className="h-4 w-4 text-gold fill-gold" />
        <span className="font-sans uppercase">A Special Celebration</span>
        <Sparkles className="h-4 w-4 text-gold fill-gold" />
      </div>

      <p className="font-accent text-3xl sm:text-4xl text-gold italic font-normal">
        শুধু তোমার জন্য ভালোবাসা দিয়ে...
      </p>

      <h1 className="font-display mt-4 text-5xl sm:text-7xl font-bold tracking-tight text-rose-deep leading-tight">
        {done ? "আজ তোমার শুভ দিন!" : "আর একটুখানি অপেক্ষা..."}
      </h1>

      {now !== null && !done && (
        <div className="mt-10 flex items-center justify-center gap-3 sm:gap-6">
          <Unit value={r.hours} label="ঘণ্টা" />
          <span className="font-display text-3xl sm:text-5xl font-light text-gold animate-pulse">:</span>
          <Unit value={r.minutes} label="মিনিট" />
          <span className="font-display text-3xl sm:text-5xl font-light text-gold animate-pulse">:</span>
          <Unit value={r.seconds} label="সেকেন্ড" />
        </div>
      )}

      <p className="mx-auto mt-8 max-w-md text-base sm:text-lg leading-relaxed text-rose-deep/80">
        {done
          ? "রাত ১২টা বেজে গেছে! আমাদের রাজকন্যার জন্মদিনের বিশেষ সারপ্রাইজ অপেক্ষা করছে।"
          : "রাত ১২টা বাজলেই তোমার জন্য একটা জাদুকরী সারপ্রাইজ উন্মোচিত হবে।"}
      </p>

      <div className="mt-10">
        <button
          onClick={onReady}
          className="scrapbook-shadow group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-rose-deep via-rose-mid to-rose-deep px-8 py-4 text-base font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95"
        >
          <span className="relative z-10 flex items-center gap-2">
            {done ? "সারপ্রাইজ খোলো" : "আমি অপেক্ষা করতে পারছি না, খুলে দাও"}
            <Heart className="h-5 w-5 fill-rose-soft text-rose-soft transition-transform group-hover:scale-125" />
          </span>
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
        </button>
      </div>
    </div>
  );
}
