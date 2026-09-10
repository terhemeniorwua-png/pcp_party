"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Download } from "lucide-react";

const NAV_LINKS = [
  { href: "/speech", label: "Speech" },
  { href: "/manifesto", label: "Manifesto" },
  { href: "/leadership", label: "Leaders" },
  { href: "/supporters", label: "Supporters" },
];

function isActiveLink(pathname, href) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-emerald-100 shadow-sm shadow-emerald-900/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:shadow-emerald-500/50 transition-shadow">
              <svg viewBox="0 0 36 36" className="w-6 h-6 lg:w-7 lg:h-7 text-white" fill="currentColor">
                <path d="M18 2L22 10L30 10L24 16L26 24L18 20L10 24L12 16L6 10L14 10Z" />
              </svg>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-gold-primary rounded-full border-2 border-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-charcoal font-extrabold text-lg lg:text-xl tracking-tight">
                FORWARD
              </span>
              <span className="text-emerald-600 font-bold text-[10px] lg:text-xs tracking-[0.2em] uppercase">
                Nigeria
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              href="/"
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                isActiveLink(pathname, "/")
                  ? "text-emerald-600 bg-emerald-50"
                  : "text-charcoal/70 hover:text-emerald-600 hover:bg-emerald-50/60"
              }`}
            >
              Home
            </Link>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                  isActiveLink(pathname, link.href)
                    ? "text-emerald-600 bg-emerald-50"
                    : "text-charcoal/70 hover:text-emerald-600 hover:bg-emerald-50/60"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/manifesto"
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-emerald-600 border border-emerald-300 rounded-lg hover:bg-emerald-50 transition-all"
            >
              <Download className="w-4 h-4" />
              Manifesto
            </Link>
            <Link
              href="/register"
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-500 transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
            >
              Join / Register
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-charcoal rounded-lg hover:bg-emerald-50 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-emerald-100">
          <div className="px-4 py-4 space-y-1">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                isActiveLink(pathname, "/")
                  ? "text-emerald-600 bg-emerald-50"
                  : "text-charcoal/80 hover:text-emerald-600 hover:bg-emerald-50/60"
              }`}
            >
              Home
            </Link>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                  isActiveLink(pathname, link.href)
                    ? "text-emerald-600 bg-emerald-50"
                    : "text-charcoal/80 hover:text-emerald-600 hover:bg-emerald-50/60"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 space-y-2">
              <Link
                href="/manifesto"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-emerald-600 border border-emerald-300 rounded-lg hover:bg-emerald-50 transition-all"
              >
                <Download className="w-4 h-4" />
                Read Manifesto
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold text-white rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600"
              >
                Join / Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}