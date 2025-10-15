import React, { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { pushDL } from "../lib/analytics";

const SEED_GRATITUDE = [
  { name: "Sam", text: "A stranger paid for my coffee today.", date: "2025-09-03" },
  { name: "Lee", text: "Finished a tough email I’d been avoiding.", date: "2025-09-07" },
  { name: "Kai", text: "My kid’s laugh during breakfast.", date: "2025-09-10" },
];

export default function GratitudeWall() {
  const [entries, setEntries] = useLocalStorage("jogv_gratitude", SEED_GRATITUDE);
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const isLocalhost =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

  const submit = (e) => {
    if (isLocalhost) e.preventDefault();
    if (!text.trim()) return;

    const item = {
      name: name.trim() || "Anonymous",
      text: text.trim().slice(0, 140),
      date: new Date().toISOString().slice(0, 10),
    };

    setEntries([item, ...entries].slice(0, 60));
    pushDL("gratitude_submit");
    setName("");
    setText("");
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <form
        name="gratitude"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        onSubmit={submit}
        className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow"
      >
        <input type="hidden" name="form-name" value="gratitude" />
        <p className="hidden"><label>Don’t fill this out: <input name="bot-field" /></label></p>

        <h3 className="text-lg font-extrabold">Share a gratitude</h3>
        <div className="mt-3">
          <label className="text-sm text-white/80">Name (optional)</label>
          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-white placeholder-white/60 outline-none"
            placeholder="Your name"
          />
        </div>
        <div className="mt-3">
          <label className="text-sm text-white/80">
            What are you grateful for? <span className="opacity-70">(max 140)</span>
          </label>
          <textarea
            name="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={140}
            className="mt-1 h-24 w-full rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-white placeholder-white/60 outline-none"
            placeholder="A person, a moment, a tiny win…"
          />
        </div>
        <div className="mt-4">
          <button type="submit" className="rounded-xl bg-gradient-to-r from-fuchsia-500 to-teal-400 px-5 py-3 text-sm font-bold text-white shadow hover:opacity-95">
            Post to the wall
          </button>
        </div>
        {isLocalhost && (
          <p className="mt-2 text-xs text-white/60">Preview mode: saved locally. On Netlify, this will submit the form too.</p>
        )}
      </form>

      <div>
        <h3 className="text-lg font-extrabold mb-3">Wall of Good Vibes</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {entries.slice(0, 12).map((e, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold">
                  {(e.name || "A").slice(0, 1).toUpperCase()}
                </div>
                <div className="text-sm font-semibold">{e.name}</div>
                <div className="ml-auto text-[11px] text-white/60">{e.date}</div>
              </div>
              <div className="mt-2 text-sm opacity-90">{e.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
