import React, { useMemo, useState } from "react";

// Journey of Good Vibes™ — Parent Site Prototype (Single-file React)
// Vibrant background with slow pulsing/shine animation

const PILLARS = [
  { key: "positivity", title: "Positivity", emoji: "☀️", blurb: "Shift your inner voice. Celebrate small wins and cast light on what’s good.", color: "from-amber-400 to-orange-500", action: "Message 3 people a genuine compliment today." },
  { key: "resilience", title: "Resilience", emoji: "🧗", blurb: "Bounce forward, not just back. Progress is built one courageous step at a time.", color: "from-orange-500 to-rose-500", action: "Write down 1 setback + 1 lesson + the next micro-step." },
  { key: "kindness", title: "Kindness", emoji: "💛", blurb: "Lead with heart. Tiny acts compound into culture-shifting waves.", color: "from-emerald-400 to-teal-500", action: "Hold the door, tip extra, or send a thank-you note—today." },
  { key: "community", title: "Community", emoji: "🧩", blurb: "We level up faster together. Bring someone with you on the journey.", color: "from-sky-500 to-indigo-500", action: "Invite a friend to join a challenge or share a win in our chat." },
  { key: "growth", title: "Growth", emoji: "🌱", blurb: "Curiosity over comfort. Learn, try, iterate—then share the playbook.", color: "from-lime-400 to-emerald-500", action: "Block 20 minutes to learn 1 new thing and apply it right away." },
];

const QUOTES = [
  { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
  { text: "We are what we repeatedly do. Excellence, then, is not an act but a habit.", author: "(Inspired by) Will Durant" },
  { text: "The only way out is through—keep going, the light is closer than it feels.", author: "JOGV™" },
  { text: "Kindness is free. Give it wildly.", author: "JOGV™" },
  { text: "Tiny actions today become massive momentum tomorrow.", author: "JOGV™", small: true },
];

function useQuoteOfDay() {
  const dayKey = useMemo(() => {
    const today = new Date();
    const start = new Date(today.getFullYear(), 0, 0);
    const oneDay = 1000 * 60 * 60 * 24;
    const doy = Math.floor((today.getTime() - start.getTime()) / oneDay);
    return doy;
  }, []);
  return useMemo(() => QUOTES[dayKey % QUOTES.length], [dayKey]);
}

const Section = ({ id, title, children, subtitle }) => (
  <section id={id} className="py-16 sm:py-20">
    <div className="mx-auto max-w-6xl px-4">
      <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
        {title}
      </h2>
      {subtitle && <p className="mt-2 max-w-3xl text-slate-200">{subtitle}</p>}
      <div className="mt-8">{children}</div>
    </div>
  </section>
);

// Reusable gradient button (matches "Read Preface")
const GVButton = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="rounded-xl bg-gradient-to-r from-fuchsia-500 to-teal-400 px-4 py-2 text-sm font-bold text-white shadow hover:opacity-95"
  >
    {children}
  </a>
);

export default function App() {
  const qod = useQuoteOfDay();
  const [vibrant] = useState(true);               // keep theme state (no toggle button)
  const [openPreface, setOpenPreface] = useState(null); // 'foster' | 'job'

  const isLocalhost =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1");

  const handleSubmit = (e) => {
    // When running locally, show a nice preview instead of posting to Netlify
    if (isLocalhost) {
      e.preventDefault();
      alert("Thanks! (Local preview) — On Netlify this form will submit to your dashboard.");
      e.currentTarget.reset();
    }
    // On Netlify, we DO NOT preventDefault — Netlify will capture the submission.
  };

  return (
    <div className={`relative min-h-screen ${vibrant ? "text-white" : "text-slate-900"}`}>
      {vibrant ? (
        <div
          className="pointer-events-none absolute inset-0 -z-20 animate-pulse-shine"
          style={{
            background:
              "radial-gradient(circle at 10% 20%, rgba(255,0,128,0.6) 0%, transparent 40%), radial-gradient(circle at 90% 20%, rgba(255,154,0,0.6) 0%, transparent 40%), radial-gradient(circle at 20% 80%, rgba(0,204,255,0.6) 0%, transparent 40%), radial-gradient(circle at 80% 80%, rgba(132,56,255,0.6) 0%, transparent 40%)",
            backgroundColor: "#0f1220",
            opacity: 1,
          }}
        />
      ) : (
        <div className="absolute inset-0 -z-20 bg-[rgb(252,248,239)]" />
      )}

      <style>{`
        @keyframes pulse-shine { 0% { transform: scale(1); } 50% { transform: scale(1.03); } 100% { transform: scale(1); } }
        .animate-pulse-shine { animation: pulse-shine 15s ease-in-out infinite; }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* Top Bar */}
      <header className={`sticky top-0 z-50 border-b backdrop-blur ${vibrant ? "border-white/10 bg-[#0f1220]/60" : "border-slate-200/70 bg-[rgb(252,248,239)]/80"}`}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            {/* (Icon removed) */}
            <div className="leading-tight">
              <div className={`text-base font-extrabold ${vibrant ? "text-white" : "text-slate-900"}`}>Journey of Good Vibes™</div>
              <div className={`text-[11px] -mt-0.5 ${vibrant ? "text-white/70" : "text-slate-600"}`}>Leveling Up Life – One Good Vibe at a Time</div>
            </div>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <a href="#community" className="rounded-xl px-4 py-2 text-sm font-bold shadow bg-gradient-to-r from-fuchsia-500 to-teal-400 text-white">Join the Journey</a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:grid-cols-2">
          {/* Left: text & buttons */}
          <div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
              Level up your life with <span className="text-pink-400">Good Vibes.</span>
            </h1>
            <p className="mt-6 text-lg text-slate-200 max-w-xl">
              Journey of Good Vibes™ is a lifestyle movement built on five pillars — Positivity, Resilience, Kindness, Community, and Growth. Pick your vibe, take a tiny action, and watch momentum compound.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#journey-map" className="rounded-xl bg-white/10 px-5 py-3 font-semibold text-white shadow hover:bg-white/20">Explore the Journey Map</a>
              <a href="#good-vibe" className="rounded-xl bg-pink-500 px-5 py-3 font-semibold text-white shadow hover:bg-pink-600">Today's Good Vibe</a>
              <a href="#future" className="rounded-xl bg-gradient-to-r from-fuchsia-500 to-teal-400 px-5 py-3 font-semibold text-white shadow hover:opacity-95">The Future</a>
            </div>
          </div>

          {/* Right: Octopus image (from /public/octopus.png) */}
          <div className="mt-8 md:mt-0 flex justify-center md:justify-end">
            <img
              src="/octopus.png"
              alt="Journey of Good Vibes Octopus"
              className="w-56 sm:w-72 md:w-80 lg:w-[28rem] drop-shadow-2xl select-none pointer-events-none"
            />
          </div>
        </div>
      </section>

      {/* Quote of the Day */}
      <Section id="good-vibe" title="Good Vibe of the Day">
        <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-lg backdrop-blur">
          <blockquote className={`text-center ${qod.small ? "text-lg sm:text-xl" : "text-2xl sm:text-3xl"} font-extrabold leading-tight text-white`}>
            “{qod.text}”
            <footer className="mt-4 text-base font-semibold text-white/80">— {qod.author}</footer>
          </blockquote>
        </div>
      </Section>

      {/* Journey Map */}
      <Section id="journey-map" title="The Journey Map" subtitle="Walk the five pillars and unlock daily actions.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {PILLARS.map((p) => (
            <div key={p.key} className={`rounded-xl bg-gradient-to-br ${p.color} p-6 text-white shadow-lg`}>
              <div className="text-2xl">{p.emoji}</div>
              <h3 className="mt-2 text-lg font-bold">{p.title}</h3>
              <p className="mt-2 text-sm">{p.blurb}</p>
              <p className="mt-4 text-sm font-semibold">{p.action}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Founder Section */}
      <Section id="founder" title="Meet the Founder" subtitle="The vision and drive behind Journey of Good Vibes™.">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow flex h-full flex-col">
          <div className="text-xl font-extrabold text-white">Rusty Reynolds</div>
          <p className="mt-2 text-slate-200">
            Rusty Reynolds is the founder and visionary behind Journey of Good Vibes™. His life has been a testament to resilience, growth, and the power of a positive mindset. Coming from humble beginnings and overcoming challenges that might have stopped others, Rusty discovered early on that the real measure of success isn’t money or status — it’s the impact we leave on people’s lives.
          </p>
          <p className="mt-2 text-slate-200">
            Guided by this belief, he built Journey of Good Vibes™ as more than a brand. It’s a movement designed to spark kindness, inspire resilience, and remind people that no matter where they start, their journey can lead to something extraordinary.
          </p>
          <p className="mt-2 text-slate-200">
            Today, Journey of Good Vibes™ reflects Rusty’s mission: to help people level up in life — one good vibe at a time. Whether through books, digital projects, or community-driven initiatives, he continues to build platforms that spread encouragement, empower others to overcome adversity, and remind us all that even the smallest act of positivity can change the course of someone’s day — or even their life.
          </p>
        </div>
      </Section>

      {/* Books & Publications */}
      <Section id="books" title="Books & Publications" subtitle="Stories and playbooks published under A Journey of Good Vibes™ Publication.">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow">
            <div className="text-xl font-extrabold text-white">Foster to Freedom</div>
            <p className="mt-2 text-slate-200">Rusty’s story of resilience—from foster care to leadership—packed with real lessons and hope.</p>
            <div className="mt-3 text-xs text-slate-400">Pre-order coming soon.</div>
            <button type="button" onClick={() => setOpenPreface('foster')} className="mt-4 inline-block rounded-xl bg-gradient-to-r from-fuchsia-500 to-teal-400 px-4 py-2 text-sm font-bold text-white shadow">Read Preface</button>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow">
            <div className="text-xl font-extrabold text-white">Don’t Be Fooled: A Job Isn’t Your Purpose</div>
            <p className="mt-2 text-slate-200">A wake-up call about purpose beyond the paycheck—Rusty’s challenge to live for meaning, not just money.</p>
            <div className="mt-3 text-xs text-slate-400">Pre-order coming soon.</div>
            <button type="button" onClick={() => setOpenPreface('job')} className="mt-4 inline-block rounded-xl bg-gradient-to-r from-fuchsia-500 to-teal-400 px-4 py-2 text-sm font-bold text-white shadow">Read Preface</button>
          </div>
        </div>
      </Section>

      {/* Preface Modal */}
      {openPreface && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpenPreface(null);
          }}
        >
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#1e1e2f] p-6 shadow-lg">
            <h3 className="mb-4 text-xl font-extrabold text-white">
              {openPreface === 'foster'
                ? 'Foster to Freedom — Preface'
                : "Don’t Be Fooled: A Job Isn’t Your Purpose — Preface"}
            </h3>
            <button
              onClick={() => setOpenPreface(null)}
              className="absolute right-4 top-4 rounded-lg bg-white/10 px-3 py-1 text-sm font-bold text-white hover:bg-white/15"
              aria-label="Close preface"
            >
              Close
            </button>

            <div className="prose prose-invert mt-10 max-w-none">
              {openPreface === 'foster' ? (
                <>
                  <p>My name is Rusty Reynolds, and I grew up in the foster care system. I didn’t have a mom to call when life got hard, or a dad to teach me how to face the world. What I had were caseworkers, strangers’ houses, and the quiet, heavy truth that the people who were supposed to love me the most couldn’t keep me.</p>
                  <p>By the time most kids were learning who they were, I was learning how to survive. I learned how to read people, how to adapt quickly, and how to build walls just strong enough to keep my heart safe. But I also learned something else—that even in the hardest places, you can choose who you become.</p>
                  <p>I’ve been the kid sitting silently at someone else’s dinner table, afraid to take up too much space. I’ve been the teenager aging out of the system, wondering if I’d ever belong anywhere. And I’ve been the young adult stumbling into the real world with no family safety net, making mistake after mistake while trying to figure out how to build a life from scratch.</p>
                  <p><strong>But here’s what I want you to know:</strong> I made it. Not because someone saved me, but because I decided I wasn’t going to let my past define me. I worked my way up from the bottom. I built a career. I became a father. I learned to love myself in a way no one had taught me as a child.</p>
                  <p>This book isn’t written by a social worker or a psychologist. It’s written by someone who lived it—someone who knows what it feels like to be invisible, unwanted, and lost. Someone who also knows the quiet power that grows inside you when you refuse to give up.</p>
                  <p>I’m not here to tell you it’s easy. I’m here to tell you it’s possible.</p>
                </>
              ) : (
                <>
                  <p>Too many of us have been sold the lie that our job is our identity—that what we do to pay bills is the same as why we’re here. But that’s not the truth. A job can keep food on the table, but it alone will never fulfill your true ambitions. I wrote this book because I’ve walked both sides of the road: the long hours, the steady paychecks, the false sense of security—and the crash that comes when you realize a job can disappear in an instant. I’ve also walked the other side—the freedom and fulfillment that comes from discovering your real purpose, and building a life around it.</p>
                  <p>This book is not about quitting your job tomorrow. It’s about waking up to the bigger truth: your job is not your purpose. Your purpose is bigger, deeper, and more powerful than any position, paycheck, or promotion.</p>
                  <p>For years, I thought my identity was tied to the roles I held and the hours I put in. I know what it’s like to chase recognition, to believe that loyalty to a company meant security for my family. But security proved fragile. The economy shifts. Leadership changes. Promises break. And when they do, you’re left asking: Who am I without the job? That’s why I’m writing this book—to remind you that you are so much more than the hours you clock.</p>
                  <p>My promise is simple: if you’ll lean into the lessons here, you’ll start to see your life in a different light. You’ll see that setbacks can be fuel, that comfort can be a trap, and that passion can become a pathway. You’ll see that your life is not about clocking in—it’s about refusing the time trap and finding the bravery, courage, desire, and passion to step fully into your life. That’s what truly ensures you level up.</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Future of the Movement */}
      <Section
        id="future"
        title="The Future of the Movement"
        subtitle="How we plan to shape the movement together."
      >
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow">
          <p className="text-slate-200">
            We’re just at the beginning of this journey, but the vision is clear. The goal is to create a platform that helps people discover and follow their purpose—because with purpose comes fulfillment, and with fulfillment your vibe comes alive.
          </p>
          <p className="mt-3 text-slate-200">
            Along the way, we’ll focus on the real challenges: how to protect your vibe when others try to pull you down, and how to reset when you’re having an off day. These moments matter just as much as the good ones, and learning how to rise above them is part of the journey.
          </p>
          <p className="mt-3 text-slate-200">
            As we build this movement, there will be plenty of energy, guidance, and focus on staying true to your path. But this isn’t just my journey—it’s ours. Your thoughts, ideas, and stories will help make this a community of strength, resilience, and good vibes. Together, we can all walk the path of positivity and growth.
          </p>
        </div>
      </Section>

      {/* Community */}
      <Section
        id="community"
        title="Community"
        subtitle="Connect with the JOGVtoken meme coin community, and follow the broader JOGV movement."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow">
            <div className="text-lg font-bold text-white">Join the Meme Coin Community</div>
            <p className="mt-2 text-slate-200">Be part of the JOGVtoken network—connect, share, and grow with others on Telegram, Discord, and X.</p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <GVButton href="https://t.me/+DxahGsiRUQ9hNTkx">Telegram</GVButton>
              <GVButton href="https://discord.gg/vsTSyX5Z">Discord</GVButton>
              <GVButton href="https://x.com/jogv50">X (Twitter)</GVButton>
              <GVButton href="https://jogvtoken.com">jogvtoken.com</GVButton>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow flex flex-col justify-between">
            <div>
              <div className="text-lg font-bold text-white">Follow the Journey</div>
              <p className="mt-2 text-slate-200">Follow the Journey of Good Vibes™ on Facebook.</p>
            </div>
            <div className="mt-6">
              <GVButton href="https://www.facebook.com/profile.php?id=61581640531308">Facebook</GVButton>
            </div>
          </div>
        </div>
      </Section>

      {/* Submit a Good Vibe */}
      <Section id="submit" title="Submit a Good Vibe" subtitle="Share a positive story, quote, or challenge idea. We'll review and feature the best ones.">
        <form
          name="good-vibe"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow"
        >
          {/* Netlify requires these */}
          <input type="hidden" name="form-name" value="good-vibe" />
          <p className="hidden">
            <label>Don’t fill this out: <input name="bot-field" /></label>
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm text-white/80">Name</label>
              <input name="name" className="mt-1 w-full rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-white placeholder-white/60 outline-none" placeholder="Optional" />
            </div>
            <div>
              <label className="text-sm text-white/80">Email</label>
              <input name="email" type="email" className="mt-1 w-full rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-white placeholder-white/60 outline-none" placeholder="Optional" />
            </div>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm text-white/80">Type</label>
              <select name="type" className="mt-1 w-full rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-white outline-none">
                <option>Story</option>
                <option>Quote</option>
                <option>Challenge Idea</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm text-white/80">Message</label>
              <textarea name="message" className="mt-1 h-32 w-full rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-white placeholder-white/60 outline-none" placeholder="Share your good vibe..." />
            </div>
          </div>
          <div className="mt-6">
            <button type="submit" className="rounded-xl bg-gradient-to-r from-fuchsia-500 to-teal-400 px-5 py-3 text-sm font-bold text-white shadow hover:opacity-95">Submit</button>
          </div>
          {isLocalhost && (
            <p className="mt-3 text-xs text-white/60">(Preview mode: you’ll see an alert instead of a real submission.)</p>
          )}
        </form>
      </Section>

      {/* Footer */}
      <footer className="mt-16 border-t border-white/10 py-8">
        <div className="mx-auto max-w-6xl px-4 text-xs text-white/60">
          © {new Date().getFullYear()} Journey of Good Vibes™ (JOGV™). All rights reserved.
        </div>
      </footer>
    </div>
  );
}
