"use client";

import { useContactSettings } from "@/hooks/useContactSettings";
import {
  buildMailtoLink,
  buildWhatsappLink,
} from "@/lib/contactSettings";
import SocialIcon from "./SocialIcon";

export default function Footer() {
  const { settings } = useContactSettings();

  const emailLink = buildMailtoLink(settings.email);
  const whatsappLink = buildWhatsappLink(settings.whatsappNumber);

  return (
    <footer className="bg-green-900 text-white mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col items-center gap-4">
        <p className="text-sm text-green-200">
          &copy; {new Date().getFullYear()} PCP Party. All rights reserved.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <SocialIcon type="email" href={emailLink} />
          <SocialIcon type="whatsapp" href={whatsappLink} />
          <SocialIcon type="facebook" href={settings.facebook} />
          <SocialIcon type="instagram" href={settings.instagram} />
          <SocialIcon type="x" href={settings.x} />
          <SocialIcon type="youtube" href={settings.youtube} />
          <SocialIcon type="tiktok" href={settings.tiktok} />
          <SocialIcon type="linkedin" href={settings.linkedin} />
        </div>
      </div>
    </footer>
  );
}
