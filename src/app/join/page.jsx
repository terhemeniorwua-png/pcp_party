"use client";

import { useContactSettings } from "@/hooks/useContactSettings";
import { buildMailtoLink, buildWhatsappLink } from "@/lib/contactSettings";

export default function JoinPage() {
  const { settings } = useContactSettings();

  const emailLink = buildMailtoLink(settings.email);
  const whatsappLink = buildWhatsappLink(settings.whatsappNumber);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 flex-1 w-full">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Join the Party</h1>
      <p className="text-gray-600 mb-8">
        Become a member and help build the PCP. Register in person or get in
        touch with us.
      </p>

      <div className="border border-green-200 rounded-lg bg-green-50 p-6 mb-8">
        <h2 className="text-lg font-semibold text-green-900 mb-2">
          Membership registration
        </h2>
        <p className="text-sm text-green-800 mb-4">
          Visit our secretariat to complete your registration. For enquiries,
          reach us below.
        </p>
        <div className="flex flex-wrap gap-4">
          {emailLink ? (
            <a
              href={emailLink}
              className="inline-flex items-center rounded-md bg-green-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-800 transition-colors"
            >
              Email the Party
            </a>
          ) : null}
          {whatsappLink ? (
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md border border-green-700 px-5 py-2.5 text-sm font-semibold text-green-700 hover:bg-green-700 hover:text-white transition-colors"
            >
              Chat on WhatsApp
            </a>
          ) : null}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Registration requirements
        </h2>
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-700">
          <li>Valid means of identification</li>
          <li>Two passport photographs</li>
          <li>Completed membership form</li>
        </ul>
      </div>
    </div>
  );
}