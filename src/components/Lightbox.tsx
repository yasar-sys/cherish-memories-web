import { useEffect } from "react";

export function Lightbox({
  images,
  index,
  onClose,
  onIndex,
}: {
  images: string[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const open = index !== null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex(((index as number) + 1) % images.length);
      if (e.key === "ArrowLeft") onIndex(((index as number) - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, index, images.length, onClose, onIndex]);

  if (!open) return null;
  const i = index as number;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-rose-deep/90 p-4 backdrop-blur-sm"
    >
      <button
        aria-label="বন্ধ করো"
        onClick={onClose}
        className="absolute top-5 right-6 text-3xl text-primary-foreground/70 transition-colors hover:text-primary-foreground"
      >
        ×
      </button>

      <button
        aria-label="আগের ছবি"
        onClick={(e) => {
          e.stopPropagation();
          onIndex((i - 1 + images.length) % images.length);
        }}
        className="absolute left-3 z-10 px-4 py-6 text-4xl text-primary-foreground/60 transition-colors hover:text-primary-foreground md:left-8"
      >
        ‹
      </button>

      <figure
        onClick={(e) => e.stopPropagation()}
        className="scrapbook-shadow animate-reveal max-h-[88vh] bg-card p-3"
      >
        <img
          src={images[i]}
          alt={`আমাদের মুহূর্ত ${i + 1}`}
          className="max-h-[76vh] w-auto object-contain"
        />
        <figcaption className="mt-3 text-center text-xs tracking-widest text-rose-deep/50">
          {i + 1} / {images.length}
        </figcaption>
      </figure>

      <button
        aria-label="পরের ছবি"
        onClick={(e) => {
          e.stopPropagation();
          onIndex((i + 1) % images.length);
        }}
        className="absolute right-3 z-10 px-4 py-6 text-4xl text-primary-foreground/60 transition-colors hover:text-primary-foreground md:right-8"
      >
        ›
      </button>
    </div>
  );
}
