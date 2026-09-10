"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Users, MapPin, Megaphone, Quote, PlusCircle, Heart } from "lucide-react";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import { NIGERIAN_STATES } from "@/lib/nigeriaData";
import { SUPPORTER_STATS, TESTIMONIALS, PARTNERS } from "@/lib/supportersData";

const WALL_KEY = "fmn_supporters_wall";

function initials(name) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function Avatar({ src, name }) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shrink-0">
        <span className="text-white font-bold text-sm">{initials(name)}</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={name}
      width={48}
      height={48}
      className="w-12 h-12 rounded-full object-cover border-2 border-emerald-200 shrink-0"
      onError={() => setError(true)}
      unoptimized
    />
  );
}

function getWall() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(WALL_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveWall(items) {
  try {
    localStorage.setItem(WALL_KEY, JSON.stringify(items));
  } catch {
    // ignore quota errors
  }
}

export default function SupportersPage() {
  const [custom, setCustom] = useState(getWall());
  const [form, setForm] = useState({ name: "", role: "", state: "Lagos", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;
    const entry = {
      name: form.name.trim(),
      role: form.role.trim() || "Community Supporter",
      state: form.state,
      quote: form.message.trim(),
      source: "wall",
    };
    const next = [entry, ...custom];
    setCustom(next);
    saveWall(next);
    setForm({ name: "", role: "", state: "Lagos", message: "" });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  }

  const wall = [...custom, ...TESTIMONIALS];

  return (
    <>
      <PageHeader
        eyebrow="Endorsements from all 36 States & FCT"
        title="The Grassroots"
        highlight="Supporters Wall"
        description="Read voices from across the Federation — and add your own endorsement to the national wall."
      />

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="grid sm:grid-cols-3 gap-4">
          {SUPPORTER_STATS.map((stat, i) => {
            const Icon = i === 0 ? Users : i === 1 ? MapPin : Megaphone;
            return (
              <div
                key={stat.label}
                className="bg-white rounded-3xl p-6 text-center border border-emerald-100 shadow-sm"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-extrabold text-emerald-600">
                  {stat.value}
                </div>
                <div className="font-bold text-charcoal">{stat.label}</div>
                <div className="text-sm text-gray-500">{stat.description}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Wall + form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 grid lg:grid-cols-3 gap-10">
        {/* Wall */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-extrabold text-charcoal mb-6 flex items-center gap-2">
            <Heart className="w-5 h-5 text-emerald-500" fill="currentColor" />
            {wall.length} Endorsements Nationwide
          </h2>

          <div className="grid sm:grid-cols-2 gap-5">
            <AnimatePresence mode="popLayout">
              {wall.map((t, i) => (
                <motion.figure
                  layout
                  key={`${t.name}-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className={`bg-white rounded-3xl p-5 border shadow-sm ${
                    t.source === "wall"
                      ? "border-amber-300 bg-amber-50/40"
                      : "border-emerald-100"
                  }`}
                >
                  {t.source === "wall" && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-700 text-[11px] font-bold mb-3">
                      YOU
                      <PlusCircle className="w-3 h-3" />
                    </span>
                  )}
                  <blockquote className="text-sm text-gray-600 leading-relaxed mb-4">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="flex items-center gap-3">
                    <Avatar src={t.image} name={t.name} />
                    <div>
                      <div className="font-bold text-charcoal text-sm">{t.name}</div>
                      <div className="text-xs text-gray-400">
                        {t.role} &bull; {t.state}
                      </div>
                    </div>
                  </figcaption>
                  <div className="flex items-center gap-1 mt-3 text-amber-400">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <span key={j} className="text-sm">
                        &#9733;
                      </span>
                    ))}
                  </div>
                </motion.figure>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Submission form */}
        <aside>
          <div className="lg:sticky lg:top-24 bg-[#F0FDF4] border border-emerald-200 rounded-3xl p-7">
            <h3 className="text-lg font-extrabold text-charcoal mb-1.5">
              Add Your Endorsement
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Stand with the movement — your words join the national wall.
            </p>

            {submitted && (
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 px-4 py-2.5 rounded-xl bg-emerald-100 text-emerald-800 text-sm font-bold"
              >
                Thank you! Your endorsement has been added below.
              </motion.p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-charcoal mb-1.5">
                  Full Name
                </label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Adaeze Obi"
                  className="w-full px-4 py-2.5 rounded-xl border border-emerald-200 bg-white text-charcoal placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-charcoal mb-1.5">
                  Role / Title (optional)
                </label>
                <input
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  placeholder="e.g. Farmer Cooperative Leader"
                  className="w-full px-4 py-2.5 rounded-xl border border-emerald-200 bg-white text-charcoal placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-charcoal mb-1.5">
                  State
                </label>
                <select
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-emerald-200 bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-emerald-400"
                >
                  {NIGERIAN_STATES.map((state) => (
                    <option key={state.name} value={state.name}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-charcoal mb-1.5">
                  Your Endorsement
                </label>
                <textarea
                  required
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Share why you stand with the Forward Movement of Nigeria..."
                  className="w-full px-4 py-2.5 rounded-xl border border-emerald-200 bg-white text-charcoal placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 font-bold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl shadow-lg shadow-emerald-500/25 hover:scale-[1.02] transition-all"
              >
                <PlusCircle className="w-5 h-5" />
                Post to the Wall
              </button>
            </form>
          </div>
        </aside>
      </section>

      {/* Partners */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <h2 className="text-center text-xl font-extrabold text-charcoal mb-8">
          Coalition &amp; Affiliate Organizations
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {PARTNERS.map((partner) => (
            <div
              key={partner.name}
              className="flex items-center gap-3 px-4 py-3.5 bg-white border border-emerald-100 rounded-2xl hover:border-emerald-300 hover:shadow-md transition-all"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-extrabold text-xs shrink-0">
                {partner.name.slice(0, 2)}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold text-charcoal truncate">
                  {partner.name}
                </div>
                <div className="text-xs text-gray-400 truncate">
                  {partner.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="/register"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-bold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl shadow-lg shadow-emerald-500/25 hover:scale-[1.03] transition-all"
          >
            <Users className="w-5 h-5" />
            Join {wall.length} Citizens on the Wall
          </a>
        </div>
      </section>
    </>
  );
}