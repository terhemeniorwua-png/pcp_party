"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users, MapPin, Megaphone, Quote, ArrowRight } from "lucide-react";
import Image from "next/image";
import { SUPPORTER_STATS, TESTIMONIALS, PARTNERS } from "@/lib/supportersData";

function AvatarImg({ src, name }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shrink-0">
        <span className="text-white font-bold">
          {name
            .split(" ")
            .slice(0, 2)
            .map((n) => n[0])
            .join("")}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={name}
      width={56}
      height={56}
      className="w-14 h-14 rounded-full object-cover border-2 border-emerald-200 shrink-0"
      onError={() => setError(true)}
      unoptimized
    />
  );
}

export default function Supporters() {
  return (
    <section id="supporters" className="relative py-20 lg:py-24 bg-white overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-sm font-semibold mb-4">
            <span className="w-2 h-2 bg-amber-400 rounded-full" />
            The People&apos;s Coalition
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal leading-tight">
            Backed by Millions of{" "}
            <span className="text-gradient-emerald">Citizens Nationwide</span>
          </h2>
        </motion.div>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="grid sm:grid-cols-3 gap-4 mb-14"
        >
          {SUPPORTER_STATS.map((stat) => {
            const Icon = stat.label.startsWith("Registered")
              ? Users
              : stat.label.startsWith("LGAs")
              ? MapPin
              : Megaphone;
            return (
              <div
                key={stat.label}
                className="relative bg-white rounded-3xl p-6 text-center border border-emerald-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="pt-6 text-4xl font-extrabold text-emerald-600 mb-1">
                  {stat.value}
                </div>
                <div className="font-bold text-charcoal mb-1">{stat.label}</div>
                <div className="text-sm text-gray-500">{stat.description}</div>
              </div>
            );
          })}
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.slice(0, 6).map((testimonial, i) => (
            <motion.figure
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="group bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <Quote className="w-8 h-8 text-amber-400/50 mb-4" />
              <blockquote className="text-gray-600 leading-relaxed mb-5">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <AvatarImg src={testimonial.image} name={testimonial.name} />
                <div>
                  <div className="font-bold text-charcoal text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-gray-400">
                    {testimonial.role} &bull; {testimonial.state}
                  </div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {/* Ticker of partners */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-14"
        >
          <p className="text-center text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">
            Affiliated Organizations &amp; Coalition Partners
          </p>
          <div className="relative overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            <div className="flex gap-4 w-max animate-ticker hover:[animation-play-state:paused]">
              {[...PARTNERS, ...PARTNERS].map((partner, i) => (
                <div
                  key={`${partner.name}-${i}`}
                  className="flex items-center gap-3 px-6 py-3 bg-[#F0FDF4] border border-emerald-100 rounded-2xl whitespace-nowrap hover:border-emerald-300 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-extrabold text-xs">
                    {partner.name.slice(0, 2)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-charcoal">
                      {partner.name}
                    </span>
                    <span className="text-xs text-gray-400">{partner.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-8">
            <a
              href="/supporters"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-bold text-emerald-700 border-2 border-emerald-200 rounded-xl hover:bg-emerald-50 hover:border-emerald-300 transition-all"
            >
              Explore the Supporters Wall
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}