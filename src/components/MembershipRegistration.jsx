"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Download,
  PartyPopper,
  FingerprintPattern,
  User,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { NIGERIAN_STATES, generateMemberId } from "@/lib/nigeriaData";
import {
  subscribeMemberStore,
  getMemberSnapshot,
  saveMemberData,
  clearMemberData,
} from "@/lib/memberStorage";

const STEPS = [
  { id: 1, name: "Personal Details" },
  { id: 2, name: "Constituency" },
  { id: 3, name: "Your Digital ID" },
];

const INITIAL_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  state: "",
  lga: "",
  ward: "",
};

function QrMock({ seed }) {
  const cells = [];
  const base = (seed.charCodeAt(0) || 65) + (seed.charCodeAt(seed.length - 1) || 66);
  for (let i = 0; i < 81; i++) {
    const row = Math.floor(i / 9);
    const col = i % 9;
    const isFinder =
      (row < 3 && col < 3) ||
      (row < 3 && col > 5) ||
      (row > 5 && col < 3);
    const border = row === 0 || row === 8 || col === 0 || col === 8;
    const deterministic = (base + row * 7 + col * 3 + i) % 5 < 3;
    cells.push(
      isFinder || border ? true : deterministic
    );
  }
  return (
    <svg viewBox="0 0 9 9" className="w-full h-full">
      {cells.map((filled, i) =>
        filled ? (
          <rect
            key={i}
            x={i % 9}
            y={Math.floor(i / 9)}
            width="1"
            height="1"
            fill="currentColor"
          />
        ) : null
      )}
    </svg>
  );
}

function MemberCard({ member }) {
  return (
    <div className="w-full max-w-sm aspect-[1.586] rounded-2xl overflow-hidden shadow-2xl">
      {/* Gradient header */}
      <div className="h-[38%] bg-gradient-to-r from-emerald-deep via-emerald-primary to-gold-primary relative px-5 pt-4 pb-3 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-white/95 flex items-center justify-center">
            <div className="w-6 h-6 text-emerald-deep flex items-center justify-center">
              <span className="text-emerald-deep font-extrabold text-xs leading-none">FG</span>
            </div>
          </div>
          <div className="leading-tight">
            <p className="text-white font-extrabold text-base tracking-tight">
              FORWARD MOVEMENT
            </p>
            <p className="text-gold-primary text-[10px] font-bold tracking-[0.25em] uppercase">
              of Nigeria
            </p>
          </div>
        </div>
        <div className="text-right leading-tight">
          <p className="text-white text-[10px] font-medium uppercase tracking-wider opacity-80">
            Member ID
          </p>
          <p className="text-gold-primary font-mono font-bold text-sm">
            {member.memberId}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="h-[46%] bg-white px-5 py-3 flex items-center gap-4">
        {/* QR */}
        <div className="w-16 h-16 shrink-0 rounded-lg border-2 border-emerald-deep/15 p-1 text-emerald-deep bg-emerald-deep/5">
          <QrMock seed={member.memberId} />
        </div>
        <div className="flex-1 min-w-0 grid grid-cols-2 gap-x-3 gap-y-1.5">
          <div>
            <p className="text-[9px] uppercase tracking-wider text-gray-400 font-semibold">Full Name</p>
            <p className="text-xs font-bold text-charcoal truncate">
              {member.firstName} {member.lastName}
            </p>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-wider text-gray-400 font-semibold">State</p>
            <p className="text-xs font-bold text-charcoal truncate">{member.state}</p>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-wider text-gray-400 font-semibold">LGA</p>
            <p className="text-xs font-bold text-charcoal truncate">{member.lga}</p>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-wider text-gray-400 font-semibold">Ward</p>
            <p className="text-xs font-bold text-charcoal truncate">{member.ward}</p>
          </div>
        </div>
      </div>

      {/* Footer strip */}
      <div className="h-[16%] bg-emerald-deep px-5 flex items-center justify-between">
        <p className="text-white/60 text-[9px] uppercase tracking-wider">
          Valid Nationwide • 2026 – 2030
        </p>
        <p className="text-gold-primary text-[9px] font-bold uppercase tracking-wider">
          Official Party Member
        </p>
      </div>
    </div>
  );
}

function drawCardToCanvas(canvas, member) {
  const ctx = canvas.getContext("2d");
  const W = canvas.width;
  const H = canvas.height;

  const grad = ctx.createLinearGradient(0, 0, W, 0);
  grad.addColorStop(0, "#064E3B");
  grad.addColorStop(0.5, "#047857");
  grad.addColorStop(1, "#F59E0B");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H * 0.34);

  // Header content
  ctx.textAlign = "left";
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 22px system-ui, sans-serif";
  ctx.fillText("FORWARD MOVEMENT", 24, 40);
  ctx.fillStyle = "#F59E0B";
  ctx.font = "bold 11px system-ui, sans-serif";
  ctx.fillText("O F   N I G E R I A", 24, 56);

  ctx.textAlign = "right";
  ctx.fillStyle = "rgba(255,255,255,0.75)";
  ctx.font = "10px system-ui, sans-serif";
  ctx.fillText("MEMBER ID", W - 24, 34);
  ctx.fillStyle = "#F59E0B";
  ctx.font = "bold 15px monospace";
  ctx.fillText(member.memberId, W - 24, 50);

  // Gold divider
  ctx.fillStyle = "#D97706";
  ctx.fillRect(0, H * 0.34 - 6, W, 6);

  // White body
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, H * 0.34, W, H * 0.5);

  // QR mock (deterministic)
  const qrSize = 96;
  const qrX = 20;
  const qrY = H * 0.34 + 20;
  ctx.fillStyle = "#047857";
  const seed = member.memberId;
  const base = (seed.charCodeAt(0) || 65) + (seed.charCodeAt(seed.length - 1) || 66);
  const cell = qrSize / 9;
  for (let i = 0; i < 81; i++) {
    const row = Math.floor(i / 9);
    const col = i % 9;
    const isFinder = (row < 3 && col < 3) || (row < 3 && col > 5) || (row > 5 && col < 3);
    const border = row === 0 || row === 8 || col === 0 || col === 8;
    const deterministic = (base + row * 7 + col * 3 + i) % 5 < 3;
    if (isFinder || border || deterministic) {
      ctx.fillRect(qrX + col * cell, qrY + row * cell, cell - 0.5, cell - 0.5);
    }
  }

  // Fields
  const fields = [
    { label: "FULL NAME", value: `${member.firstName} ${member.lastName}`, x: 130, y: qrY + 10 },
    { label: "STATE", value: member.state, x: 130, y: qrY + 40 },
    { label: "LGA", value: member.lga, x: 250, y: qrY + 40 },
    { label: "WARD", value: member.ward, x: 250, y: qrY + 70 },
  ];
  fields.forEach((field) => {
    ctx.textAlign = "left";
    ctx.fillStyle = "#9CA3AF";
    ctx.font = "8px system-ui, sans-serif";
    ctx.fillText(field.label, field.x, field.y);
    ctx.fillStyle = "#0F172A";
    ctx.font = "bold 12px system-ui, sans-serif";
    ctx.fillText(field.value, field.x, field.y + 13);
  });

  // Footer strip
  ctx.fillStyle = "#064E3B";
  ctx.fillRect(0, H - H * 0.16, W, H * 0.16);
  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.font = "9px system-ui, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("VALID NATIONWIDE  •  2026 – 2030", 20, H - 28);
  ctx.fillStyle = "#F59E0B";
  ctx.font = "bold 9px system-ui, sans-serif";
  ctx.textAlign = "right";
  ctx.fillText("OFFICIAL PARTY MEMBER", W - 20, H - 28);
}

export default function MembershipRegistration() {
  const member = useSyncExternalStore(
    subscribeMemberStore,
    getMemberSnapshot,
    () => null
  );
  const isExisting = Boolean(member && member.memberId);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const cardRef = useRef(null);

  const updateField = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const validateStep1 = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = "First name is required";
    if (!form.lastName.trim()) errs.lastName = "Last name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Enter a valid email";
    if (!form.phone.trim()) errs.phone = "Phone number is required";
    else if (!/^\+?[\d\s().-]{10,15}$/.test(form.phone)) errs.phone = "Enter a valid phone";
    return errs;
  };

  const validateStep2 = () => {
    const errs = {};
    if (!form.state) errs.state = "Select your state";
    if (!form.lga.trim()) errs.lga = "LGA is required";
    if (!form.ward.trim()) errs.ward = "Ward is required";
    return errs;
  };

  const nextStep = () => {
    if (step === 1) {
      const errs = validateStep1();
      setErrors(errs);
      if (Object.keys(errs).length) return;
      setStep(2);
    } else if (step === 2) {
      const errs = validateStep2();
      setErrors(errs);
      if (Object.keys(errs).length) return;
      const stateCode = NIGERIAN_STATES.find((s) => s.name === form.state)?.code || "XX";
      const memberData = {
        ...form,
        memberId: generateMemberId(stateCode),
        registeredAt: new Date().toISOString(),
      };
      saveMemberData(memberData);
      setStep(3);
    }
  };

  const prevStep = () => setStep((s) => Math.max(1, s - 1));

  const handleDownload = () => {
    if (!member || !cardRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 504;
    drawCardToCanvas(canvas, member);
    const link = document.createElement("a");
    link.download = `${member.memberId}-membership-card.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const inputClass = (hasError) =>
    `w-full px-4 py-3 rounded-xl border text-sm text-charcoal transition-all focus:outline-none focus:ring-2 focus:ring-emerald-primary/40 bg-white ${
      hasError
        ? "border-red-400 bg-red-50/50"
        : "border-gray-200 hover:border-emerald-primary/30"
    }`;

  const labelClass = "block text-sm font-semibold text-charcoal mb-1.5";

  return (
    <section id="register" className="relative py-20 lg:py-28 bg-gradient-to-br from-[#F8FAF9] to-white overflow-hidden">
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-emerald-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-deep/5 border border-emerald-deep/10 text-emerald-deep text-sm font-semibold mb-4">
            <span className="w-2 h-2 bg-emerald-primary rounded-full" />
            Digital Membership
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal leading-tight mb-4">
            Join the{" "}
            <span className="text-emerald-primary">Forward Movement</span> Today
          </h2>
          <p className="text-gray-500 text-lg">
            Register in under two minutes and receive your official digital party
            membership card.
          </p>
        </motion.div>

        {isExisting && member && step === 1 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl border border-emerald-deep/10 shadow-2xl p-8 max-w-lg mx-auto text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-primary to-emerald-light flex items-center justify-center">
              <PartyPopper className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-extrabold text-charcoal mb-2">
              You&apos;re Already a Member!
            </h3>
            <p className="text-gray-500 mb-6">
              Your membership card is ready. Download it again or review your
              registration details.
            </p>
            <div ref={cardRef} className="mb-6">
              <MemberCard member={member} />
            </div>
            <div className="flex gap-3 justify-center flex-wrap">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-emerald-primary to-emerald-light rounded-xl shadow-lg hover:scale-105 transition-all"
              >
                <Download className="w-4 h-4" />
                Download ID Card
              </button>
              <button
                onClick={() => {
                  clearMemberData();
                  setForm(INITIAL_FORM);
                  setStep(1);
                }}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-emerald-primary border-2 border-emerald-primary/20 rounded-xl hover:bg-emerald-primary/5 transition-all"
              >
                Re-register
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="bg-white rounded-3xl border border-emerald-deep/10 shadow-2xl overflow-hidden"
          >
            {/* Stepper */}
            <div className="px-6 sm:px-10 pt-8">
              <div className="flex items-center">
                {STEPS.map((s, i) => (
                  <div key={s.id} className="flex items-center flex-1 last:flex-none">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                          step > s.id
                            ? "bg-emerald-primary text-white"
                            : step === s.id
                            ? "bg-gradient-to-r from-emerald-primary to-emerald-light text-white ring-4 ring-emerald-primary/20"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {step > s.id ? <Check className="w-4 h-4" /> : s.id}
                      </div>
                      <span
                        className={`text-sm font-semibold hidden sm:block ${
                          step >= s.id ? "text-charcoal" : "text-gray-400"
                        }`}
                      >
                        {s.name}
                      </span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div
                        className={`flex-1 h-1 mx-3 rounded-full ${
                          step > s.id ? "bg-emerald-primary/60" : "bg-gray-100"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Form Body */}
            <div className="p-6 sm:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                >
                  {step === 1 && (
                    <div className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className={labelClass}>
                            <span className="inline-flex items-center gap-1.5">
                              <User className="w-4 h-4 text-emerald-primary" />
                              First Name
                            </span>
                          </label>
                          <input
                            type="text"
                            value={form.firstName}
                            onChange={(e) => updateField("firstName", e.target.value)}
                            placeholder="e.g. Ada"
                            className={inputClass(errors.firstName)}
                          />
                          {errors.firstName && (
                            <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
                          )}
                        </div>
                        <div>
                          <label className={labelClass}>Last Name</label>
                          <input
                            type="text"
                            value={form.lastName}
                            onChange={(e) => updateField("lastName", e.target.value)}
                            placeholder="e.g. Obi"
                            className={inputClass(errors.lastName)}
                          />
                          {errors.lastName && (
                            <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
                          )}
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className={labelClass}>
                            <span className="inline-flex items-center gap-1.5">
                              <Mail className="w-4 h-4 text-emerald-primary" />
                              Email Address
                            </span>
                          </label>
                          <input
                            type="email"
                            value={form.email}
                            onChange={(e) => updateField("email", e.target.value)}
                            placeholder="you@example.com"
                            className={inputClass(errors.email)}
                          />
                          {errors.email && (
                            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                          )}
                        </div>
                        <div>
                          <label className={labelClass}>
                            <span className="inline-flex items-center gap-1.5">
                              <Phone className="w-4 h-4 text-emerald-primary" />
                              Phone Number
                            </span>
                          </label>
                          <input
                            type="tel"
                            value={form.phone}
                            onChange={(e) => updateField("phone", e.target.value)}
                            placeholder="+234 800 000 0000"
                            className={inputClass(errors.phone)}
                          />
                          {errors.phone && (
                            <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-5">
                      <div>
                        <label className={labelClass}>
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-emerald-primary" />
                            State of Origin / Residence
                          </span>
                        </label>
                        <select
                          value={form.state}
                          onChange={(e) => updateField("state", e.target.value)}
                          className={inputClass(errors.state)}
                        >
                          <option value="">Select your state…</option>
                          {NIGERIAN_STATES.map((state) => (
                            <option key={state.code} value={state.name}>
                              {state.name} — {state.capital}
                            </option>
                          ))}
                        </select>
                        {errors.state && (
                          <p className="mt-1 text-xs text-red-500">{errors.state}</p>
                        )}
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className={labelClass}>Local Government Area (LGA)</label>
                          <input
                            type="text"
                            value={form.lga}
                            onChange={(e) => updateField("lga", e.target.value)}
                            placeholder="e.g. Ikeja"
                            className={inputClass(errors.lga)}
                          />
                          {errors.lga && (
                            <p className="mt-1 text-xs text-red-500">{errors.lga}</p>
                          )}
                        </div>
                        <div>
                          <label className={labelClass}>Ward</label>
                          <input
                            type="text"
                            value={form.ward}
                            onChange={(e) => updateField("ward", e.target.value)}
                            placeholder="e.g. Ward 3"
                            className={inputClass(errors.ward)}
                          />
                          {errors.ward && (
                            <p className="mt-1 text-xs text-red-500">{errors.ward}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 3 && member && (
                    <div className="text-center">
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-16 h-16 mx-auto mb-5 rounded-full bg-gradient-to-br from-emerald-primary to-emerald-light flex items-center justify-center"
                      >
                        <PartyPopper className="w-8 h-8 text-white" />
                      </motion.div>
                      <h3 className="text-2xl font-extrabold text-charcoal mb-2">
                        Congratulations, {member.firstName}!
                      </h3>
                      <p className="text-gray-500 mb-8 max-w-md mx-auto">
                        Your official membership has been registered. Your digital
                        membership card is ready — download it and keep it handy.
                      </p>
                      <div ref={cardRef} className="mb-8">
                        <MemberCard member={member} />
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                          onClick={handleDownload}
                          className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-bold text-white bg-gradient-to-r from-emerald-primary to-emerald-light rounded-xl shadow-lg shadow-emerald-primary/25 hover:scale-105 transition-all"
                        >
                          <Download className="w-5 h-5" />
                          Download ID Card
                        </button>
                        <button
                          onClick={() => {
                            clearMemberData();
                            setForm(INITIAL_FORM);
                            setStep(1);
                          }}
                          className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-emerald-primary border-2 border-emerald-primary/20 rounded-xl hover:bg-emerald-primary/5 transition-all"
                        >
                          Register Another Member
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer Buttons */}
            {step < 3 && (
              <div className="px-6 sm:px-10 py-5 bg-[#F8FAF9] border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={prevStep}
                  disabled={step === 1}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                    step === 1
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-charcoal hover:bg-gray-100"
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  onClick={nextStep}
                  className="inline-flex items-center gap-2 px-7 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-emerald-primary to-emerald-light rounded-lg shadow-lg shadow-emerald-primary/20 hover:scale-105 transition-all"
                >
                  {step === 2 ? "Generate My ID Card" : "Continue"}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* Trust note */}
        {!member && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-sm text-gray-400 mt-6 flex items-center justify-center gap-2"
          >
            <FingerprintPattern className="w-4 h-4" />
            Your data is stored securely in your browser and never shared.
          </motion.p>
        )}
      </div>
    </section>
  );
}