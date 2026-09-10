"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Tag, X, Quote } from "lucide-react";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import { LEADERS, REGIONS } from "@/lib/leadersData";

const FILTERS = ["All Regions", ...REGIONS.map((r) => r.name)];

function LeaderImage({ src, name, className }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-400 to-emerald-600 ${className || ""}`}>
        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
          <span className="text-white font-extrabold text-2xl">
            {name
              .split(" ")
              .slice(-2)
              .map((n) => n[0])
              .join("")}
          </span>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={name}
      fill
      className={`object-cover object-top ${className || ""}`}
      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 33vw, 25vw"
      onError={() => setError(true)}
      unoptimized
    />
  );
}

export default function LeadershipPage() {
  const [filter, setFilter] = useState("All Regions");
  const [selected, setSelected] = useState(null);

  const filtered =
    filter === "All Regions"
      ? LEADERS
      : LEADERS.filter((leader) => leader.region === filter);

  return (
    <>
      <PageHeader
        eyebrow="National Working Committee & Executive Leaders"
        title="Party Leadership"
        highlight="Directory"
        description="Meet the national executive — 10 distinguished leaders directing the Forward Movement of Nigeria from every geopolitical region of the country."
      />

      {/* Region filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {FILTERS.map((region) => (
            <button
              key={region}
              onClick={() => setFilter(region)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                filter === region
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                  : "bg-white border border-emerald-200 text-emerald-700 hover:bg-emerald-50"
              }`}
            >
              {region}
            </button>
          ))}
        </div>

        <motion.p
          key={filter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-gray-500 mt-4"
        >
          {filter === "All Regions"
            ? "Showing all 10 national executives"
            : `${filtered.length} leader${filtered.length === 1 ? "" : "s"} from ${filter}`}
        </motion.p>
      </section>

      {/* Roster grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((leader, i) => (
              <motion.article
                layout
                key={leader.name}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all border border-emerald-100"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <div className="absolute inset-0">
                    <LeaderImage src={leader.image} name={leader.name} />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-bold text-emerald-700 shadow-sm">
                    <Tag className="w-3 h-3" />
                    {leader.region}
                  </span>
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="text-white font-extrabold text-lg leading-tight drop-shadow">
                      {leader.name}
                    </h3>
                    <p className="text-amber-300 text-sm font-semibold">
                      {leader.title}
                    </p>
                  </div>
                </div>

                <div className="p-5">
                  <p className="flex items-center gap-1.5 text-sm text-gray-500 mb-3">
                    <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                    {leader.state}
                  </p>
                  <button
                    onClick={() => setSelected(leader)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-emerald-700 border-2 border-emerald-200 hover:bg-emerald-500 hover:border-emerald-500 hover:text-white transition-all"
                  >
                    View Biography
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Biography modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm"
              onClick={() => setSelected(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setSelected(null)}
                aria-label="Close biography"
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:bg-emerald-50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-56">
                <div className="absolute inset-0">
                  <LeaderImage src={selected.image} name={selected.name} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-6">
                  <h3 className="text-white font-extrabold text-xl">
                    {selected.name}
                  </h3>
                  <p className="text-amber-300 font-semibold">
                    {selected.title}
                  </p>
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                    <Tag className="w-3 h-3" /> {selected.region}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                    <MapPin className="w-3 h-3" /> {selected.state}
                  </span>
                </div>

                <div className="relative">
                  <Quote className="w-6 h-6 text-emerald-300 mb-2" />
                  <p className="text-gray-600 leading-relaxed">
                    {selected.bio}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}