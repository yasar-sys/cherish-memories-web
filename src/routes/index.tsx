import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Heart, Camera, BookOpen, Calendar, ChevronDown, Music, Disc, RefreshCw, Eye, MapPin, Clock, MessageCircle, ExternalLink, Check, Video, Play } from "lucide-react";

import { Confetti } from "@/components/Confetti";
import { Countdown } from "@/components/Countdown";
import { MusicPlayer, NILA_LYRICS } from "@/components/MusicPlayer";
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
  { id: 0, src: "/memories/memory-1.jpg", caption: "পাহাড় ও সবুজ প্রকৃতির মাঝে", note: "তোমার কাঁধে হাত রেখে দূরের রূপ দেখা", tilt: "-2.5deg", cat: "travel" },
  { id: 1, src: "/memories/memory-2.jpg", caption: "নদীর তীরে একসাথে", note: "তোমার মিষ্টি হাসিতে নদীটাও যেন শান্ত", tilt: "3deg", cat: "sweets" },
  { id: 2, src: "/memories/memory-3.jpg", caption: "গালে হাত দিয়ে সেই মিষ্টি হাসি", note: "তোমার এই চঞ্চল রূপটা আমার সবচেয়ে প্রিয়", tilt: "-1.5deg", cat: "smiles" },
  { id: 3, src: "/memories/memory-4.jpg", caption: "বার্সেলোনার জার্সিতে আমাদের ছবি", note: "একসাথে কাটানো অবিস্মরণীয় একটা বিকেল", tilt: "2.5deg", cat: "sweets" },
  { id: 4, src: "/memories/memory-5.jpg", caption: "রেস্টুরেন্টে মজার মুহূর্ত", note: "জিহ্বা বের করে তোমার সেই কিউট ফান", tilt: "-3deg", cat: "smiles" },
  { id: 5, src: "/memories/memory-6.jpg", caption: "গাছের ছায়ায় মিষ্টি কোলাকুলি", note: "যেখানে সময় থমকে যায় তোমার ছোঁয়ায়", tilt: "1.8deg", cat: "travel" },
  { id: 6, src: "/memories/memory-7.jpg", caption: "জার্সি পরে সুন্দর এক সেলফি", note: "তোমার গালে হাত দিয়ে মিষ্টি মুহূর্ত", tilt: "-2deg", cat: "sweets" },
  { id: 7, src: "/memories/memory-8.jpg", caption: "রাতের আলোয় জোড়া মুখ", note: "চাঁদের আলোতেও তোমার চোখের কালো তারা", tilt: "3.2deg", cat: "smiles" },
  { id: 8, src: "/memories/memory-9.jpg", caption: "নৌকায় পাশাপাশি কাটানো সময়", note: "জল আর বাতাসের মাঝে তোমার আমার গল্প", tilt: "-1.2deg", cat: "travel" },
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

const MYMENSINGH_SPOTS = [
  { id: "zainul", name: "শিল্পাচার্য জয়নুল আবেদিন পার্ক ও ব্রহ্মপুত্র নদ", desc: "নদীর মিষ্টি হাওয়ায় পাশাপাশি হাঁটা ও সূর্যাস্ত দেখা" },
  { id: "shashi", name: "শশী লজ (ময়মনসিংহ রাজবাড়ি)", desc: "রাজকীয় পরিবেশ ও সবুজ বাগান ঘেরা রোমান্টিক আড্ডা" },
  { id: "alexander", name: "অ্যালেকজান্ডার ক্যাসেল (লোহার কুঠি)", desc: "ঐতিহাসিক ভিনটেজ আবহে নিরিবিলি কিছু সময় কাটানো" },
  { id: "bau", name: "কৃষি বিশ্ববিদ্যালয় বোটানিক্যাল গার্ডেন", desc: "গাছের ছায়ায় পাখির ডাকে শান্ত সময় কাটানো" },
  { id: "muktagacha", name: "মুক্তাগাছা জমিদার বাড়ি", desc: "জমিদার বাড়ির ঐতিহ্য ও মিষ্টি ছানার মণ্ডা খাওয়া" },
  { id: "boat", name: "ব্রহ্মপুত্র নদীতে রোমান্টিক নৌকা ভ্রমণ ও কফি", desc: "নৌকার ছৈয়ে বসে নদী পার হওয়া ও মিষ্টি কফি কাপের আড্ডা" },
];

const DATE_OPTIONS = [
  "আগামীকাল (Tomorrow)",
  "এই শুক্রবার (This Friday)",
  "এই শনিবার (This Saturday)",
  "তোমার সুবিধামতো যেকোনো বিশেষ দিন",
];

const TIME_OPTIONS = [
  "বিকেল ৪:৩০ (সূর্যাস্তের মিষ্টি সময়)",
  "বিকেল ৫:০০ (ব্রহ্মপুত্রের ঠান্ডা হাওয়া)",
  "সন্ধ্যা ৬:০০ (সন্ধ্যা কফি আড্ডা)",
  "রাত ৭:০০ (ক্যান্ডেল লাইট ডিনার)",
];

const MESSENGER_URL = "https://www.facebook.com/share/1CcsYzThUk/";

function BirthdayPage() {
  const [opened, setOpened] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [answer, setAnswer] = useState<null | "yes">(null);
  const [dodge, setDodge] = useState(0);
  const [filter, setFilter] = useState("all");

  // Video State & Fallback
  const [videoError, setVideoError] = useState(false);

  // State to track flipped cards
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  // RSVP Form State
  const [selectedSpot, setSelectedSpot] = useState(MYMENSINGH_SPOTS[0].name);
  const [selectedDate, setSelectedDate] = useState(DATE_OPTIONS[0]);
  const [selectedTime, setSelectedTime] = useState(TIME_OPTIONS[1]);
  const [customNote, setCustomNote] = useState("");
  const [confirmedRSVP, setConfirmedRSVP] = useState(false);

  const toggleFlip = (id: number) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleRevealAll = () => {
    const allFlipped = MEMORIES.every((m) => flippedCards[m.id]);
    if (allFlipped) {
      setFlippedCards({});
    } else {
      const nextState: Record<number, boolean> = {};
      MEMORIES.forEach((m) => {
        nextState[m.id] = true;
      });
      setFlippedCards(nextState);
    }
  };

  const handleConfirmRSVP = () => {
    setConfirmedRSVP(true);
    // Open messenger link directly
    window.open(MESSENGER_URL, "_blank");
  };

  const filteredMemories = filter === "all" ? MEMORIES : MEMORIES.filter((m) => m.cat === filter);

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
          href="#video-wish"
          aria-label="নিচে যাও"
          className="absolute bottom-10 flex h-10 w-10 items-center justify-center rounded-full border border-rose-deep/30 text-rose-deep opacity-70 transition-all hover:opacity-100 hover:scale-110"
        >
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </a>
      </header>

      {/* Birthday Video Wish Section */}
      <section id="video-wish" className="relative z-10 mx-auto max-w-4xl px-6 py-20">
        <div className="scrapbook-shadow glass-card relative rounded-3xl p-6 sm:p-10 border-2 border-gold/40 shadow-2xl text-center overflow-hidden">
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-5 py-1.5 text-xs font-bold text-rose-deep uppercase tracking-widest">
            <Video className="h-4 w-4 text-gold" />
            <span>আমার বিশেষ ভিডিও বার্তা</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-bold italic text-rose-deep">
            তোমার জন্য জন্মদিনের শুভকামনা 🎥
          </h2>
          <p className="mt-2 text-rose-deep/70 text-sm sm:text-base font-medium">
            ভিডিওটিতে চাপ দিয়ে আমার ধারণ করা জন্মদিনের বিশেষ মেসেজটি শুনে নাও ♥
          </p>

          {/* Video Player Frame */}
          <div className="mt-8 relative mx-auto max-w-2xl overflow-hidden rounded-2xl border-4 border-amber-100 bg-slate-950 shadow-2xl">
            {!videoError ? (
              <video
                controls
                preload="metadata"
                className="w-full aspect-video rounded-xl object-cover"
                onError={() => setVideoError(true)}
              >
                <source src="/wish.mp4" type="video/mp4" />
                <source src="/video.mp4" type="video/mp4" />
                <source src="/wish.webm" type="video/webm" />
                আপনার ব্রাউজারে ভিডিওটি সমর্থিত নয়।
              </video>
            ) : (
              <div className="flex flex-col items-center justify-center p-10 text-cream">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-deep/80 text-gold shadow-lg mb-4">
                  <Play className="h-8 w-8 fill-gold ml-1" />
                </div>
                <h3 className="font-display text-xl font-bold text-gold">ভিডিও ফাইল যুক্ত করার সহজ নিয়ম</h3>
                <p className="mt-2 text-xs text-cream/80 max-w-md leading-relaxed">
                  তোমার ধারণ করা পছন্দের ভিডিওটি (MP4 ফরম্যাটে) নাম দিয়ে <code className="bg-gold/20 px-2 py-0.5 rounded text-gold font-mono">wish.mp4</code> অথবা <code className="bg-gold/20 px-2 py-0.5 rounded text-gold font-mono">video.mp4</code> নামে প্রজেক্টের <code className="bg-gold/20 px-2 py-0.5 rounded text-gold font-mono">public</code> ফোল্ডারে পেস্ট করে দিলেই এখানে ভিডিওটি লাইভ চলবে!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Memory Gallery Section */}
      <section id="memories" className="relative z-10 mx-auto max-w-6xl px-6 py-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-gold font-accent text-2xl italic mb-2">
            <Camera className="h-5 w-5 text-gold" />
            <span>আমাদের আসল ৯টি মিষ্টি স্মৃতি</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl italic font-bold text-rose-deep">
            গল্পের রঙিন অ্যালবাম
          </h2>
          <p className="mt-3 text-rose-deep/70">
            প্রতিটি কার্ড উল্টানো আছে — ছবি ও স্মৃতিটি দেখতে কার্ডের উপর চাপো (Flip Card)!
          </p>

          {/* Filter Pills & Flip All Button */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {[
              { id: "all", label: "সব স্মৃতি (৯টি)" },
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

            {/* Reveal All Toggle */}
            <button
              onClick={handleRevealAll}
              className="inline-flex items-center gap-1.5 rounded-full border border-gold bg-gold/20 px-5 py-2 text-xs font-bold text-rose-deep shadow-md transition-all hover:bg-gold/40 hover:scale-105"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>{MEMORIES.every((m) => flippedCards[m.id]) ? "সব ঢেকে দাও" : "সবগুলো উল্টাও"}</span>
            </button>
          </div>
        </div>

        {/* 3D Flip Card Gallery Grid */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {filteredMemories.map((mem) => {
            const isFlipped = !!flippedCards[mem.id];

            return (
              <div
                key={mem.id}
                className="perspective-1000 min-h-[440px] cursor-pointer"
                style={{ marginTop: mem.id % 3 === 1 ? "1.5rem" : undefined }}
                onClick={() => toggleFlip(mem.id)}
              >
                <div
                  className={`transform-style-3d relative h-full w-full rounded-2xl transition-transform duration-700 ${
                    isFlipped ? "rotate-y-180" : ""
                  }`}
                  style={{ transform: `${isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"} rotate(${mem.tilt})` }}
                >
                  {/* FACE DOWN (Ultano Back Side) */}
                  <div className="backface-hidden scrapbook-shadow absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-rose-deep via-rose-mid to-rose-deep p-6 text-center border-4 border-gold/40 shadow-2xl">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 h-6 w-24 rounded-sm bg-gradient-to-r from-amber-200/80 via-yellow-100/90 to-amber-200/80 shadow-sm border border-amber-300/50 rotate-[-1deg]" />

                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cream/10 border-2 border-gold/50 shadow-inner mb-4">
                      <Heart className="h-10 w-10 text-gold fill-gold animate-pulse" />
                    </div>

                    <span className="font-accent text-3xl text-gold italic font-bold">
                      Memory #{mem.id + 1}
                    </span>

                    <p className="mt-3 text-sm text-cream/90 font-medium">
                      আমাদের গোপন একটি বিশেষ মুহূর্ত ♥
                    </p>

                    <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold/20 px-4 py-1.5 text-xs font-bold text-cream border border-gold/30">
                      <Eye className="h-3.5 w-3.5 text-gold" />
                      <span>ছবিটি দেখতে ট্যাপ করো (Flip)</span>
                    </div>
                  </div>

                  {/* FACE UP (Flipped Front Side - Real Couple Photo) */}
                  <div className="backface-hidden rotate-y-180 scrapbook-shadow absolute inset-0 flex flex-col justify-between rounded-2xl bg-white p-4 pb-6 border-4 border-amber-100/80 shadow-2xl">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 h-6 w-24 rounded-sm bg-gradient-to-r from-amber-200/80 via-yellow-100/90 to-amber-200/80 shadow-sm border border-amber-300/50 rotate-[-1deg] z-20" />

                    <div className="relative overflow-hidden rounded-xl border-2 border-gold/40 shadow-inner bg-slate-900 flex-1">
                      <img
                        src={mem.src}
                        alt={mem.caption}
                        loading="lazy"
                        className="h-full w-full object-cover object-top transition-transform duration-700 hover:scale-105"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setLightboxIdx(mem.id);
                        }}
                        className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-cream/90 text-rose-deep shadow-lg border border-gold hover:scale-110"
                        title="ছবিটি বড় করে দেখুন"
                      >
                        <Sparkles className="h-4 w-4 text-rose-deep" />
                      </button>
                    </div>

                    <figcaption className="mt-4 text-center">
                      <span className="block font-display text-lg font-bold text-rose-deep">
                        {mem.caption}
                      </span>
                      <span className="font-accent block mt-0.5 text-base text-rose-deep/70 italic">
                        {mem.note}
                      </span>
                    </figcaption>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Lightbox Modal */}
      <Lightbox
        images={MEMORIES.map((m) => m.src)}
        index={lightboxIdx}
        onClose={() => setLightboxIdx(null)}
        onIndex={(idx) => setLightboxIdx(idx)}
      />

      {/* Special Song & Full Lyrics Showcase Section */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 py-20">
        <div className="scrapbook-shadow glass-card relative rounded-3xl p-8 sm:p-12 border-2 border-gold/40 shadow-2xl text-center overflow-hidden">
          {/* Top Decorative Header */}
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-5 py-1.5 text-xs font-bold text-rose-deep uppercase tracking-widest">
            <Music className="h-4 w-4 text-gold fill-gold" />
            <span>আমাদের বিশেষ গান — নীলা (Miles)</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-bold italic text-rose-deep mt-2">
            "নীলা, তুমি কি জানো না..."
          </h2>

          <div className="my-8 flex items-center justify-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-deep text-gold shadow-lg animate-vinyl">
              <Disc className="h-10 w-10" />
            </div>
          </div>

          {/* Full Song Lyrics */}
          <div className="mx-auto max-w-lg rounded-2xl bg-rose-deep/5 p-6 border border-gold/20 shadow-inner">
            <pre className="whitespace-pre-line font-bengali text-sm sm:text-base leading-relaxed text-rose-deep font-medium italic">
              {NILA_LYRICS}
            </pre>
          </div>

          <p className="mt-6 text-xs text-rose-deep/60 italic font-sans">
            * উপরে ডানদিকের মিউজিক প্লেয়ার থেকে অথবা স্ক্রিনে ব্যাকগ্রাউন্ডে গানটি সবসময় বাজছে ♥
          </p>
        </div>
      </section>

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

      {/* Interactive Date Invitation & Mymensingh Location RSVP Section */}
      <section className="relative z-10 flex justify-center px-6 py-28">
        <div className="scrapbook-shadow glass-card relative w-full max-w-2xl rounded-3xl border-t-8 border-rose-deep p-8 sm:p-14 border-x border-b border-gold/30 shadow-2xl">
          <span className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full bg-rose-deep px-6 py-2 text-xs font-bold tracking-widest text-primary-foreground shadow-md uppercase">
            A Special Birthday Date Invitation
          </span>

          {answer === "yes" ? (
            <div className="animate-reveal text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-deep text-gold shadow-lg">
                <Heart className="h-8 w-8 fill-gold" />
              </div>
              
              <h3 className="font-display text-3xl sm:text-4xl italic font-bold text-rose-deep">
                আজকের এই বিশেষ ডেট প্ল্যানার ♥
              </h3>
              <p className="mt-2 text-rose-deep/80 font-medium text-base">
                ময়মনসিংহের সবচেয়ে সুন্দর জায়গাগুলো থেকে তোমার পছন্দমতো স্থান, তারিখ ও সময় বেছে নাও:
              </p>

              {/* Location Picker */}
              <div className="mt-8 text-left">
                <label className="flex items-center gap-2 font-display text-base font-bold text-rose-deep mb-3">
                  <MapPin className="h-5 w-5 text-gold" />
                  <span>১. ময়মনসিংহের প্রিয় স্থান নির্বাচন করো:</span>
                </label>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {MYMENSINGH_SPOTS.map((spot) => (
                    <div
                      key={spot.id}
                      onClick={() => setSelectedSpot(spot.name)}
                      className={`cursor-pointer rounded-2xl p-4 transition-all duration-300 border ${
                        selectedSpot === spot.name
                          ? "bg-rose-deep text-cream border-gold shadow-lg scale-[1.02]"
                          : "glass-card text-rose-deep hover:bg-rose-deep/10 border-gold/20"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-display font-bold text-sm">{spot.name}</span>
                        {selectedSpot === spot.name && (
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold text-rose-deep">
                            <Check className="h-3.5 w-3.5 stroke-[3]" />
                          </span>
                        )}
                      </div>
                      <p className={`mt-1 text-xs ${selectedSpot === spot.name ? "text-cream/80" : "text-rose-deep/70"}`}>
                        {spot.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Date & Time Selectors */}
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 text-left">
                {/* Date Picker */}
                <div>
                  <label className="flex items-center gap-2 font-display text-base font-bold text-rose-deep mb-2">
                    <Calendar className="h-5 w-5 text-gold" />
                    <span>২. তারিখ নির্বাচন:</span>
                  </label>
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full rounded-2xl border border-gold/40 bg-white/90 px-4 py-3 text-sm font-semibold text-rose-deep focus:border-rose-deep focus:outline-none shadow-sm"
                  >
                    {DATE_OPTIONS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Time Picker */}
                <div>
                  <label className="flex items-center gap-2 font-display text-base font-bold text-rose-deep mb-2">
                    <Clock className="h-5 w-5 text-gold" />
                    <span>৩. সময় নির্বাচন:</span>
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full rounded-2xl border border-gold/40 bg-white/90 px-4 py-3 text-sm font-semibold text-rose-deep focus:border-rose-deep focus:outline-none shadow-sm"
                  >
                    {TIME_OPTIONS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Optional Custom Note */}
              <div className="mt-6 text-left">
                <label className="font-display text-sm font-bold text-rose-deep mb-2 block">
                  ৪. তোমার বিশেষ কোনো মেসেজ (ঐচ্ছিক):
                </label>
                <input
                  type="text"
                  placeholder="যেমন: সাথে আমার প্রিয় কফি খেতে হবে কিন্তু..."
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  className="w-full rounded-2xl border border-gold/30 bg-white/90 px-4 py-3 text-sm text-rose-deep focus:border-rose-deep focus:outline-none shadow-sm"
                />
              </div>

              {/* RSVP Actions & Messenger Direct Transmission */}
              <div className="mt-10 pt-6 border-t border-rose-deep/15 text-center">
                <p className="text-xs text-rose-deep/70 mb-4 font-medium">
                  নিচের বাটনে চাপ দিলে তোমার এই চয়েসটি সরাসরি আমার ফেসবুকে/মেসেঞ্জারে মেসেজ আকারে চলে আসবে ♥
                </p>

                <button
                  onClick={handleConfirmRSVP}
                  className="scrapbook-shadow group relative inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-rose-deep via-rose-mid to-rose-deep px-10 py-4 font-bold text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95 text-base w-full sm:w-auto"
                >
                  <MessageCircle className="h-5 w-5 text-gold fill-gold" />
                  <span>মেসেঞ্জারে কনফার্ম করো (Send to Messenger)</span>
                  <ExternalLink className="h-4 w-4" />
                </button>

                {confirmedRSVP && (
                  <p className="mt-4 text-sm font-bold text-emerald-700 animate-pulse">
                    ✓ মেসেঞ্জার ওপেন হয়েছে! মেসেজটি সেন্ড করে দাও ♥
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center">
              <h3 className="font-display mt-4 mb-4 text-3xl sm:text-4xl font-bold text-rose-deep leading-tight">
                কালকে কি আমার সাথে ঘুরতে বের হবে?
              </h3>
              <p className="mb-8 text-rose-deep/70 italic text-base">
                ময়মনসিংহের সুন্দর জায়গাগুলোতে তোমার জন্য একটা দারুণ মিষ্টি সারপ্রাইজ অপেক্ষা করছে...
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

              <p className="mt-8 border-t border-rose-deep/10 pt-6 text-xs text-rose-deep/50 italic">
                *হ্যাঁ বললে ময়মনসিংহের সেরা জায়গাগুলো থেকে তোমার পছন্দের প্লেস ও টাইম বেছে নিতে পারবে!
              </p>
            </div>
          )}
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
