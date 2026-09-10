"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Download,
  FileText,
  Mic,
  Quote,
  CalendarDays,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import { PRESIDENT_TINUBU_IMAGE } from "@/lib/images";

const TRANSCRIPT = [
  {
    heading: "Introduction",
    paragraphs: [
      "Fellow Nigerians, I speak to you today not merely as your President, but as a fellow citizen filled with hope and conviction about the greatness that lies ahead of us. We stand at the threshold of a new era — an era where Nigeria's immense potential is finally matched by focused, purposeful national action.",
      "The journey before us demands unity of purpose. Across all 36 states and the Federal Capital Territory, our people yearn for a government that delivers: an economy that works, streets that are safe, and opportunities that are within reach of every young Nigerian.",
    ],
  },
  {
    heading: "Economic Growth & Reforms",
    paragraphs: [
      "Our economic reform agenda is built on one unshakeable principle: growth must be inclusive. We are consolidating public finances, modernizing revenue administration, and removing the obstacles that have long stifled small and medium enterprises.",
      "We will attract patient capital through predictable policy, invest in critical infrastructure that lowers the cost of doing business, and create over ten million new, dignified jobs for our people over the course of this administration.",
      "To our diaspora brothers and sisters, this government will create the enabling environment for you to invest, return, and contribute to the reconstruction of our beloved nation.",
    ],
  },
  {
    heading: "Security & National Cohesion",
    paragraphs: [
      "Security remains my paramount commitment. We will continue to modernize our security architecture, deploy technology and community policing, and reward the gallant men and women of our armed forces who defend our sovereignty.",
      "Every Nigerian — farmer, trader, mother, student — must be able to sleep without fear and wake with hope. Safety is not a privilege for a few; it is a right for all.",
      "Let us also renew our commitment to one another. Our strength is in our diversity. No region, religion, or ethnicity stands alone in this nation; we rise together or we stagnate together.",
    ],
  },
  {
    heading: "Youth Empowerment & Innovation",
    paragraphs: [
      "To the young people of Nigeria — you are not the leaders of tomorrow only; you are the architects of today. We are establishing digital skills academies in every senatorial district, funding innovation hubs, and positioning the technology sector as the engine of our new economy.",
      "We will modernize our educational system to match global standards, equip our universities to conduct research that solves Nigerian problems, and ensure that talent — wherever it is found — has a clear path to prosperity.",
    ],
  },
  {
    heading: "A Call to National Unity",
    paragraphs: [
      "Fellow Nigerians, ours is a noble history and an even brighter future. The bonds that unite us are stronger than any force that seeks to divide us.",
      "Let us march forward together — with discipline, with courage, and with love of country — to build the Nigeria of our dreams. God bless the Federal Republic of Nigeria.",
    ],
  },
];

const KEY_QUOTES = [
  {
    quote:
      "Safety is not a privilege for a few; it is a right for all.",
    label: "On Security",
  },
  {
    quote:
      "Talent — wherever it is found — has a clear path to prosperity.",
    label: "On Youth & Innovation",
  },
  {
    quote:
      "We rise together or we stagnate together.",
    label: "On National Unity",
  },
];

export default function SpeechPage() {
  const [imgError, setImgError] = useState(false);

  return (
    <>
      <PageHeader
        eyebrow="Official Address • Updated 2026"
        title="The President's Address to the"
        highlight="Nation"
        description="Read the full transcript of His Excellency, President Bola Ahmed Tinubu's address on national growth, economic reform, and youth empowerment."
      />

      {/* Video preview frame */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative aspect-video rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-600 shadow-2xl shadow-emerald-500/20 group cursor-pointer"
        >
          {!imgError && (
            <Image
              src={PRESIDENT_TINUBU_IMAGE}
              alt="Presidential address video preview"
              fill
              className="object-cover object-top opacity-70"
              sizes="(max-width: 1024px) 100vw, 1024px"
              onError={() => setImgError(true)}
              unoptimized
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/70 via-transparent to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-white shadow-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play className="w-9 h-9 text-emerald-600 ml-1" fill="currentColor" />
            </div>
          </div>
          <div className="absolute bottom-4 left-5 flex items-center gap-3 text-white">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-sm font-semibold">
              <CalendarDays className="w-4 h-4" /> Address to the Nation • 2026
            </div>
          </div>
          <span className="absolute top-4 right-5 px-3 py-1.5 rounded-full bg-amber-400 text-emerald-900 text-xs font-extrabold uppercase tracking-wide">
            Video Preview
          </span>
        </motion.div>

        {/* Downloads */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-bold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl shadow-lg shadow-emerald-500/25 hover:scale-[1.03] transition-all"
          >
            <Download className="w-5 h-5" />
            Download PDF Transcript
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-bold text-emerald-700 border-2 border-emerald-200 rounded-xl hover:bg-emerald-50 transition-all"
          >
            <Mic className="w-5 h-5" />
            Download Audio
          </a>
        </motion.div>
      </section>

      {/* Key quotes */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid sm:grid-cols-3 gap-4">
          {KEY_QUOTES.map((item, i) => (
            <motion.blockquote
              key={item.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative bg-[#F0FDF4] border border-emerald-200 rounded-3xl p-6"
            >
              <Quote className="w-7 h-7 text-emerald-400 mb-3" />
              <p className="text-lg font-bold text-emerald-800 leading-snug mb-4">
                &ldquo;{item.quote}&rdquo;
              </p>
              <span className="inline-flex px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 text-xs font-bold">
                {item.label}
              </span>
            </motion.blockquote>
          ))}
        </div>
      </section>

      {/* Full transcript */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="space-y-10">
          {TRANSCRIPT.map((section, i) => (
            <motion.article
              key={section.heading}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <h2 className="flex items-center gap-3 text-xl font-extrabold text-charcoal mb-4">
                <span className="w-1.5 h-6 rounded-full bg-emerald-500" />
                {section.heading}
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                {section.paragraphs.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 flex items-center justify-center gap-2 text-sm text-gray-400"
        >
          <MapPin className="w-4 h-4 text-emerald-500" />
          Issued from the State House, Abuja — Federal Capital Territory, Nigeria
        </motion.div>

        <div className="mt-8 flex justify-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-bold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl shadow-lg shadow-emerald-500/25 hover:scale-[1.03] transition-all"
          >
            <FileText className="w-5 h-5" />
            Read as Official Document (PDF)
          </a>
        </div>
      </section>
    </>
  );
}