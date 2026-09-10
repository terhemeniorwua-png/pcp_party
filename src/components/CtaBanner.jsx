"use client";

import { motion } from "framer-motion";
import { ArrowRight, Users } from "lucide-react";

export default function CtaBanner() {
  return (
    <section className="relative py-16 lg:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 p-10 lg:p-14 text-center shadow-2xl shadow-emerald-500/30"
        >
          {/* Decorative */}
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-amber-300/20 rounded-full blur-2xl" />

          <div className="relative z-10">
            <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
              Ready to Join the Forward Movement?
            </h2>
            <p className="text-emerald-50/90 text-lg mb-8 max-w-xl mx-auto">
              Register in under two minutes and receive your official digital
              FMN membership card — free for every Nigerian citizen.
            </p>
            <a
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold text-emerald-700 bg-white rounded-xl shadow-lg hover:scale-[1.04] transition-all"
            >
              Become a Member Now
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}