import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Heart, Camera, BookOpen, Send, Calendar, Star, ChevronDown } from "lucide-react";

import { Confetti } from "@/components/Confetti";
import { Countdown } from "@/components/Countdown";
import { MusicPlayer } from "@/components/MusicPlayer";
import { Petals } from "@/components/Petals";
import { Lightbox } from "@/components/Lightbox";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "শুভ জন্মদিন — আমাদের গল্পের একটা খাতা" },
      {
        name: "description",
        content:
          "আমাদের রঙিন ছবি, কিছু ভালোবাসার চিঠি আর একটা ছোট্ট নিমন্ত্রণ — সব মিলিয়ে তোমার জন্মদিনের মিষ্টি উপহার।",
      },
      { property: "og:title", content: "শুভ জন্মদিন — আমাদের গল্পের একটা খাতা" },
      {
        property: "og:description",
        content: "ছবি, চিঠি আর নীলা ব্যান্ড গান — শুধু তোমার জন্য বানানো এক ভালোবাসার পাতা।",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BirthdayPage,
});

const MEMORIES = [
  { src: "/memories/memory-1.jpg", caption: "পাহাড় ও সবুজ প্রকৃতির মাঝে", note: "তোমার কাঁধে হাত রেখে দূরের রূপ দেখা", tilt: "-2.5deg", cat: "travel" },
  { src: "/memories/memory-2.jpg", caption: "নদীর তীরে একসাথে", note: "তোমার মিষ্টি হাসিতে নদীটাও যেন শান্ত", tilt: "3deg", cat: "sweets" },
  { src: "/memories/memory-3.jpg", caption: "গালে হাত দিয়ে সেই মিষ্টি হাসি", note: "তোমার এই চঞ্চল রূপটা আমার সবচেয়ে প্রিয়", tilt: "-1.5deg", cat: "smiles" },
  { src: "/memories/memory-4.jpg", caption: "বার্সেলোনার জার্সিতে আমাদের ছবি", note: "একসাথে কাটানো অবিস্মরণীয় একটা বিকেল", tilt: "2.5deg", cat: "sweets" },
  { src: "/memories/memory-5.jpg", caption: "রেস্টুরেন্টে মজার মুহূর্ত", note: "জিহ্বা বের করে তোমার সেই কিউট ফান", tilt: "-3deg", cat: "smiles" },
  { src: "/memories/memory-6.jpg", caption: "সবুজের মাঝে পথচলা", note: "সারা জীবন এভাবেই পাশে পাশে চলতে চাই", tilt: "1.8deg", cat: "travel" },
  { src: "/memories/memory-7.jpg", caption: "পানি নিয়ে খেলা", note: "নদীর ঠাণ্ডা পানিতে আমাদের অশেষ আনন্দ", tilt: "-2deg", cat: "sweets" },
  { src: "/memories/memory-8.jpg", caption: "রোমান্টিক সান্ধ্য মুহূর্ত", note: "তোমার চোখের দিকে তাকিয়ে সময় থেমে যাওয়া", tilt: "3.2deg", cat: "travel" },
  { src: "/memories/memory-9.jpg", caption: "চিরদিনের সেরা স্মৃতি", note: "আমাদের ভালোবাসার বন্ধন থাকুক অটুট", tilt: "-1.2deg", cat: "smiles" },
];

const NOTES = [
  {
    title: "#১ ভালোবাসার প্রথম কথা",
    body: "তোমার মিষ্টি হাসি দেখলে মনে হয় পৃথিবীটা আসলেই চমৎকার। আজকের এই বিশেষ দিনে শুধু একটাই কথা বারবার বলতে চাই — আমি তোমাকে সারা জীবন ঠিক এভাবেই আগলে রাখতে চাই।",
    icon: "♥",
  },
  {
    title: "#২ তোমার জন্য প্রার্থনা",
    body: "প্রতিটি ভোর যেন তোমার জীবনে নতুন আনন্দ ও শান্তি নিয়ে আসে। তুমি আমার জীবনের সেই ধ্রুবতারা, যে অন্ধকার রাতেও আমাকে আলোর ঠিকানা দেখায়।",
    icon: "✨",
  },
  {
    title: "#৩ ছোট ছোট মিষ্টি অভ্যাস",
    body: "তোমার রাগ করে চুপ করে থাকা, হুট করে ছোট বাচ্চার মতো হেসে ফেলা, কিংবা খাওয়ার সময় আমার প্লেট থেকে খাবার কেড়ে নেওয়া — এই ছোট জিনিসগুলোই আমার জীবন রঙিন করে।",
    icon: "🌸",
  },
  {
    title: "#৪ আমার শেষ প্রতিশ্রুতি",
    body: "খুশির দিনে সবাই পাশে থাকে, তবে তোমার সবচেয়ে কঠিন আর অন্ধকার দিনগুলোতেও আমি তোমার হাত শক্ত করে ধরে রাখব — এটাই আমার পক্ষ থেকে তোমার জন্মদিনের উপহার।",
    icon: "💍",
  },
];

const INITIAL_WISHES = [
  { name: "প্রিয়তম", text: "শুভ জন্মদিন রাজকন্যা! সারা জীবন এমন মিষ্টি হাসিতে থেকো।", time: "রাত ১২:০০" },
  { name: "তোমার ভক্ত", text: "আজকের দিনটি তোমার মতোই সুন্দর ও আনন্দময় হোক! ♥", time: "রাত ১২:০১" },
];

function BirthdayPage() {
  const [opened, setOpened] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [answer, setAnswer] = useState<null | "yes">(null);
  const [dodge, setDodge] = useState(0);
  const [filter, setFilter] = useState("all");

  // Wish Book State
  const [wishes, setWishes] = useState(INITIAL_WISHES);
  const [newWishName, setNewWishName] = useState("");
  const [newWishText, setNewWishText] = useState("");

  const filteredMemories = filter === "all" ? MEMORIES : MEMORIES.filter((m) => m.cat === filter);

  const handleAddWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWishText.trim()) return;
    const name = newWishName.trim() || "শুভানুধ্যায়ী";
    const now = new Date();
    const timeStr = `${now.getHours()}:${now.getMinutes() < 10 ? "0" : ""}${now.getMinutes()}`;
    setWishes([{ name, text: newWishText.trim(), time: timeStr }, ...wishes]);
    setNewWishText("");
    setNewWishName("");
  };

  if (!opened) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 bg-gradient-to-b from-cream via-rose-soft/30 to-cream">
        <Petals />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40 animate-pulse-glow"
          style={{
            background: "radial-gradient(circle at center, var(--gold) 0%, transparent 60%)",
          }}
        />
        <Countdown onReady={() => setOpened(true)} />
      </main>
    );
  }

  return (
    <main className="relative overflow-hidden bg-background text-foreground transition-colors duration-500">
      <Petals />
      <Confetti />
      <MusicPlayer started={opened} />

      {/* Hero Header Section */}
      <header className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30 animate-pulse-glow"
          style={{
            background: "radial-gradient(circle at center, var(--gold) 0%, transparent 65%)",
          }}
        />

        <div className="animate-reveal relative z-10 max-w-3xl">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-6 py-2 backdrop-blur-md shadow-sm">
            <Sparkles className="h-4 w-4 text-gold fill-gold" />
            <span className="font-accent text-lg text-rose-deep italic">For My Dearest One</span>
            <Sparkles className="h-4 w-4 text-gold fill-gold" />
          </div>

          <h1 className="font-display mt-2 text-5xl sm:text-7xl md:text-8xl font-black italic tracking-tight text-rose-deep leading-tight drop-shadow-sm">
            শুভ জন্মদিন, প্রিয়!
          </h1>

          <p className="mx-auto mt-8 max-w-lg text-lg sm:text-xl leading-relaxed text-rose-deep/80 font-medium">
            রাত ১২টা বেজে গেছে... আমাদের রাজকন্যার জন্মদিনের বিশেষ উৎসবের মুহূর্ত শুরু হলো ঠিক এখন থেকে।
          </p>

          <p className="mt-6 flex items-center justify-center gap-2 text-sm text-rose-deep/60 italic font-sans">
            <span>নিচে স্ক্রল করে তোমার ভালোবাসার গ্যালাক্সিতে প্রবেশ করো</span>
            <ChevronDown className="h-4 w-4 animate-bounce text-rose-deep" />
          </p>
        </div>

        <a
          href="#memories"
          aria-label="নিচে যাও"
          className="absolute bottom-10 flex h-10 w-10 items-center justify-center rounded-full border border-rose-deep/30 text-rose-deep opacity-70 transition-all hover:opacity-100 hover:scale-110"
        >
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </a>
      </header>

      {/* Memory Gallery Section */}
      <section id="memories" className="relative z-10 mx-auto max-w-6xl px-6 py-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-gold font-accent text-2xl italic mb-2">
            <Camera className="h-5 w-5 text-gold" />
            <span>আমাদের আসল মিষ্টি স্মৃতিগুলো</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl italic font-bold text-rose-deep">
            গল্পের রঙিন কিছু অ্যালবাম
          </h2>
          <p className="mt-3 text-rose-deep/70">
            প্রতিটি ছবির পেছনে আছে আমাদের হাসিমুখের আসল ও সুন্দর কিছু মুহূর্ত
          </p>

          {/* Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: "all", label: "সব স্মৃতি" },
              { id: "sweets", label: "মিষ্টি মুহূর্ত" },
              { id: "smiles", label: "হাসিমুখ" },
              { id: "travel", label: "ঘোরাঘুরি" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`rounded-full px-5 py-2 text-xs font-semibold tracking-wider transition-all duration-300 ${
                  filter === tab.id
                    ? "bg-rose-deep text-cream shadow-md scale-105"
                    : "glass-card text-rose-deep/80 hover:bg-rose-deep/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {filteredMemories.map((mem, i) => (
            <figure
              key={i}
              onClick={() => setLightboxIdx(i)}
              className="scrapbook-shadow group relative cursor-pointer rounded-2xl bg-white p-4 pb-8 transition-all duration-500 hover:-translate-y-3 hover:rotate-0 hover:scale-[1.03] hover:shadow-2xl border-4 border-amber-100/80"
              style={{
                transform: `rotate(${mem.tilt})`,
                marginTop: i % 3 === 1 ? "1.5rem" : undefined,
              }}
            >
              {/* Golden Washi Tape Aesthetic Accent */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 h-6 w-24 rounded-sm bg-gradient-to-r from-amber-200/80 via-yellow-100/90 to-amber-200/80 shadow-sm border border-amber-300/50 rotate-[-1deg] z-20" />

              {/* Photo Frame Container */}
              <div className="relative overflow-hidden rounded-xl border-2 border-gold/40 shadow-inner bg-slate-900">
                <img
                  src={mem.src}
                  alt={mem.caption}
                  loading="lazy"
                  className="aspect-[3/4] w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-rose-deep/25 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cream/90 text-rose-deep shadow-xl border border-gold">
                    <Sparkles className="h-6 w-6 text-rose-deep" />
                  </span>
                </div>
              </div>

              {/* Photo Caption */}
              <figcaption className="mt-5 text-center">
                <span className="block font-display text-lg font-bold text-rose-deep">
                  {mem.caption}
                </span>
                <span className="font-accent block mt-1 text-base text-rose-deep/70 italic">
                  {mem.note}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      <Lightbox
        images={MEMORIES.map((m) => m.src)}
        index={lightboxIdx}
        onClose={() => setLightboxIdx(null)}
        onIndex={(idx) => setLightboxIdx(idx)}
      />

      {/* Heartfelt Love Letters */}
      <section className="relative z-10 bg-gradient-to-b from-rose-deep/5 via-rose-deep/10 to-rose-deep/5 py-28 border-y border-gold/20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-gold font-accent text-2xl italic mb-2">
              <BookOpen className="h-5 w-5 text-gold" />
              <span>একুশটি অনুভূতির পাতা</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl italic font-bold text-rose-deep">
              হৃদয়ের গভীরের কিছু কথা
            </h2>
            <p className="mt-3 text-rose-deep/70">
              যে কথাগুলো মুখে কখনো স্পষ্ট বলা হয়নি, সেগুলো খামে বন্দি করে রাখলাম।
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {NOTES.map((n) => (
              <article
                key={n.title}
                className="scrapbook-shadow glass-card group relative rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl border border-gold/30"
              >
                <div className="flex items-center justify-between mb-4 border-b border-rose-deep/10 pb-3">
                  <h3 className="font-accent text-2xl text-gold italic font-bold">
                    {n.title}
                  </h3>
                  <span className="text-xl">{n.icon}</span>
                </div>
                <p className="leading-relaxed text-rose-deep/85 font-medium text-base">
                  {n.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Date Invitation Section */}
      <section className="relative z-10 flex justify-center px-6 py-28">
        <div className="scrapbook-shadow glass-card relative w-full max-w-xl rounded-3xl border-t-8 border-rose-deep p-8 sm:p-14 text-center border-x border-b border-gold/30 shadow-2xl">
          <span className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full bg-rose-deep px-6 py-2 text-xs font-bold tracking-widest text-primary-foreground shadow-md uppercase">
            A Special Invitation
          </span>

          {answer === "yes" ? (
            <div className="animate-reveal py-4">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-deep text-gold shadow-lg">
                <Heart className="h-8 w-8 fill-gold" />
              </div>
              <h3 className="font-display text-3xl sm:text-4xl italic font-bold text-rose-deep">
                তাহলে কাল দেখা হচ্ছে ♥
              </h3>
              <p className="mt-4 leading-relaxed text-rose-deep/80 font-medium text-lg">
                আমি ঠিক সময়ে পৌঁছে যাব। তুমি শুধু সুন্দর করে সেজে থেকো — বাকি সব মিষ্টি সারপ্রাইজ দেওয়ার দায়িত্ব আমার!
              </p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold/20 px-5 py-2 text-xs font-semibold text-rose-deep">
                <Calendar className="h-4 w-4 text-rose-deep" />
                <span>Date locked for tomorrow!</span>
              </div>
            </div>
          ) : (
            <>
              <h3 className="font-display mt-4 mb-4 text-3xl sm:text-4xl font-bold text-rose-deep leading-tight">
                কালকে কি আমার সাথে ঘুরতে বের হবে?
              </h3>
              <p className="mb-8 text-rose-deep/70 italic text-base">
                তোমার প্রিয় জায়গা আর একটা ছোট মিষ্টি সারপ্রাইজ অপেক্ষা করছে...
              </p>

              <div className="flex flex-col justify-center gap-4 sm:flex-row items-center min-h-[70px]">
                <button
                  onClick={() => setAnswer("yes")}
                  className="scrapbook-shadow group relative rounded-full bg-gradient-to-r from-rose-deep via-rose-mid to-rose-deep px-10 py-4 font-bold text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 min-w-[180px]"
                >
                  <span className="flex items-center justify-center gap-2">
                    হ্যাঁ, অবশ্যই! <Heart className="h-4 w-4 fill-primary-foreground" />
                  </span>
                </button>

                <button
                  onMouseEnter={() => setDodge((d) => d + 1)}
                  onClick={() => setDodge((d) => d + 1)}
                  className="rounded-full border border-rose-deep/30 px-8 py-3.5 text-sm font-semibold text-rose-deep/60 transition-all duration-300 hover:border-rose-deep"
                  style={{
                    transform: `translate(${(dodge % 2 ? 1 : -1) * Math.min(dodge * 24, 110)}px, ${Math.min(dodge * 8, 45)}px)`,
                  }}
                >
                  {dodge > 2 ? "ধরতে পারছ না তো!" : "না, কাজ আছে"}
                </button>
              </div>
            </>
          )}

          <p className="mt-8 border-t border-rose-deep/10 pt-6 text-xs text-rose-deep/50 italic">
            *হ্যাঁ বললে কিন্তু সময়মতো একদম তৈরি থেকো!
          </p>
        </div>
      </section>

      {/* Interactive Birthday Wish Book */}
      <section className="relative z-10 bg-rose-deep/5 py-24 border-t border-gold/20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-gold font-accent text-2xl italic mb-2">
              <Star className="h-5 w-5 text-gold fill-gold" />
              <span>জন্মদিনের শুভেচ্ছাবার্তা</span>
            </div>
            <h2 className="font-display text-4xl font-bold text-rose-deep">
              ভালোবাসার খাতা
            </h2>
            <p className="mt-2 text-rose-deep/70 text-sm">
              এখানে তোমার সুন্দর জন্মদিনের শুভকামনাটি লিখে রেখে যাও।
            </p>
          </div>

          {/* Input Form */}
          <form onSubmit={handleAddWish} className="scrapbook-shadow glass-card rounded-2xl p-6 mb-10 border border-gold/30">
            <div className="flex flex-col gap-4 sm:flex-row mb-4">
              <input
                type="text"
                placeholder="তোমার নাম (ঐচ্ছিক)"
                value={newWishName}
                onChange={(e) => setNewWishName(e.target.value)}
                className="w-full sm:w-1/3 rounded-xl border border-rose-deep/20 bg-background/80 px-4 py-3 text-sm text-rose-deep focus:border-rose-deep focus:outline-none"
              />
              <input
                type="text"
                placeholder="জন্মদিনের মিষ্টি বার্তাটি লেখো..."
                value={newWishText}
                onChange={(e) => setNewWishText(e.target.value)}
                className="w-full sm:w-2/3 rounded-xl border border-rose-deep/20 bg-background/80 px-4 py-3 text-sm text-rose-deep focus:border-rose-deep focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto ml-auto flex items-center justify-center gap-2 rounded-xl bg-rose-deep px-6 py-3 text-xs font-bold text-cream shadow-md transition-transform hover:scale-105 active:scale-95"
            >
              <span>বার্তা পাঠাও</span>
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>

          {/* Wishes List */}
          <div className="space-y-4">
            {wishes.map((w, idx) => (
              <div
                key={idx}
                className="glass-card flex items-start gap-4 rounded-2xl p-5 border border-gold/20 shadow-sm"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-deep/10 text-rose-deep font-bold font-accent text-lg">
                  ♥
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-rose-deep text-sm">{w.name}</span>
                    <span className="text-[10px] text-rose-deep/50">{w.time}</span>
                  </div>
                  <p className="mt-1 text-sm text-rose-deep/80 font-medium">{w.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-16 text-center border-t border-rose-deep/10 bg-background">
        <p className="font-accent text-2xl text-rose-deep/60 italic font-medium">
          Always yours, forever & always.
        </p>
        <p className="mt-2 text-xs font-sans text-rose-deep/40">
          ভালোবাসা দিয়ে নির্মিত — শুভ জন্মদিন ♥
        </p>
      </footer>
    </main>
  );
}
