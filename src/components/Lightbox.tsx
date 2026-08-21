import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-rose-deep/85 p-4 backdrop-blur-md transition-all duration-300"
    >
      {/* Close Button */}
      <button
        aria-label="বন্ধ করো"
        onClick={onClose}
        className="absolute top-6 right-6 flex h-11 w-11 items-center justify-center rounded-full bg-cream/15 text-cream border border-cream/30 transition-all hover:bg-cream/30 hover:scale-110 active:scale-95"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Prev Button */}
      <button
        aria-label="আগের ছবি"
        onClick={(e) => {
          e.stopPropagation();
          onIndex((i - 1 + images.length) % images.length);
        }}
        className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-cream/15 text-cream border border-cream/30 transition-all hover:bg-cream/30 hover:scale-110 active:scale-95 md:left-8"
      >
        <ChevronLeft className="h-7 w-7" />
      </button>

      {/* Main Image Frame */}
      <figure
        onClick={(e) => e.stopPropagation()}
        className="scrapbook-shadow animate-reveal max-h-[88vh] max-w-[92vw] rounded-2xl bg-card p-4 sm:p-6 border border-gold/30"
      >
        <img
          src={images[i]}
          alt={`আমাদের মুহূর্ত ${i + 1}`}
          className="max-h-[72vh] w-auto max-w-full rounded-xl object-contain shadow-md"
        />
        <figcaption className="mt-4 flex items-center justify-between border-t border-rose-deep/10 pt-3 text-xs tracking-wider text-rose-deep/70">
          <span className="font-display font-semibold">আমাদের মধুর স্মৃতি #{i + 1}</span>
          <span className="font-sans rounded-full bg-rose-deep/10 px-3 py-1 font-medium text-rose-deep">
            {i + 1} / {images.length}
          </span>
        </figcaption>
      </figure>

      {/* Next Button */}
      <button
        aria-label="পরের ছবি"
        onClick={(e) => {
          e.stopPropagation();
          onIndex((i + 1) % images.length);
        }}
        className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-cream/15 text-cream border border-cream/30 transition-all hover:bg-cream/30 hover:scale-110 active:scale-95 md:right-8"
      >
        <ChevronRight className="h-7 w-7" />
      </button>
    </div>
  );
}
