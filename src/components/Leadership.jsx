"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";
import { HOMEPAGE_LEADERS } from "@/lib/leadersData";

function LeaderImage({ src, name }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-400 to-emerald-600">
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
      className="object-cover object-top"
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      onError={() => setError(true)}
      unoptimized
    />
  );
}

export default function Leadership() {
  return (
    <section id="leadership" className="relative py-20 lg:py-24 bg-[#F0FDF4] overflow-hidden">
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-emerald-200 text-emerald-700 text-sm font-semibold mb-4 shadow-sm">
            <span className="w-2 h-2 bg-emerald-500 rounded-full" />
            National Working Committee
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal leading-tight mb-4">
            Our Party{" "}
            <span className="text-gradient-emerald">Leadership</span>
          </h2>
          <p className="text-gray-500 text-lg">
            The executive team steering FMN&apos;s national agenda across all 36
            states and the FCT.
          </p>
        </motion.div>

        {/* Leaders Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOMEPAGE_LEADERS.map((leader, i) => (
            <motion.article
              key={leader.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all border border-emerald-100"
            >
              {/* Portrait */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <div className="absolute inset-0">
                  <LeaderImage src={leader.image} name={leader.name} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <h3 className="text-white font-extrabold text-lg leading-tight drop-shadow">
                    {leader.name}
                  </h3>
                  <p className="text-amber-300 text-sm font-semibold">
                    {leader.title}
                  </p>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <p className="flex items-center gap-1.5 text-sm text-gray-500">
                  <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                  {leader.state} &bull; {leader.region}
                </p>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed line-clamp-2">
                  {leader.bio}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <a
            href="/leadership"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-bold text-emerald-700 border-2 border-emerald-200 rounded-xl hover:bg-white hover:border-emerald-300 transition-all"
          >
            Meet the Full Leadership Roster
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}