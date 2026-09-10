import Link from "next/link";
import { Flag, Star } from "lucide-react";

export default function TopBar() {
  return (
    <div className="relative z-[60] bg-gradient-to-r from-amber-400 via-gold-primary to-amber-400 text-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-9 lg:h-10">
          <div className="flex items-center gap-2 text-[11px] lg:text-xs font-bold tracking-wide">
            <Star className="w-3.5 h-3.5 fill-charcoal/20" />
            <span className="hidden sm:inline">
              Forward Movement of Nigeria &mdash; Official Platform 2026
            </span>
            <span className="sm:hidden">FMN &mdash; Official 2026</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] lg:text-xs font-semibold">
            <Link href="/register" className="hover:underline">
              Become a Member
            </Link>
            <span className="hidden md:flex items-center gap-1.5">
              <Flag className="w-3.5 h-3.5" />
              Uniting All 36 States + FCT
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}