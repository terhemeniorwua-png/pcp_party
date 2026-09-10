"use client";

import { motion } from "framer-motion";

const JOIN_STEPS = [
  {
    step: "01",
    title: "Tell us about yourself",
    description:
      "Share your name, email, and phone so we can keep you updated.",
  },
  {
    step: "02",
    title: "Select your constituency",
    description:
      "Choose your state, LGA, and ward so you're connected to your local chapter.",
  },
  {
    step: "03",
    title: "Get your digital ID card",
    description:
      "Your official FMN membership card is generated instantly and saved in your browser.",
  },
];

export default function JoinSteps() {
  return (
    <section className="py-14 lg:py-20 bg-white border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-3 gap-6">
        {JOIN_STEPS.map((item, i) => (
          <motion.div
            key={item.step}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="p-6 rounded-2xl border border-emerald-deep/10 bg-white shadow-sm"
          >
            <div className="text-4xl font-extrabold text-emerald-primary/20 mb-3">
              {item.step}
            </div>
            <h3 className="font-bold text-charcoal mb-1">{item.title}</h3>
            <p className="text-sm text-gray-500">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}