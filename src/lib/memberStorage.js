export const STORAGE_KEY = "fmn_member_data";

const listeners = new Set();
let cached = null;
let loaded = false;
const serverSnapshot = null;

export function subscribeMemberStore(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getMemberSnapshot() {
  if (!cached || !loaded) {
    cached = getMemberData();
    loaded = true;
  }
  return cached;
}

function emit() {
  for (const listener of listeners) listener();
}

function track() {
  cached = readMemberData();
  loaded = true;
}

function readMemberData() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function getMemberData() {
  return readMemberData();
}

export function saveMemberData(data) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    track();
    emit();
  } catch {
    // storage may be unavailable (private mode / quota) — fail silently
  }
}

export function clearMemberData() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    track();
    emit();
  } catch {
    // ignore
  }
}