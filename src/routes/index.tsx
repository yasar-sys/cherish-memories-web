import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Confetti } from "@/components/Confetti";
import { Countdown } from "@/components/Countdown";
import { MusicPlayer } from "@/components/MusicPlayer";
import { Petals } from "@/components/Petals";

import m1 from "@/assets/memory-1.jpg.asset.json";
import m2 from "@/assets/memory-2.jpg.asset.json";
import m3 from "@/assets/memory-3.jpg.asset.json";
import m4 from "@/assets/memory-4.jpg.asset.json";
import m5 from "@/assets/memory-5.jpg.asset.json";
import m6 from "@/assets/memory-6.jpg.asset.json";
import m7 from "@/assets/memory-7.jpg.asset.json";
import m8 from "@/assets/memory-8.jpg.asset.json";
import m9 from "@/assets/memory-9.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "শুভ জন্মদিন — আমাদের গল্পের ছোট্ট একটা খাতা" },
      {
        name: "description",
        content:
          "আমাদের ছবি, কিছু ভালোবাসার চিঠি আর একটা ছোট্ট অনুরোধ — সব মিলিয়ে তোমার জন্মদিনের উপহার।",
      },
      { property: "og:title", content: "শুভ জন্মদিন — আমাদের গল্পের ছোট্ট একটা খাতা" },
      {
        property: "og:description",
        content: "ছবি, চিঠি আর নীলা গান — শুধু তোমার জন্য বানানো একটা পাতা।",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BirthdayPage,
});

const MEMORIES = [
  { src: m1.url, tilt: "-2deg" },
  { src: m2.url, tilt: "3deg" },
  { src: m3.url, tilt: "-1deg" },
  { src: m4.url, tilt: "2deg" },
  { src: m5.url, tilt: "-3deg" },
  { src: m6.url, tilt: "1deg" },
  { src: m7.url, tilt: "-2deg" },
  { src: m8.url, tilt: "3deg" },
  { src: m9.url, tilt: "-1deg" },
];

const NOTES = [
  {
    title: "#১ প্রথম কথা",
    body: "তোমার হাসি দেখলে মনে হয় পৃথিবীটা আসলেই সুন্দর। আজকের এই দিনে শুধু একটাই কথা — আমি তোমাকে সারা জীবন ঠিক এভাবেই ভালোবাসতে চাই।",
  },
  {
    title: "#২ তোমার জন্য প্রার্থনা",
    body: "প্রতিটা সকাল যেন তোমার জন্য নতুন আনন্দ নিয়ে আসে। তুমি আমার জীবনের সেই ধ্রুবতারা, যে আমাকে সবসময় পথ দেখায়।",
  },
  {
    title: "#৩ ছোট ছোট জিনিস",
    body: "তোমার রাগ করে চুপ থাকা, হুট করে হেসে ফেলা, খাওয়ার সময় আমার প্লেট থেকে তুলে নেওয়া — এই ছোট জিনিসগুলোই আমার সবচেয়ে প্রিয়।",
  },
  {
    title: "#৪ একটা প্রতিশ্রুতি",
    body: "ভালো দিনে পাশে থাকা সহজ। আমি খারাপ দিনগুলোতেও থাকব — এটাই আমার জন্মদিনের উপহার।",
  },
];

function BirthdayPage() {
  const [opened, setOpened] = useState(false);
  const [answer, setAnswer] = useState<null | "yes">(null);
  const [dodge, setDodge] = useState(0);

  if (!opened) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
        <Petals />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            background: "radial-gradient(circle at center, var(--gold) 0%, transparent 65%)",
          }}
        />
        <div className="relative z-10">
          <Countdown onReady={() => setOpened(true)} />
        </div>
      </main>
    );
  }

  return (
    <main className="relative overflow-hidden">
      <Petals />
      <Confetti />
      <MusicPlayer started={opened} />

      <header className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            background: "radial-gradient(circle at center, var(--gold) 0%, transparent 65%)",
          }}
        />
        <div className="animate-reveal relative z-10">
          <p className="font-accent text-2xl text-gold italic">For my only one,</p>
          <h1 className="font-display mt-3 text-6xl italic tracking-tight text-rose-deep md:text-8xl">
            শুভ জন্মদিন, প্রিয়
          </h1>
          <p className="mx-auto mt-10 max-w-md text-lg leading-relaxed text-rose-deep/70">
            রাত ১২টা বেজে গেছে। আমাদের রাজকন্যার জন্মদিনের শুরু এখন থেকে...
          </p>
          <p className="mt-4 text-sm text-rose-deep/40 italic">
            নিচে স্ক্রল করো — পুরোটা তোমার জন্য।
          </p>
        </div>
        <div aria-hidden className="absolute bottom-10 h-12 w-px animate-bounce bg-rose-deep/20" />
      </header>

      <section className="relative z-10 mx-auto max-w-6xl px-6 py-28">
        <h2 className="font-display mb-16 text-center text-4xl italic text-rose-deep">
          আমাদের কিছু মুহূর্ত
        </h2>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {MEMORIES.map((mem, i) => (
            <figure
              key={i}
              className="scrapbook-shadow bg-card p-4 pb-10 transition-transform duration-500 hover:rotate-0 hover:scale-[1.02]"
              style={{ transform: `rotate(${mem.tilt})`, marginTop: i % 3 === 1 ? "2.5rem" : undefined }}
            >
              <img
                src={mem.src}
                alt={mem.caption}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
              <figcaption className="mt-4 text-center">
                <span className="block text-sm text-rose-deep">{mem.caption}</span>
                <span className="font-accent block text-rose-deep/50 italic">{mem.note}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="relative z-10 bg-rose-deep/5 py-24">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="font-display mb-16 text-center text-4xl italic text-rose-deep">
            হৃদয়ের কিছু কথা
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {NOTES.map((n) => (
              <article key={n.title} className="scrapbook-shadow group relative bg-card p-10">
                <div
                  aria-hidden
                  className="absolute top-3 right-3 h-8 w-8 rounded-full border border-gold opacity-15 transition-opacity group-hover:opacity-100"
                />
                <h3 className="font-accent mb-4 text-xl text-gold italic">{n.title}</h3>
                <p className="leading-relaxed text-rose-deep/80">{n.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 flex justify-center px-6 py-32">
        <div className="scrapbook-shadow relative w-full max-w-lg border-t-8 border-rose-deep bg-card p-12 text-center">
          <span className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full bg-rose-deep px-6 py-2 text-xs tracking-widest text-primary-foreground">
            AN INVITATION
          </span>

          {answer === "yes" ? (
            <div className="animate-reveal">
              <p className="font-display text-3xl italic text-rose-deep">তাহলে কাল দেখা হচ্ছে ♥</p>
              <p className="mt-4 leading-relaxed text-rose-deep/70">
                আমি ঠিক সময়ে পৌঁছে যাব। তুমি শুধু সুন্দর করে সেজে এসো — বাকিটা আমার দায়িত্ব।
              </p>
            </div>
          ) : (
            <>
              <h3 className="font-display mt-4 mb-6 text-3xl text-rose-deep">
                কালকে কি আমার সাথে ঘুরতে বের হবে?
              </h3>
              <p className="mb-10 text-rose-deep/60 italic">
                একটা ছোট্ট সারপ্রাইজ অপেক্ষা করছে তোমার জন্য...
              </p>

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <button
                  onClick={() => setAnswer("yes")}
                  className="group relative rounded-sm bg-rose-deep px-10 py-4 text-primary-foreground transition-all hover:pr-12"
                >
                  <span>হ্যাঁ, অবশ্যই!</span>
                  <span className="absolute top-1/2 right-4 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100">
                    ♥
                  </span>
                </button>
                <button
                  onMouseEnter={() => setDodge((d) => d + 1)}
                  onClick={() => setDodge((d) => d + 1)}
                  className="rounded-sm border border-border px-10 py-4 text-rose-deep/40 transition-transform duration-300"
                  style={{
                    transform: `translate(${(dodge % 2 ? 1 : -1) * Math.min(dodge * 18, 90)}px, ${Math.min(dodge * 7, 40)}px)`,
                  }}
                >
                  {dodge > 2 ? "ধরতে পারছ না তো!" : "না, কাজ আছে"}
                </button>
              </div>
            </>
          )}

          <p className="mt-8 border-t border-border pt-8 text-xs text-rose-deep/40 italic">
            *হ্যাঁ বললে সময়মতো রেডি থেকো কিন্তু!
          </p>
        </div>
      </section>

      <footer className="relative z-10 py-12 text-center">
        <p className="font-accent text-rose-deep/40 italic">Always yours, forever.</p>
      </footer>
    </main>
  );
}
