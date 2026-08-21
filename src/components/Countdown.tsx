import { useEffect, useState } from "react";
import { getRemaining, pad2, toBn } from "@/lib/birthday";

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-display text-5xl font-light md:text-6xl">{toBn(pad2(value))}</span>
      <span className="mt-1 text-[10px] tracking-widest text-rose-deep/60 uppercase">{label}</span>
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
    <div className="animate-reveal text-center">
      <p className="font-accent text-2xl text-gold italic">শুধু তোমার জন্য</p>
      <h1 className="font-display mt-3 text-5xl italic tracking-tight text-rose-deep md:text-7xl">
        {done ? "সময় হয়ে গেছে" : "আর একটু অপেক্ষা"}
      </h1>

      {!done && (
        <div className="mt-10 flex items-baseline justify-center gap-5">
          <Unit value={r.hours} label="ঘণ্টা" />
          <span className="font-display text-4xl opacity-25">:</span>
          <Unit value={r.minutes} label="মিনিট" />
          <span className="font-display text-4xl opacity-25">:</span>
          <Unit value={r.seconds} label="সেকেন্ড" />
        </div>
      )}

      <p className="mx-auto mt-10 max-w-md text-lg leading-relaxed text-rose-deep/70">
        {done
          ? "রাত ১২টা বেজে গেছে। তোমার জন্মদিন শুরু — সারপ্রাইজটা খুলে ফেলো।"
          : "রাত ১২টা বাজলেই তোমার জন্য একটা সারপ্রাইজ খুলে যাবে।"}
      </p>

      <button
        onClick={onReady}
        className="scrapbook-shadow mt-10 rounded-sm bg-rose-deep px-10 py-4 text-primary-foreground transition-transform hover:scale-[1.03]"
      >
        {done ? "সারপ্রাইজ খোলো ♥" : "আমি অপেক্ষা করতে পারছি না, খুলে দাও"}
      </button>
    </div>
  );
}
