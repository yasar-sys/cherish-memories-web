import { useEffect, useRef, useState } from "react";

export function MusicPlayer({ started }: { started: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!started) return;
    const el = audioRef.current;
    if (!el) return;
    el.volume = 0.55;
    void el
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, [started]);

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      void el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/nila.mp3" loop preload="auto" />
      <button
        onClick={toggle}
        aria-label={playing ? "গান বন্ধ করো" : "গান চালাও"}
        className="scrapbook-shadow fixed top-5 right-5 z-50 flex items-center gap-3 rounded-full border border-border bg-card/85 px-4 py-2 backdrop-blur-md transition-colors hover:bg-card"
      >
        <span className="flex h-4 items-end gap-[3px]">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`w-[3px] rounded-full bg-rose-deep ${playing ? "animate-flicker" : ""}`}
              style={{
                height: playing ? `${8 + i * 4}px` : "5px",
                animationDelay: `${i * 0.18}s`,
              }}
            />
          ))}
        </span>
        <span className="text-[11px] font-medium tracking-widest text-rose-deep/70 uppercase">
          {playing ? "বাজছে: নীলা" : "গান চালাও"}
        </span>
      </button>
    </>
  );
}
