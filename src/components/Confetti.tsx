const COLORS = ["var(--rose-deep)", "var(--gold)", "var(--rose-soft)", "var(--dusk)"];

const BITS = Array.from({ length: 70 }, (_, i) => ({
  left: (i * 13.7) % 100,
  delay: (i % 12) * 0.15,
  duration: 4 + ((i * 7) % 40) / 10,
  size: 5 + ((i * 3) % 7),
  color: COLORS[i % COLORS.length] as string,
  round: i % 3 === 0,
}));

export function Confetti() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {BITS.map((b, i) => (
        <span
          key={i}
          className="absolute top-0"
          style={{
            left: `${b.left}%`,
            width: b.size,
            height: b.size * (b.round ? 1 : 2),
            background: b.color,
            borderRadius: b.round ? "50%" : "1px",
            animation: `petal-fall ${b.duration}s linear ${b.delay}s 3`,
          }}
        />
      ))}
    </div>
  );
}
