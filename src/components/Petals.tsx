const PETALS = Array.from({ length: 24 }, (_, i) => ({
  left: (i * 19 + 7) % 100,
  delay: (i * 1.3) % 12,
  duration: 10 + ((i * 4) % 11),
  size: 7 + ((i * 5) % 12),
  opacity: 0.25 + ((i % 5) * 0.12),
  isGold: i % 4 === 0,
}));

export function Petals() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Background ambient lighting glows */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-gold/15 blur-3xl" />
      <div className="absolute top-1/3 -right-40 h-[500px] w-[500px] rounded-full bg-rose-deep/10 blur-3xl" />
      <div className="absolute -bottom-40 left-1/4 h-[400px] w-[400px] rounded-full bg-gold/20 blur-3xl" />

      {PETALS.map((p, i) => (
        <span
          key={i}
          className={`absolute top-0 rounded-full ${
            p.isGold
              ? "bg-gradient-to-tr from-gold to-gold-light shadow-[0_0_8px_rgba(212,175,55,0.6)]"
              : "bg-gradient-to-tr from-rose-deep to-rose-mid"
          }`}
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.isGold ? p.size : p.size * 1.3}px`,
            opacity: p.opacity,
            animation: `petal-fall ${p.duration}s linear ${p.delay}s infinite`,
            borderRadius: p.isGold ? "50%" : "60% 0% 60% 60%",
            transform: `rotate(${i * 15}deg)`,
          }}
        />
      ))}
    </div>
  );
}
