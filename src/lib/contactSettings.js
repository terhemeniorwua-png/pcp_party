"use client";

const STORAGE_KEY = "pcp_contact_settings";

const DEFAULT_SETTINGS = {
  email: "",
  whatsappNumber: "",
  facebook: "",
  instagram: "",
  x: "",
  youtube: "",
  tiktok: "",
  linkedin: "",
};

export function getDefaultSettings() {
  return { ...DEFAULT_SETTINGS };
}

export function getContactSettings() {
  if (typeof window === "undefined") return { ...DEFAULT_SETTINGS };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_SETTINGS, ...parsed };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export function saveContactSettings(settings) {
  if (typeof window === "undefined") return;
  const merged = { ...DEFAULT_SETTINGS, ...settings };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
}

export function normalizeWhatsappNumber(number) {
  if (!number) return "";
  const digits = number.replace(/\D/g, "");
  if (digits.startsWith("0") && digits.length >= 10) {
    return "234" + digits.slice(1);
  }
  if (digits.startsWith("234")) return digits;
  return digits;
}

export function buildWhatsappLink(number) {
  const normalized = normalizeWhatsappNumber(number);
  if (!normalized) return "";
  return `https://wa.me/${normalized}`;
}

export function buildMailtoLink(email) {
  if (!email) return "";
  return `mailto:${email}`;
}
