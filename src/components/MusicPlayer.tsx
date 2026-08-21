import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Music, Disc, FileText } from "lucide-react";

export const NILA_LYRICS = `তোমার চোখে
চেয়ে দেখি আমি জীবনটাকে
ভালোবাসার স্মৃতিগুলো
তোমাকে শুধু চায়

কিছু কথা
কিছু আশা নিয়ে জীবনটাতে
অনাবিল সব সুখের ছোঁয়ায়
তোমাকে কাছে চাই

ওই সুদূর নীলিমায়
মন হারিয়ে যেতে চায়
যেথায় সময় থেমে রয়
তোমারই আশায়

নীলা, তুমি কি চাও না হারাতে ওই নীলিমায়
যেখানে দু'টি মন এক হয়ে ছবির মতো জেগে রয়

নীলা, তুমি কি জানো না আমার হৃদয়ের ঠিকানা
যেখানে তোমার আমার প্রেম মিলে মিশে এক হয়`;

export function MusicPlayer({ started }: { started: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthCtxRef = useRef<AudioContext | null>(null);
  const synthIntervalRef = useRef<number | null>(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [expanded, setExpanded] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [usingSynth, setUsingSynth] = useState(false);

  // Synthesize smooth romantic melody if standard mp3 audio fails or is blocked
  const startSynthMelody = () => {
    try {
      if (!synthCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        synthCtxRef.current = new AudioCtx();
      }
      const ctx = synthCtxRef.current;
      if (ctx.state === "suspended") {
        void ctx.resume();
      }

      // Bengali folk/romantic scale notes (frequencies in Hz)
      const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33];
      let step = 0;

      if (synthIntervalRef.current) clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = window.setInterval(() => {
        if (ctx.state !== "running") return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const freq = scale[step % scale.length];

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const currentVol = muted ? 0 : volume * 0.15;
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(Math.max(0.001, currentVol), ctx.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.85);

        step = (step + 1) % (scale.length * 2);
      }, 450);

      setUsingSynth(true);
      setPlaying(true);
    } catch (e) {
      console.warn("Synth audio fallback error:", e);
    }
  };

  const stopSynthMelody = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
    if (synthCtxRef.current) {
      void synthCtxRef.current.suspend();
    }
    setUsingSynth(false);
  };

  useEffect(() => {
    if (!started) return;
    const el = audioRef.current;
    if (!el) return;

    el.volume = volume;
    const playPromise = el.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setPlaying(true);
        })
        .catch(() => {
          setPlaying(false);
        });
    }
  }, [started]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = muted ? 0 : volume;
    }
  }, [volume, muted]);

  const togglePlay = () => {
    const el = audioRef.current;
    if (!playing) {
      if (el) {
        el.play()
          .then(() => {
            setPlaying(true);
            stopSynthMelody();
          })
          .catch(() => {
            startSynthMelody();
          });
      } else {
        startSynthMelody();
      }
    } else {
      if (el) el.pause();
      stopSynthMelody();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    setMuted((m) => !m);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/nila.mp3"
        loop
        preload="auto"
        onEnded={() => setPlaying(false)}
        onError={() => {
          console.log("Audio src fallback mode active");
        }}
      />

      <div className="fixed top-5 right-5 z-50 flex flex-col items-end gap-2">
        <div className="scrapbook-shadow glass-panel flex items-center gap-3 rounded-full px-4 py-2 text-rose-deep border border-gold/40 shadow-xl transition-all duration-300 hover:scale-[1.02]">
          {/* Vinyl Spin Disk */}
          <div className={`relative flex h-8 w-8 items-center justify-center rounded-full bg-rose-deep text-gold shadow-md ${playing ? "animate-vinyl" : ""}`}>
            <Disc className="h-5 w-5" />
            <div className="absolute h-2 w-2 rounded-full bg-cream" />
          </div>

          {/* Sound wave visualizer bars */}
          <div className="flex h-5 items-end gap-[3px] px-1">
            {[0.4, 0.8, 0.5, 0.9, 0.6].map((multiplier, i) => (
              <span
                key={i}
                className={`w-[3px] rounded-full bg-gradient-to-t from-rose-deep to-gold transition-all duration-300 ${
                  playing ? "animate-pulse" : "h-1.5 opacity-40"
                }`}
                style={{
                  height: playing ? `${Math.max(6, 18 * multiplier)}px` : "6px",
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            ))}
          </div>

          {/* Song Name & Info */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex flex-col text-left transition-opacity hover:opacity-80 focus:outline-none"
            title="গানের বিস্তারিত ও কন্ট্রোল"
          >
            <span className="font-display text-xs font-semibold tracking-wide text-rose-deep">
              নীলা (Neela)
            </span>
            <span className="font-sans text-[10px] text-rose-deep/70">
              {playing ? (usingSynth ? "সুর বাজছে ♪" : "মাইলস (Miles)") : "গান চালাতে চাপুন"}
            </span>
          </button>

          {/* Lyrics Button */}
          <button
            onClick={() => setShowLyrics(!showLyrics)}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-gold/20 text-rose-deep transition-transform hover:scale-110"
            title="গানের লিরিক্স"
          >
            <FileText className="h-3.5 w-3.5" />
          </button>

          {/* Play/Pause Main Button */}
          <button
            onClick={togglePlay}
            aria-label={playing ? "গান থামাও" : "গান চালাও"}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-deep text-cream shadow-md transition-transform hover:scale-110 active:scale-95"
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-cream ml-0.5" />}
          </button>
        </div>

        {/* Expanded Controller Drawer */}
        {expanded && (
          <div className="scrapbook-shadow glass-card animate-reveal mt-2 w-72 rounded-2xl p-4 border border-gold/30 text-rose-deep shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-rose-deep/10">
              <div className="flex items-center gap-2">
                <Music className="h-4 w-4 text-gold" />
                <span className="font-display text-xs font-semibold">নীলা — মাইলস (Miles)</span>
              </div>
              <span className="rounded-full bg-rose-deep/10 px-2 py-0.5 text-[9px] font-semibold text-rose-deep">
                Official Track
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between gap-3">
              <button
                onClick={toggleMute}
                className="text-rose-deep/80 hover:text-rose-deep transition-colors"
              >
                {muted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>

              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={muted ? 0 : volume}
                onChange={(e) => {
                  setVolume(parseFloat(e.target.value));
                  if (muted) setMuted(false);
                }}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-rose-deep/20 accent-rose-deep"
              />

              <span className="font-sans text-[10px] text-rose-deep/70 min-w-[28px] text-right">
                {Math.round((muted ? 0 : volume) * 100)}%
              </span>
            </div>

            <p className="mt-3 text-[11px] text-center text-rose-deep/80 italic font-medium">
              "নীলা, তুমি কি জানো না আমার হৃদয়ের ঠিকানা..."
            </p>
          </div>
        )}

        {/* Lyrics Drawer Modal */}
        {showLyrics && (
          <div className="scrapbook-shadow glass-card animate-reveal mt-2 max-h-80 w-80 overflow-y-auto rounded-2xl p-5 border border-gold/40 text-rose-deep shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-rose-deep/15">
              <div className="flex items-center gap-2">
                <Music className="h-4 w-4 text-gold" />
                <span className="font-display text-sm font-bold">নীলা গানের সম্পূর্ণ লিরিক্স</span>
              </div>
              <button
                onClick={() => setShowLyrics(false)}
                className="text-xs font-bold text-rose-deep/60 hover:text-rose-deep"
              >
                ✕
              </button>
            </div>
            <pre className="mt-4 whitespace-pre-line font-bengali text-xs leading-relaxed text-rose-deep/90 text-center font-medium">
              {NILA_LYRICS}
            </pre>
          </div>
        )}
      </div>
    </>
  );
}
