import React, { useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { pushDL } from "../lib/analytics";

const COMPLIMENTS = [
  "You make hard things feel possible.",
  "Your consistency is seriously inspiring.",
  "Your kindness changes the room.",
  "Your ideas make people better.",
  "Your growth this month is obvious.",
  "I admire how you show up—especially on hard days.",
  "Your courage is contagious.",
  "Your attention to detail is a superpower.",
  "Your presence makes people feel safe.",
  "Today’s you is stronger than last week’s you.",
];

export default function ComplimentGenerator() {
  const [name, setName] = useLocalStorage("jogv_cg_name", "");
  const [idx, setIdx] = useLocalStorage(
    "jogv_cg_idx",
    Math.floor(Math.random() * COMPLIMENTS.length)
  );

  const text = useMemo(() => {
    const base = COMPLIMENTS[idx % COMPLIMENTS.length];
    return name ? `${name}, ${base.charAt(0).toLowerCase()}${base.slice(1)}` : base;
  }, [name, idx]);

  const newOne = () => {
    const n = Math.floor(Math.random() * COMPLIMENTS.length);
    setIdx(n);
    pushDL("compliment_new", { index: n });
  };

  const copy = async () => {
    try { await navigator.clipboard.writeText(text); } catch {}
    pushDL("compliment_copy");
  };

  const shareX = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text + " #GoodVibes")}`;
    window.open(url, "_blank", "noopener,noreferrer");
    pushDL("compliment_share_x");
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow backdrop-blur">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="flex-1">
          <label className="text-sm text-white/80">Add a name (optional)</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-white placeholder-white/60 outline-none"
            placeholder="e.g., Alex"
          />
        </div>
        <div className="mt-2 md:mt-0 flex gap-2">
          <button onClick={newOne} className="rounded-xl bg-white/10 px-4 py-2 font-semibold hover:bg-white/15">New</button>
          <button onClick={copy} className="rounded-xl bg-white/10 px-4 py-2 font-semibold hover:bg-white/15">Copy</button>
          <button onClick={shareX} className="rounded-xl bg-gradient-to-r from-fuchsia-500 to-teal-400 px-4 py-2 font-semibold text-white hover:opacity-95">Share</button>
        </div>
      </div>
      <div className="mt-4 rounded-xl bg-white/5 p-5 text-lg font-semibold">{text}</div>
      <div className="mt-3 text-xs text-white/60">Tip: paste this into a text to make someone’s day.</div>
    </div>
  );
}
