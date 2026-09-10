"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  ChevronDown,
  Download,
  FileText,
  CalendarDays,
  TrendingUp,
  ShieldCheck,
  Building2,
  Sprout,
  Cpu,
  CheckCircle2,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { POLICY_PILLARS, PRESS_RELEASES } from "@/lib/manifestoData";

const ICON_MAP = {
  "trending-up": TrendingUp,
  shield: ShieldCheck,
  building: Building2,
  sprout: Sprout,
  cpu: Cpu,
};

export default function ManifestoPage() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState("economy");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return POLICY_PILLARS;
    return POLICY_PILLARS.filter(
      (pillar) =>
        pillar.title.toLowerCase().includes(q) ||
        pillar.subtitle.toLowerCase().includes(q) ||
        pillar.description.toLowerCase().includes(q) ||
        pillar.highlights.some((h) => h.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <>
      <PageHeader
        eyebrow="The 2026 National Agenda"
        title="Official Party"
        highlight="Manifesto"
        description="Searchable policy pillars driving the Forward Movement of Nigeria — from economic reform to youth innovation — each available as an official PDF download."
      />

      {/* Search + download */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the manifesto — e.g. jobs, security, agriculture..."
            className="w-full pl-12 pr-5 py-4 rounded-2xl border-2 border-emerald-100 bg-white text-charcoal placeholder-gray-400 shadow-sm focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 transition-all"
          />
        </div>
        <div className="flex justify-center mt-5">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-7 py-3.5 font-bold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl shadow-lg shadow-emerald-500/25 hover:scale-[1.03] transition-all"
          >
            <Download className="w-5 h-5" />
            Download Full Manifesto (PDF &bull; 6.8 MB)
          </a>
        </div>
      </section>

      {/* Pillars */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <AnimatePresence mode="popLayout">
          {filtered.map((pillar, i) => {
            const Icon = ICON_MAP[pillar.icon] || TrendingUp;
            const isOpen = open === pillar.id;
            return (
              <motion.article
                layout
                key={pillar.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3 }}
                className="mb-4"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : pillar.id)}
                  className={`w-full flex items-center gap-4 p-5 bg-white border rounded-2xl text-left transition-all ${
                    isOpen
                      ? "border-emerald-300 shadow-lg shadow-emerald-500/10 ring-2 ring-emerald-100"
                      : "border-emerald-100 hover:border-emerald-300 shadow-sm"
                  }`}
                >
                  <div
                    className={`w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center transition-colors ${
                      isOpen
                        ? "bg-gradient-to-br from-emerald-400 to-emerald-600"
                        : "bg-[#F0FDF4] border border-emerald-100"
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        isOpen ? "text-white" : "text-emerald-600"
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-extrabold text-charcoal">{pillar.title}</h3>
                    <p className="text-sm text-gray-500 truncate">
                      {pillar.subtitle} &bull; Download: {pillar.download} (
                      {pillar.fileSize})
                    </p>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-emerald-500 transition-transform shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 rounded-2xl border border-emerald-100 bg-[#F0FDF4]/60 p-6"
                  >
                    <p className="text-gray-600 leading-relaxed mb-5">
                      {pillar.description}
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-3 mb-6">
                      {pillar.highlights.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-sm text-charcoal font-medium"
                        >
                          <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-emerald-700 border-2 border-emerald-200 rounded-xl hover:bg-emerald-50 transition-all"
                    >
                      <FileText className="w-4 h-4" />
                      Download Pillar PDF ({pillar.download})
                    </a>
                  </motion.div>
                )}
              </motion.article>
            );
          })}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            No pillars match &ldquo;{query}&rdquo;. Try &ldquo;jobs&rdquo;,
            &ldquo;security&rdquo;, or &ldquo;agriculture&rdquo;.
          </div>
        )}
      </section>

      {/* Press releases */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <h2 className="text-2xl font-extrabold text-charcoal mb-6">
          Latest Press Releases
        </h2>
        <div className="grid sm:grid-cols-3 gap-5">
          {PRESS_RELEASES.map((release, i) => (
            <motion.article
              key={release.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-3xl border border-emerald-100 p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold mb-4">
                <CalendarDays className="w-3 h-3" />
                {release.date}
              </span>
              <h3 className="font-extrabold text-charcoal leading-snug mb-2 text-sm">
                {release.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {release.excerpt}
              </p>
            </motion.article>
          ))}
        </div>
      </section>
    </>
  );
}