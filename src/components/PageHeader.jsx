"use client";

import { motion } from "framer-motion";

export default function PageHeader({ eyebrow, title, highlight, description }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-white to-white px-4 sm:px-6 lg:px-8 pt-16 pb-12 lg:pt-24 lg:pb-16 text-center">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-200/40 rounded-full blur-[120px]" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-100/50 rounded-full blur-[120px]" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-3xl mx-auto"
      >
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-emerald-200 text-emerald-700 text-sm font-semibold shadow-sm mb-5">
          <span className="w-2 h-2 bg-emerald-500 rounded-full" />
          {eyebrow}
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-charcoal leading-tight mb-4">
          {title}{" "}
          <span className="text-gradient-emerald">{highlight}</span>
        </h1>
        {description && (
          <p className="text-lg text-gray-500 leading-relaxed">{description}</p>
        )}
      </motion.div>
    </section>
  );
}