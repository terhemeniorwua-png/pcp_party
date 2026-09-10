"use client";

import { motion } from "framer-motion";
import { ArrowRight, FileDown, TrendingUp, ShieldCheck, Building2, Sprout, Cpu } from "lucide-react";
import { POLICY_PILLARS } from "@/lib/manifestoData";

const ICON_MAP = {
  "trending-up": TrendingUp,
  shield: ShieldCheck,
  building: Building2,
  sprout: Sprout,
  cpu: Cpu,
};

export default function ManifestoPreview() {
  return (
    <section className="relative py-20 lg:py-24 bg-white overflow-hidden">
      <div className="absolute inset-0 bg-nigeria-pattern pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold mb-4">
            <span className="w-2 h-2 bg-emerald-500 rounded-full" />
            The 2026 Blueprint
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal leading-tight mb-4">
            Policy Pillars for a{" "}
            <span className="text-gradient-emerald">Renewed Nigeria</span>
          </h2>
          <p className="text-gray-500 text-lg">
            Five foundational pillars guiding the FMN agenda and the full 2026
            manifesto.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {POLICY_PILLARS.slice(0, 5).map((pillar, i) => {
            const Icon = ICON_MAP[pillar.icon] || TrendingUp;
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-emerald-300 transition-all"
              >
                <div className="w-12 h-12 mb-5 rounded-2xl bg-[#F0FDF4] border border-emerald-100 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-emerald-400 group-hover:to-emerald-600 transition-colors">
                  <Icon className="w-6 h-6 text-emerald-600 group-hover:text-white" />
                </div>
                <h3 className="font-extrabold text-charcoal mb-1.5">
                  {pillar.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                  {pillar.subtitle}.
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
        >
          <a
            href="/manifesto"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-bold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl shadow-lg shadow-emerald-500/30 hover:scale-[1.03] transition-all"
          >
            Explore the Full Manifesto
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-bold text-emerald-700 border-2 border-emerald-200 rounded-xl hover:bg-emerald-50 hover:border-emerald-300 transition-all"
          >
            <FileDown className="w-5 h-5" />
            Download PDF
          </a>
        </motion.div>
      </div>
    </section>
  );
}