"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Quote, BadgeCheck } from "lucide-react";
import Image from "next/image";
import { PRESIDENT_TINUBU_IMAGE } from "@/lib/images";

const SPEECH_EXCERPTS = [
  {
    text: "Economic Growth",
    detail:
      "We will harness the boundless energy of our youth, rebuild our infrastructure, and forge an economy that works for every citizen — from the markets of Lagos to the farmlands of Benue.",
  },
  {
    text: "Security Enhancement",
    detail:
      "Security remains our paramount commitment. We will deploy every resource to protect lives and property, so every Nigerian can sleep without fear and wake with hope.",
  },
  {
    text: "National Unity",
    detail:
      "Innovation is the engine of our renewal. By investing in digital infrastructure and modernizing education, Nigeria will lead — not merely compete — on the African continent.",
  },
];

export default function PresidentAddress() {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="speech" className="relative py-20 lg:py-24 bg-white overflow-hidden">
      <div className="absolute inset-0 bg-nigeria-pattern pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-14">
          {/* Left — Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative group">
              <div className="absolute -inset-2.5 bg-gradient-to-br from-emerald-300/40 via-transparent to-amber-300/40 rounded-3xl blur-md group-hover:blur-lg transition-all" />
              <div className="relative w-72 sm:w-80 lg:w-full max-w-sm aspect-[3/4] rounded-3xl overflow-hidden border-2 border-amber-400/50 bg-emerald-50 shadow-2xl shadow-emerald-900/10">
                {imgError ? (
                  <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                    <div className="text-center text-white p-6">
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/15 flex items-center justify-center">
                        <span className="text-3xl font-extrabold">BT</span>
                      </div>
                      <p className="font-bold text-lg">Bola Ahmed Tinubu</p>
                      <p className="text-white/80 text-sm">
                        President, Federal Republic of Nigeria
                      </p>
                    </div>
                  </div>
                ) : (
                  <Image
                    src={PRESIDENT_TINUBU_IMAGE}
                    alt="His Excellency, President Bola Ahmed Tinubu"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 288px, 400px"
                    onError={() => setImgError(true)}
                    unoptimized
                  />
                )}
                <div className="absolute top-4 left-4 right-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-emerald-700 shadow-sm border border-emerald-200">
                    <BadgeCheck className="w-4 h-4 text-emerald-500" />
                    Official Presidential Address &bull; 2026
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/85 via-charcoal/40 to-transparent p-4 pt-14">
                  <p className="text-white font-extrabold leading-tight">
                    President Bola Ahmed Tinubu
                  </p>
                  <p className="text-amber-300 text-xs font-semibold">
                    President, Federal Republic of Nigeria
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — Speech Excerpt */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-7 space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal leading-tight">
              A Message to the Nation{" "}
              <span className="text-gradient-emerald">from the President</span>
            </h2>

            <div className="relative pl-6 lg:pl-8 border-l-4 border-emerald-500">
              <Quote className="absolute -left-2 -top-2 w-8 h-8 text-emerald-300/70 bg-white rounded-full" />
              <blockquote className="text-base lg:text-lg text-gray-600 leading-relaxed space-y-4">
                <p>
                  &ldquo;Fellow Nigerians, our nation stands at the threshold of
                  a new era. Together, we shall harness the energy of our youth,
                  rebuild our infrastructure, and forge an economy that works
                  for every citizen across all 36 states and the Federal
                  Capital Territory.&rdquo;
                </p>
                <p>
                  &ldquo;We will modernize our security architecture, empower
                  our entrepreneurs, and place innovation at the heart of
                  national renewal. This is our covenant with the Nigerian
                  people.&rdquo;
                </p>
              </blockquote>
            </div>

            {/* Pillar chips */}
            <div className="flex flex-wrap gap-2.5">
              {SPEECH_EXCERPTS.map((e) => (
                <span
                  key={e.text}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-sm font-semibold text-emerald-700"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {e.text}
                </span>
              ))}
            </div>

            <div>
              <p className="text-sm font-bold text-charcoal mb-1">
                — His Excellency, President Bola Ahmed Tinubu, GCFR
              </p>
              <p className="text-xs text-gray-500">
                President of the Federal Republic of Nigeria
              </p>
            </div>

            <a
              href="/speech"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/45 hover:scale-105 transition-all"
            >
              Read Full Presidential Address
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}