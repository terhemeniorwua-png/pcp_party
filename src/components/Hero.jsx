"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, FileText, Users, BadgeCheck } from "lucide-react";
import Image from "next/image";
import { PRESIDENT_TINUBU_IMAGE, PARTY_CHAIRMAN_RALLY_IMAGE } from "@/lib/images";

const HERO_SLIDES = [
  {
    name: "His Excellency, President Bola Ahmed Tinubu",
    title: "President, Federal Republic of Nigeria",
    image: PRESIDENT_TINUBU_IMAGE,
  },
  {
    name: "The National Party Chairman",
    title: "National Chairman, Forward Movement of Nigeria",
    image: PARTY_CHAIRMAN_RALLY_IMAGE,
  },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const advanceSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(advanceSlide, 4000);
    return () => clearInterval(timer);
  }, [advanceSlide]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/60 via-white to-white">
      {/* Ambient light blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-24 w-[480px] h-[480px] bg-emerald-200/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 -left-24 w-[420px] h-[420px] bg-amber-100/50 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-teal-100/40 rounded-full blur-[100px]" />
      </div>

      {/* Geometric grid overlay */}
      <div className="absolute inset-0 opacity-[0.35] pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(5,150,105,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(5,150,105,0.06) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* Green overlay background */}
      <div className="absolute inset-0 bg-emerald-700/40 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-12 items-center gap-10 lg:gap-12">
          {/* Left Column — Typography & CTAs */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-6 lg:space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-emerald-200 text-emerald-700 text-sm font-semibold shadow-sm">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                Official Platform &bull; 2026 Vision
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-white leading-[1.08] tracking-tight"
            >
              A New Direction for{" "}
              <span className="text-gradient-emerald">Prosperity, Security</span>{" "}
              &amp; Innovation.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg lg:text-xl text-white/85 leading-relaxed max-w-xl"
            >
              Uniting citizens across all 36 States &amp; FCT to build an
              inclusive economy, empower youth, and modernize national
              infrastructure.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="/register"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-bold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-[1.03] transition-all"
              >
                Become a Member
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="/manifesto"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-bold text-white border-2 border-white/40 rounded-xl backdrop-blur-sm hover:bg-white/15 hover:border-white/70 transition-all"
              >
                <FileText className="w-5 h-5" />
                Read 2026 Manifesto
              </a>
            </motion.div>

            {/* Trust row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex items-center gap-5 pt-2"
            >
              <div className="flex -space-x-2">
                {["#10B981", "#059669", "#0D9488", "#F59E0B"].map((color) => (
                  <div
                    key={color}
                    className="w-8 h-8 rounded-full border-2 border-white"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <p className="text-sm text-white/80">
                Trusted by <span className="font-bold text-white">5M+ citizens</span> across all 36 States + FCT
              </p>
            </motion.div>
          </div>

          {/* Right Column — Animated Image Cross-Fade */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative w-full max-w-md mx-auto"
            >
              {/* Decorative ring */}
              <div className="absolute -inset-6 bg-gradient-to-tr from-emerald-200 via-transparent to-amber-200 rounded-[2rem] blur-2xl animate-pulse-glow" />

              {/* Image frame */}
              <div className="relative aspect-[4/4.5] rounded-[1.75rem] overflow-hidden border-4 border-white bg-emerald-50 shadow-2xl shadow-emerald-900/10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={HERO_SLIDES[currentIndex].image}
                      alt={HERO_SLIDES[currentIndex].name}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, 448px"
                      priority={currentIndex === 0}
                      unoptimized
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-white via-white/60 to-transparent p-6 pt-16">
                      <p className="text-emerald-600 text-sm font-bold uppercase tracking-wider mb-1">
                        {HERO_SLIDES[currentIndex].title}
                      </p>
                      <p className="text-charcoal font-bold text-lg">
                        {HERO_SLIDES[currentIndex].name}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Slide indicators */}
                <div className="absolute top-4 right-4 flex gap-2 z-10">
                  {HERO_SLIDES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      aria-label={`Show leader ${i + 1}`}
                      className={`h-2.5 rounded-full transition-all ${
                        i === currentIndex ? "w-7 bg-emerald-500" : "w-2.5 bg-white/70 hover:bg-white"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Floating Metric Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="absolute -bottom-5 -left-4 sm:left-4 z-20"
              >
                <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-2xl shadow-xl shadow-emerald-900/10 border border-emerald-100 animate-float">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-charcoal font-extrabold leading-tight">
                      5M+ Registered Nigerian Citizens
                    </p>
                    <p className="text-xs text-gray-500">Verified members nationwide</p>
                  </div>
                  <BadgeCheck className="w-5 h-5 text-emerald-500 ml-1" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}