const PETALS = Array.from({ length: 18 }, (_, i) => ({
  left: (i * 37) % 100,
  delay: (i * 1.7) % 14,
  duration: 12 + ((i * 3) % 9),
  size: 6 + ((i * 5) % 9),
  opacity: 0.25 + ((i % 4) * 0.12),
}));

export function Petals() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {PETALS.map((p, i) => (
        <span
          key={i}
          className="absolute top-0 rounded-full bg-rose-deep"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animation: `petal-fall ${p.duration}s linear ${p.delay}s infinite`,
            borderRadius: "50% 0 50% 50%",
          }}
        />
      ))}
    </div>
  );
}
