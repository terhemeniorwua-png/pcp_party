"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Send, MapPin, Flag, ChevronRight } from "lucide-react";
import SocialIcon from "./SocialIcon";
import { useContactSettings } from "@/hooks/useContactSettings";
import { buildMailtoLink } from "@/lib/contactSettings";

const QUICK_LINKS = [
  { label: "President's Address", href: "/speech" },
  { label: "2026 Manifesto", href: "/manifesto" },
  { label: "Party Leadership", href: "/leadership" },
  { label: "Our Supporters", href: "/supporters" },
  { label: "Become a Member", href: "/register" },
];

const RESOURCES = [
  { label: "Register as a Member", href: "/register" },
  { label: "Download Manifesto (PDF)", href: "/manifesto" },
  { label: "Supporters' Wall", href: "/supporters" },
  { label: "Contact Us", href: "/contact" },
  { label: "Campaign Events", href: "/campaign" },
  { label: "Contact Settings", href: "/admin/settings" },
];

export default function Footer() {
  const { settings } = useContactSettings();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const emailLink = buildMailtoLink(settings.email);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="relative bg-[#F0FDF4] border-t border-emerald-100 overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-light via-emerald-primary to-gold-primary" />

      {/* Newsletter banner */}
      <div className="relative border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid lg:grid-cols-2 items-center gap-6">
            <div>
              <h3 className="text-2xl font-extrabold text-charcoal mb-1">
                Stay Up to Date with{" "}
                <span className="text-gradient-emerald">Forward Nigeria</span>
              </h3>
              <p className="text-gray-500 text-sm">
                Get party updates, policy announcements, and event invites.
              </p>
            </div>
            <div>
              {subscribed ? (
                <div className="flex items-center gap-3 px-5 py-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold">
                  <Send className="w-5 h-5 text-emerald-600" />
                  You&apos;re on the list! Check your inbox to confirm.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-3">
                  <div className="relative flex-1">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white border border-emerald-200 text-charcoal placeholder-gray-400 text-sm focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-500 transition-all shadow-lg shadow-emerald-500/20"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main footer columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                <div className="w-6 h-6 flex items-center justify-center">
                  <span className="font-extrabold text-xs text-white leading-none">
                    FG
                  </span>
                </div>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-extrabold text-lg tracking-tight text-charcoal">
                  FORWARD
                </span>
                <span className="text-emerald-600 font-bold text-[10px] tracking-[0.2em] uppercase">
                  Nigeria
                </span>
              </div>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-4 max-w-sm">
              The Forward Movement of Nigeria (FMN) — a citizen-first coalition
              uniting all 36 states &amp; the FCT behind prosperity, security,
              and innovation for every Nigerian.
            </p>
            <div className="flex items-start gap-2 text-sm text-gray-500">
              <MapPin className="w-4 h-4 mt-0.5 text-emerald-500 shrink-0" />
              <span>
                National Secretariat,
                <br />
                Abuja, Federal Capital Territory, Nigeria
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-emerald-700 font-bold text-sm uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-1.5 text-gray-600 text-sm hover:text-emerald-600 hover:translate-x-1 transition-all"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-emerald-700 font-bold text-sm uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5">
              {RESOURCES.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-1.5 text-gray-600 text-sm hover:text-emerald-600 hover:translate-x-1 transition-all"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials / Support */}
          <div>
            <h4 className="text-emerald-700 font-bold text-sm uppercase tracking-wider mb-4">
              Connect
            </h4>
            <p className="text-gray-500 text-sm mb-3">Follow our movement:</p>
            <div className="flex flex-wrap gap-2">
              <SocialIcon type="facebook" href={settings.facebook} />
              <SocialIcon type="x" href={settings.x} />
              <SocialIcon type="youtube" href={settings.youtube} />
              <SocialIcon type="instagram" href={settings.instagram} />
              <SocialIcon type="tiktok" href={settings.tiktok} />
              <SocialIcon type="linkedin" href={settings.linkedin} />
              <SocialIcon type="email" href={emailLink} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Forward Movement of Nigeria (FMN).
            All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-gray-500 text-sm">
            <Link href="#" className="hover:text-emerald-600 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-emerald-600 transition-colors">
              Terms of Service
            </Link>
            <span className="flex items-center gap-1.5">
              <Flag className="w-3.5 h-3.5 text-emerald-500" />
              Powered by the People of Nigeria
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}