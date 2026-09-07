"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/contact", label: "Contact" },
  { href: "/join", label: "Join" },
  { href: "/campaign", label: "Campaign" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-green-800 text-white px-4 py-3 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold tracking-tight">
        PCP Party
      </Link>
      <ul className="flex gap-4 text-sm font-medium">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`hover:underline transition-colors ${
                pathname === link.href
                  ? "underline underline-offset-4 text-green-200"
                  : "text-white"
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
